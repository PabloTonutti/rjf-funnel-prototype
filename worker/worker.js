// JobWinner AI proxy — Cloudflare Worker
// Holds the OpenAI key as a secret; the public funnel never sees it.
// Deploy: npx wrangler deploy   ·   Secret: npx wrangler secret put OPENAI_API_KEY

const PROMPT = `You are a career assistant and expert ATS resume reviewer. Below is the raw text of a candidate's resume. Reply with ONLY a JSON object, no other text, with this exact shape:
{"titles": [...], "score": {"overall": n, "structure": n, "details": n, "summary": n, "employment": n, "education": n, "skills": n}}

- "titles": up to 8 closely related job titles based on their MOST RECENT work experience (short, standard, market-recognizable titles in English).
- "score": integers 0-100 rating the resume's quality for ATS systems and recruiters. Be realistic and slightly strict: most decent resumes score 55-85 overall. Score each dimension on structure/formatting, quantified details, professional summary, employment history, education section, and skills section.

RESUME:
`

// Browser access limited to the funnel (and localhost for development)
const ALLOWED = origin =>
  origin === 'https://pablotonutti.github.io' ||
  /^http:\/\/localhost(:\d+)?$/.test(origin || '')

const corsFor = origin => ({
  'Access-Control-Allow-Origin': ALLOWED(origin) ? origin : 'https://pablotonutti.github.io',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
})

export default {
  async fetch (req, env) {
    const CORS = corsFor(req.headers.get('Origin'))
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })
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
      const titles = Array.isArray(obj.titles) ? obj.titles.slice(0, 8).map(String) : []
      const clamp = n => Math.max(0, Math.min(100, Math.round(Number(n) || 0)))
      const s = obj.score || {}
      const score = {
        overall: clamp(s.overall), structure: clamp(s.structure), details: clamp(s.details),
        summary: clamp(s.summary), employment: clamp(s.employment),
        education: clamp(s.education), skills: clamp(s.skills)
      }
      return Response.json({ titles, score: score.overall ? score : null }, { headers: CORS })
    } catch (e) {
      return Response.json({ error: 'analysis failed' }, { status: 500, headers: CORS })
    }
  }
}
