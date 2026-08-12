import { defineStore } from 'pinia'
import { SCREENS } from 'src/data/screens'
import { extractText } from 'src/utils/extractText'

// Titles suggested when no OpenAI key is set or the resume can't be read —
// derived from the user's selected job categories so the screen stays honest.
const CATEGORY_TITLES = {
  'IT & Software': ['Software Engineer', 'Frontend Developer'],
  'Customer Service': ['Customer Support Specialist', 'Customer Success Manager'],
  'Marketing & PR': ['Digital Marketing Specialist', 'Content Marketing Manager'],
  'Sales & Partnerships': ['Sales Development Representative', 'Account Executive'],
  'Design (Graphic, UX, Product)': ['Product Designer', 'UX/UI Designer'],
  'Data & Analytics': ['Data Analyst', 'Business Intelligence Analyst'],
  Finance: ['Financial Analyst', 'Accountant'],
  'HR & Recruitment': ['Technical Recruiter', 'HR Generalist'],
  'Content, Writing & Media': ['Content Writer', 'Copywriter'],
  'Admin & Operations': ['Operations Coordinator', 'Executive Assistant'],
  'Education & Training': ['Online Tutor', 'Instructional Designer'],
  'Data Entry / Typing Jobs': ['Data Entry Specialist', 'Virtual Assistant'],
  Legal: ['Legal Assistant', 'Contract Specialist'],
  Healthcare: ['Medical Coder', 'Telehealth Coordinator'],
  Research: ['Research Analyst', 'UX Researcher']
}

const AI_PROMPT = `You are a career assistant helping match a candidate to jobs. Below is the raw text of their resume. Based on their MOST RECENT work experience, suggest up to 8 closely related job titles (short, standard, market-recognizable titles in English). Reply with ONLY a JSON array of strings, no other text.

RESUME:
`

// Backend AI proxy (Cloudflare Worker in /worker) — the OpenAI key lives there
// as a secret. Set the deployed worker URL here (or override via localStorage
// 'jw_ai_endpoint' for testing). Empty string = disabled.
const AI_ENDPOINT =
  (typeof localStorage !== 'undefined' && localStorage.getItem('jw_ai_endpoint')) ||
  'https://jobwinner-ai.jobwinner.workers.dev'

// Convierte el JSON del perfil de LinkedIn (Renidly, vía worker) en texto tipo CV
// para reutilizar el mismo análisis de IA (títulos + score).
function liProfileToText (p) {
  const lines = []
  lines.push(`${p.firstName || ''} ${p.lastName || ''}`.trim())
  if (p.headline) lines.push(p.headline)
  if (p.summary) lines.push('\nSUMMARY\n' + p.summary)
  if (p.positions && p.positions.length) {
    lines.push('\nEXPERIENCE')
    for (const x of p.positions) {
      lines.push(`- ${x.title || ''}${x.company ? ' at ' + x.company : ''}`)
      if (x.description) lines.push('  ' + x.description)
    }
  }
  if (p.skills && p.skills.length) lines.push('\nSKILLS\n' + p.skills.join(', '))
  if (p.education && p.education.length) {
    lines.push('\nEDUCATION')
    for (const e of p.education) lines.push(`- ${[e.degree, e.field, e.school].filter(Boolean).join(' · ')}`)
  }
  return lines.join('\n')
}

// Funnel engine — same navigation/branch logic as the HTML prototype.
// State lives in memory only (no localStorage), as specced.
export const useFunnel = defineStore('funnel', {
  state: () => ({
    lang: 'en',
    currentI: 0,
    history: [],
    answers: {},
    upload: null,
    salaryPeriod: 1,
    selectedPlan: 1,
    secondsLeft: 9 * 60 + 57,
    // AI resume review
    aiTitles: [],
    liProfile: null, // perfil de LinkedIn leído vía Renidly (worker /li-profile)
    aiScore: null, // real resume score from the AI review (null → static fallback)
    aiStatus: 'idle', // idle | running | done | fallback
    aiPromise: null,
    openaiKey: (typeof localStorage !== 'undefined' && localStorage.getItem('jw_openai_key')) || ''
  }),

  getters: {
    screen: (s) => SCREENS[s.currentI],
    // T resolves an [en, es] pair against the active language
    T: (s) => (p) => (Array.isArray(p) ? (s.lang === 'en' ? p[0] : p[1]) : p)
  },

  actions: {
    nextIndex (i) {
      let n = i + 1
      while (SCREENS[n] && SCREENS[n].cond && !SCREENS[n].cond(this)) n++
      return n
    },
    go (i) {
      this.history.push(this.currentI)
      this.currentI = i
      // Browser back/forward mirrors funnel steps. Auto screens (loader,
      // uploading) don't create history entries, so Back never replays them.
      const t = SCREENS[i] && SCREENS[i].type
      if (!['loader', 'uploading'].includes(t)) {
        try { window.history.pushState({ funnelI: i }, '') } catch (e) {}
      }
      window.scrollTo(0, 0)
    },

    // Called from the popstate listener (browser Back/Forward buttons)
    browserJump (i) {
      if (typeof i !== 'number' || !SCREENS[i]) return
      if (this.history[this.history.length - 1] === i) this.history.pop()
      else this.history.push(this.currentI)
      this.currentI = i
      window.scrollTo(0, 0)
    },
    next () { this.go(this.nextIndex(this.currentI)) },
    back () {
      if (!this.history.length) return
      let prev = this.history.pop()
      while (SCREENS[prev] && ['loader', 'uploading'].includes(SCREENS[prev].type) && this.history.length) {
        prev = this.history.pop()
      }
      this.currentI = prev
      window.scrollTo(0, 0)
    },
    toggleLang () { this.lang = this.lang === 'en' ? 'es' : 'en' },

    setOpenAIKey (k) {
      this.openaiKey = (k || '').trim()
      try { localStorage.setItem('jw_openai_key', this.openaiKey) } catch (e) {}
    },

    fallbackTitles () {
      const picked = (this.answers.P13 || []).map(o => o.t[0])
      const titles = []
      for (const cat of picked) {
        for (const t of (CATEGORY_TITLES[cat] || [])) {
          if (!titles.includes(t)) titles.push(t)
        }
      }
      if (!titles.length) titles.push('Customer Support Specialist', 'Virtual Assistant', 'Project Coordinator', 'Marketing Assistant')
      return titles.slice(0, 8)
    },

    // Kicked off right after the resume is uploaded; the "AI is reviewing"
    // screen awaits this promise. With an OpenAI key set it reads the CV text
    // (PDF/DOCX/TXT, in-browser) and asks the API for related titles;
    // otherwise it falls back to category-based suggestions.
    // NOTE for production: move the OpenAI call behind your backend.
    analyzeResume () {
      this.aiStatus = 'running'
      this.aiTitles = []
      this.aiScore = null
      this.aiPromise = (async () => {
        try {
          let text = ''
          if (this.upload && this.upload.kind === 'file' && this.upload.file) {
            text = await extractText(this.upload.file)
          }
          // LinkedIn: leer el perfil REAL vía el worker (Renidly) y convertirlo a texto de CV
          if (this.upload && this.upload.kind === 'linkedin' && this.upload.handle && AI_ENDPOINT) {
            try {
              const r = await fetch(`${AI_ENDPOINT}/li-profile?handle=${encodeURIComponent(this.upload.handle)}`)
              const j = await r.json()
              if (j.profile) {
                this.liProfile = j.profile
                text = liProfileToText(j.profile)
              }
            } catch (e) { /* sin perfil → sigue el fallback por categorías */ }
          }
          // 1st choice: backend proxy (key never touches the client)
          if (text && text.trim().length > 200 && AI_ENDPOINT) {
            try {
              const res = await fetch(AI_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text.slice(0, 7000) })
              })
              const j = await res.json()
              if (Array.isArray(j.titles) && j.titles.length) {
                this.aiTitles = j.titles.slice(0, 8).map(String)
                if (j.score && j.score.overall) this.aiScore = j.score
                this.aiStatus = 'done'
                return
              }
            } catch (e) { /* fall through to direct key / categories */ }
          }
          // 2nd choice: user-provided key stored in this browser (AI settings)
          if (text && text.trim().length > 200 && this.openaiKey) {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.openaiKey },
              body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0.4,
                messages: [{ role: 'user', content: AI_PROMPT + text.slice(0, 7000) }]
              })
            })
            const j = await res.json()
            const raw = (j.choices && j.choices[0] && j.choices[0].message.content) || '[]'
            const arr = JSON.parse((raw.match(/\[[\s\S]*\]/) || ['[]'])[0])
            if (Array.isArray(arr) && arr.length) {
              this.aiTitles = arr.slice(0, 8).map(String)
              this.aiStatus = 'done'
              return
            }
          }
          throw new Error('fallback')
        } catch (e) {
          this.aiTitles = this.fallbackTitles()
          this.aiStatus = 'fallback'
        }
      })()
      return this.aiPromise
    },
    restart () {
      this.$patch({
        answers: {}, history: [], selectedPlan: 1, salaryPeriod: 1,
        upload: null, secondsLeft: 9 * 60 + 57, currentI: 0,
        aiTitles: [], aiScore: null, aiStatus: 'idle'
      })
    }
  }
})
