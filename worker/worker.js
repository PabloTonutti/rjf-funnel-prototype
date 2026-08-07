// JobWinner AI proxy — Cloudflare Worker
// Holds the OpenAI key as a secret; the public funnel never sees it.
// Deploy: npx wrangler deploy   ·   Secret: npx wrangler secret put OPENAI_API_KEY

const PROMPT = `You are a career assistant helping match a candidate to jobs. Below is the raw text of their resume. Based on their MOST RECENT work experience, suggest up to 8 closely related job titles (short, standard, market-recognizable titles in English). Reply with ONLY a JSON array of strings, no other text.

RESUME:
`

const CORS = {
  'Access-Control-Allow-Origin': '*', // tighten to https://pablotonutti.github.io in prod
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export default {
  async fetch (req, env) {
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
      const raw = (j.choices && j.choices[0] && j.choices[0].message.content) || '[]'
      const titles = JSON.parse((raw.match(/\[[\s\S]*\]/) || ['[]'])[0]).slice(0, 8).map(String)
      return Response.json({ titles }, { headers: CORS })
    } catch (e) {
      return Response.json({ error: 'analysis failed' }, { status: 500, headers: CORS })
    }
  }
}
