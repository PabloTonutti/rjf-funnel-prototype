// JobWinner AI proxy — Cloudflare Worker
// Holds the OpenAI key as a secret; the public funnel never sees it.
// Deploy: npx wrangler deploy   ·   Secret: npx wrangler secret put OPENAI_API_KEY

const PROMPT = `You are a career assistant and expert ATS resume reviewer. Below is the raw text of a candidate's resume. Reply with ONLY a JSON object, no other text, with this exact shape:
{"titles": [...], "industries": [...], "score": {"overall": n, "structure": n, "details": n, "summary": n, "employment": n, "education": n, "skills": n}}

- "titles": up to 8 job titles the candidate should search for. RULES:
  * Base them ONLY on the CURRENT and MOST RECENT experience (at most the last 2 roles). Ignore older experience.
  * Do NOT copy the resume's own job titles verbatim. Translate them into GENERIC, standard, market-recognizable titles recruiters actually post (e.g. an internal title like "Apps Growth Guru" becomes "Growth Marketing Manager").
  * Also include closely RELATED standard titles that genuinely make sense for this profile (adjacent roles, same seniority).
  * Avoid non-searchable titles like "Founder", "CEO", "Owner" or "Freelancer" — translate entrepreneurial or internal roles into the closest employable market titles instead.
  * Short titles, in English.
- "industries": ONLY the categories that clearly fit the candidate — often just 1 or 2, maximum 3. Do NOT pad the list to reach 3. Chosen ONLY from this exact list (copy the strings verbatim): "Data Entry / Typing Jobs", "Customer Service", "Sales & Partnerships", "Marketing & PR", "IT & Software", "Design (Graphic, UX, Product)", "Content, Writing & Media", "Admin & Operations", "Data & Analytics", "Finance", "HR & Recruitment", "Legal", "Healthcare", "Education & Training", "Research".
- "score": integers 0-100 rating the resume's quality for ATS systems and recruiters. Be realistic and slightly strict: most decent resumes score 55-85 overall. Score each dimension on structure/formatting, quantified details, professional summary, employment history, education section, and skills section.

RESUME:
`

// Browser access limited to the funnel (and localhost for development)
const ALLOWED = origin =>
  origin === 'https://pablotonutti.github.io' ||
  /^http:\/\/localhost(:\d+)?$/.test(origin || '')

const corsFor = origin => ({
  'Access-Control-Allow-Origin': ALLOWED(origin) ? origin : 'https://pablotonutti.github.io',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
})

// GET /li-profile?handle=<handle> — lee el perfil de LinkedIn vía Renidly y devuelve el JSON.
// La API key vive como secreto del worker (npx wrangler secret put RENIDLY_API_KEY); nunca en el cliente.
async function liProfile (req, env, CORS) {
  const handle = (new URL(req.url).searchParams.get('handle') || '').replace(/^@/, '').trim()
  if (!handle || handle.length < 2) return Response.json({ error: 'missing handle' }, { status: 400, headers: CORS })
  const r = await fetch(`https://renidly.com/api/v2/person/enrich?handle=${encodeURIComponent(handle)}`, {
    headers: { 'X-renidly-apikey': env.RENIDLY_API_KEY }
  })
  const j = await r.json().catch(() => null)
  if (!j || !j.success || !j.data) return Response.json({ error: 'profile not found' }, { status: 404, headers: CORS })
  const d = j.data
  // Solo los campos que usa el funnel (el payload completo trae fotos, patentes, etc.)
  const slim = {
    handle: d.handle,
    firstName: d.firstName,
    lastName: d.lastName,
    headline: d.headline,
    summary: d.summary,
    industry: d.industry,
    geo: d.geo,
    positions: (d.fullPositions || d.position || []).slice(0, 8).map(p => ({
      title: p.title, company: p.companyName || p.company || '', description: (p.description || '').slice(0, 400),
      start: p.start, end: p.end
    })),
    skills: (d.skills || []).slice(0, 25).map(s => (typeof s === 'string' ? s : s.name)).filter(Boolean),
    education: (d.education || []).slice(0, 4).map(e => ({ school: e.schoolName || e.school || '', degree: e.degree || '', field: e.fieldOfStudy || '' })),
    profilePicture: d.profilePicture || null
  }
  return Response.json({ profile: slim }, { headers: CORS })
}

export default {
  async fetch (req, env) {
    const CORS = corsFor(req.headers.get('Origin'))
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })
    const path = new URL(req.url).pathname
    if (path === '/li-profile') {
      if (req.method !== 'GET') return new Response('GET only', { status: 405, headers: CORS })
      try { return await liProfile(req, env, CORS) } catch (e) { return Response.json({ error: 'profile fetch failed' }, { status: 500, headers: CORS }) }
    }
    if (req.method !== 'POST') return new Response('POST only', { status: 405, headers: CORS })
    try {
      const { text } = await req.json()
      if (!text || text.trim().length < 100) {
        return Response.json({ error: 'text too short' }, { status: 400, headers: CORS })
      }
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.4,
          messages: [{ role: 'user', content: PROMPT + text.slice(0, 7000) }]
        })
      })
      const j = await r.json()
      const raw = (j.choices && j.choices[0] && j.choices[0].message.content) || '{}'
      const obj = JSON.parse((raw.match(/\{[\s\S]*\}/) || ['{}'])[0])
      // Filtro duro de títulos no buscables (el modelo a veces los cuela igualmente)
      const NON_SEARCHABLE = /^(co-?)?(founder|ceo|owner|entrepreneur|freelancer?|self-?employed)\b/i
      const titles = (Array.isArray(obj.titles) ? obj.titles.map(String) : []).filter(t => !NON_SEARCHABLE.test(t.trim())).slice(0, 8)
      const industries = Array.isArray(obj.industries) ? obj.industries.slice(0, 3).map(String) : []
      const clamp = n => Math.max(0, Math.min(100, Math.round(Number(n) || 0)))
      const s = obj.score || {}
      const score = {
        overall: clamp(s.overall), structure: clamp(s.structure), details: clamp(s.details),
        summary: clamp(s.summary), employment: clamp(s.employment),
        education: clamp(s.education), skills: clamp(s.skills)
      }
      return Response.json({ titles, industries, score: score.overall ? score : null }, { headers: CORS })
    } catch (e) {
      return Response.json({ error: 'analysis failed' }, { status: 500, headers: CORS })
    }
  }
}
