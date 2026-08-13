<template>
  <div class="screen pw-screen">
    <!-- Cuenta atrás (diseño recuperado del prototipo) -->
    <div class="pw-banner"><div class="pw-inner">
      <span class="t">{{ f.T(['50% discount reserved for you', '50% de descuento reservado para ti']) }} <b>{{ countdown }}</b></span>
      <button @click="scrollToPlans">{{ f.T(['GET ACCESS', 'OBTENER ACCESO']) }}</button>
    </div></div>

    <div class="pw-body">
      <!-- Cronología: consigue empleo en 4-6 semanas -->
      <div class="card tlx-card">
        <h2 class="pw-sec-title">{{ f.T(['Get a job in 4–6 weeks', 'Consigue empleo en 4-6 semanas']) }}</h2>
        <div v-html="timelineSvg" style="display:flex;justify-content:center" />
        <p class="footnote" style="margin-top:8px">{{ f.T(['Your job search timeline', 'Tu cronología de búsqueda de empleo']) }}</p>
      </div>

      <!-- Plan personalizado -->
      <div class="result-hero">
        <div class="illo" style="margin:2px 0 10px" v-html="ILLO.trophy" />
        <h1 style="font-size:26px">{{ f.T(['Your personalized plan is ready', 'Tu plan personalizado está listo']) }}</h1>
        <p class="subtitle" style="margin-bottom:0">{{ f.T(['We got you covered for all your job hunt.', 'Te cubrimos en toda tu búsqueda de empleo.']) }}</p>
      </div>
      <div class="result-cols">
        <!-- Plan: un paso por tarjeta, una sola columna -->
        <div v-for="(s, k) in steps" :key="k" class="card step-card">
          <div class="step-ic" v-html="iconFor(s.i)" />
          <div class="step-tx">
            <div class="step-eyebrow">{{ f.T(['STEP', 'PASO']) }} {{ k + 1 }}</div>
            <b>{{ f.T(s.t) }}</b>
            <span>{{ f.T(s.sub) }}</span>
            <div v-if="s.badge" class="found-badge">
              <span class="fb-ic" v-html="ic('check')" />
              <span>{{ f.T(s.badge) }}</span>
            </div>
          </div>
        </div>
        <!-- Resumen del perfil -->
        <div class="card" style="background:var(--jw-cloud);box-shadow:none">
          <h3><span v-html="ic('user')" style="display:contents" /> {{ f.T(['Plan adapted to you', 'Plan adaptado a ti']) }}</h3>
          <div class="pc-row"><span class="k">{{ f.T(['Preferred roles', 'Roles preferidos']) }}</span><span class="v">{{ roles }}</span></div>
          <div class="pc-row"><span class="k">{{ f.T(['Type of work', 'Tipo de trabajo']) }}</span><span class="v">{{ val(f.answers.P7) }}</span></div>
          <div class="pc-row"><span class="k">{{ f.T(['Preferred industries', 'Industrias preferidas']) }}</span><span class="v">{{ industries }}</span></div>
          <div class="pc-row"><span class="k">{{ f.T(['Career level', 'Nivel profesional']) }}</span><span class="v">{{ val(f.answers.P16) }}</span></div>
          <div class="pc-row"><span class="k">{{ f.T(['Minimum salary', 'Salario mínimo']) }}</span><span class="v">{{ salary }}</span></div>
          <div class="pc-row"><span class="k">{{ f.T(['Location', 'Ubicación']) }}</span><span class="v">{{ location }}</span></div>
          <div class="pc-row"><span class="k">{{ f.T(['Work mode', 'Modalidad']) }}</span><span class="v">{{ val(f.answers.P9) }}</span></div>
        </div>
      </div>

      <!-- Precios (diseño recuperado) -->
      <h2 class="pw-h1" style="font-size:22px;margin-top:26px">{{ f.T(['Choose your plan. All plans include full access.', 'Elige tu plan. Todos incluyen acceso completo.']) }}</h2>
      <div class="plans" ref="plansEl">
        <div
          v-for="(p, k) in PLANS" :key="k"
          class="plan" :class="{ sel: f.selectedPlan === k }"
          @click="f.selectedPlan = k"
        >
          <div v-if="p.popular" class="pop-pill">{{ f.T(['Most popular', 'Most popular']) }}</div>
          <div class="radio" />
          <div>
            <div class="plan-name">{{ f.T(p.name) }}</div>
            <div><span class="plan-old">{{ money(p.old) }}</span><span class="chip">60% OFF</span></div>
            <div class="plan-bill">{{ f.T(p.bill) }}</div>
          </div>
          <div class="plan-day"><div class="n">{{ money(perDay(p)) }}</div><div class="u">{{ f.T(['per day', 'por día']) }}</div></div>
        </div>
      </div>

      <button ref="buyEl" class="btn btn-primary" @click="goCheckout">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
      <div class="stripe-badge">
        <span v-html="ic('lock', 13)" style="display:contents" /> {{ f.T(['Secure checkout with', 'Pago seguro con']) }}
        <span class="sb">stripe</span>
      </div>

      <!-- Beneficios de las herramientas IA (beneficio grande, nombre de la herramienta debajo) -->
      <h2 class="pw-sec-title" style="margin-top:28px">{{ f.T(['Access to over 25 AI tools', 'Acceso a más de 25 herramientas de IA']) }}</h2>
      <div class="tools-grid">
        <div v-for="(t, k) in tools" :key="k" class="tool-card">
          <span class="tool-ic" v-html="iconFor(t.i)" />
          <div><b>{{ f.T(t.b) }}</b><small>{{ t.tool }}</small></div>
        </div>
      </div>

      <h2 class="pw-sec-title" style="margin-top:28px">{{ f.T(['A bullet-proof method to find your job', 'Un método a prueba de balas para encontrar empleo']) }}</h2>
      <div class="pw-cols pw-cols-full">
        <div class="pw-feat-card">
          <div class="pw-feat-head"><span class="pw-feat-ic" v-html="duo('search')" /><h3>{{ f.T(['What you unlock', 'Lo que desbloqueas']) }}</h3></div>
          <div v-for="(x, k) in unlock" :key="k" class="feat"><span class="ck" v-html="ic('check')" /> {{ f.T(x) }}</div>
        </div>
        <div class="pw-feat-card">
          <div class="pw-feat-head"><span class="pw-feat-ic" v-html="duo('doccheck')" /><h3>{{ f.T(["What's included", 'Lo que incluye']) }}</h3></div>
          <div v-for="(x, k) in included" :key="k" class="feat"><span class="ck" v-html="ic('check')" /> {{ f.T(x) }}</div>
        </div>
      </div>

      <div class="pw-section">
        <h3>{{ f.T(['As seen on', 'Aparecemos en']) }}</h3>
        <div class="press"><span>TechCrunch</span><span>Forbes</span><span>El Mundo</span><span>Xataka</span></div>
      </div>

      <div class="pw-section">
        <h3>{{ f.T(['What our users say', 'Lo que dicen nuestros usuarios']) }}</h3>
        <div class="rev-grid">
          <div v-for="(r, k) in revs" :key="k" class="rev-card">
            <span class="stars">★★★★★</span><br>"{{ f.T(r[0]) }}"<div class="who">{{ r[1] }}</div>
          </div>
        </div>
      </div>

      <button ref="buy2El" class="btn btn-primary" @click="goCheckout">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
      <p class="footnote" style="margin:12px 0 20px">{{ f.T(['No commitment. Cancel anytime from your account.', 'Sin permanencia. Cancela cuando quieras desde tu cuenta.']) }}</p>
    </div>

    <!-- Mobile: CTA fija → lleva a la vista de precios (no directo a Stripe) -->
    <div class="pw-sticky" :class="{ show: showSticky }">
      <button class="btn btn-primary" @click="scrollToPlans">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO, DUO, duo, ic } from 'assets/graphics'
import { PLANS } from 'src/data/screens'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const iconFor = n => (DUO[n] ? duo(n) : ic(n))

const steps = [
  { i: 'resume', t: ['Polish your resume', 'Mejora tu CV'], sub: ['We help you polish your current resume.', 'Te ayudamos a pulir tu currículum actual.'] },
  {
    i: 'search',
    t: ['Find matching jobs', 'Encuentra trabajos a tu medida'],
    sub: ['Jobs that match your profile = more interviews.', 'Empleos que encajan con tu perfil = más entrevistas.'],
    badge: ['We already found 300+ jobs matching your profile', 'Ya hemos encontrado más de 300 empleos que encajan con tu perfil']
  },
  { i: 'doccheck', t: ['Tailor your job applications', 'Adapta tus candidaturas'], sub: ['We help you tailor your resume and cover letter in seconds.', 'Te ayudamos a adaptar tu CV y carta de presentación en segundos.'] },
  { i: 'mic', t: ['Practice for interviews', 'Practica entrevistas'], sub: ['Mock interview practice & Q&A lists.', 'Simulacros de entrevista y listas de preguntas y respuestas.'] }
]

const val = o => o ? (Array.isArray(o) ? o.slice(0, 2).map(x => f.T(x.t)).join(', ') : f.T(o.t)) : '—'
const roles = computed(() => {
  if (f.answers.P19T && f.answers.P19T.length) return f.answers.P19T.slice(0, 3).join(', ')
  return (f.answers.P13 || []).slice(0, 3).map(o => f.T(o.t)).join(', ') || '—'
})
const salary = computed(() => f.answers.P8 ? `$${f.answers.P8.amount} (${f.T(f.answers.P8.period).toLowerCase()})` : '—')
const industries = computed(() => {
  const cats = (f.answers.P13 || []).slice(0, 3).map(o => f.T(o.t))
  const extra = (f.answers.P13 || []).length - 3
  return cats.length ? cats.join(', ') + (extra > 0 ? ` +${extra}` : '') : '—'
})
const location = computed(() => {
  const parts = [f.answers.PCITY, f.answers.P11].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
})

// ---- Elementos recuperados del paywall (precios, countdown, features, reviews) ----
const plansEl = ref(null)
const buyEl = ref(null)
const buy2El = ref(null)
const showSticky = ref(false)

const unlock = [
  ['300–450 jobs matching your profile, updated daily', '300-450 empleos compatibles con tu perfil, actualizados a diario'],
  ['Tailored applications: resume and cover letter adapted to every listing', 'Solicitudes personalizadas: CV y carta adaptados a cada oferta'],
  ['ATS-optimized resume that gets past the filters', 'CV optimizado para superar los filtros ATS'],
  ['Only verified listings that actually hire', 'Solo ofertas verificadas que contratan de verdad']
]
const included = [
  ['5M+ jobs aggregated from 1,000+ sources', '5M+ empleos agregados de 1.000+ fuentes'],
  ['AI Resume Builder and cover letters', 'AI Resume Builder y cartas de presentación'],
  ['Job Match with compatibility score', 'Job Match con puntuación de compatibilidad'],
  ['Job Tracker to organize your applications', 'Job Tracker para organizar tus candidaturas'],
  ['AI interview preparation', 'Preparación de entrevistas con IA']
]
// Reviews REALES de Trustpilot (trustpilot.com/review/jobwinner.ai · 4.7 "Excellent")
const revs = [
  [["I've landed 3 interviews for roles I'm actually excited about. The Skills Match is basically a cheat sheet for beating the ATS.", "I've landed 3 interviews for roles I'm actually excited about. The Skills Match is basically a cheat sheet for beating the ATS."], 'Conall Bradley · Trustpilot'],
  [['Helped me organize my entire interview preparation process. A systematic approach rather than winging it — this tool delivers.', 'Helped me organize my entire interview preparation process. A systematic approach rather than winging it — this tool delivers.'], 'Lavallée Alexandre · Trustpilot'],
  [['It tailors your CV and cover letter to each role and shows how well you match with a fit score. Helped me apply with more confidence.', 'It tailors your CV and cover letter to each role and shows how well you match with a fit score. Helped me apply with more confidence.'], 'Disha · Trustpilot'],
  [['Easy to use, intuitive. I would recommend it to anyone looking for a job who wants to accelerate their search.', 'Easy to use, intuitive. I would recommend it to anyone looking for a job who wants to accelerate their search.'], 'Montse Lorente · Trustpilot']
]

// Herramientas IA: beneficio como titular, nombre de la herramienta debajo
const tools = [
  { i: 'search', b: ['Jobs that truly fit you', 'Empleos que encajan de verdad'], tool: 'AI Job Match' },
  { i: 'resume', b: ['A resume that stands out', 'Un CV que destaca'], tool: 'AI Resume Builder' },
  { i: 'doccheck', b: ['Tailored apps in seconds', 'Candidaturas a medida en segundos'], tool: 'AI Application Kit' },
  { i: 'shieldcheck', b: ['Pass the ATS robots', 'Supera los robots ATS'], tool: 'AI ATS Check' },
  { i: 'mic', b: ['Interview with confidence', 'Entrevistas con confianza'], tool: 'AI Mock Interview practice' },
  { i: 'pen', b: ['Cover letters that convert', 'Cartas que convierten'], tool: 'AI Cover Letter' }
]

// Cronología 4-6 semanas: curva multicolor con hitos (como el diseño de referencia)
const timelineSvg = computed(() => {
  const en = f.lang === 'en'
  const P = [
    { x: 52, y: 200, v: '300+', l: en ? 'jobs found' : 'empleos encontrados', first: true },
    { x: 142, y: 156, v: '300 – 600', l: en ? 'applications' : 'candidaturas' },
    { x: 232, y: 110, v: '5 – 10', l: en ? 'interviews' : 'entrevistas' },
    { x: 322, y: 64, v: '1 – 2', l: en ? 'job offers' : 'ofertas' }
  ]
  const X = en ? ['Today', 'Week 2', 'Week 4', 'Week 6'] : ['Hoy', 'Semana 2', 'Semana 4', 'Semana 6']
  const grid = P.map(p => `<line x1="${p.x}" y1="40" x2="${p.x}" y2="218" stroke="#E3E9F2" stroke-width="1.5" stroke-dasharray="3 5"/>`).join('')
  const labels = P.map(p => {
    const anchor = p.first ? 'start' : (p.x > 300 ? 'end' : 'middle')
    const lx = p.first ? p.x - 22 : (p.x > 300 ? p.x + 22 : p.x)
    return `<text x="${lx}" y="${p.y - 34}" text-anchor="${anchor}" font-size="14.5" font-weight="800" fill="#1C2333" font-family="'Plus Jakarta Sans',sans-serif">${p.v}</text>
      <text x="${lx}" y="${p.y - 19}" text-anchor="${anchor}" font-size="11.5" fill="#5A6474" font-family="Inter,sans-serif">${p.l}</text>`
  }).join('')
  const dots = P.map((p, i) => i === 0
    ? `<circle cx="${p.x}" cy="${p.y}" r="12" fill="#22C55E"/><path d="M${p.x - 5} ${p.y} l3.5 3.5 l7 -7" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<circle cx="${p.x}" cy="${p.y}" r="9.5" fill="#F5C242" stroke="#fff" stroke-width="3"/>`).join('')
  const xlabels = P.map((p, i) => `<text x="${p.x}" y="238" text-anchor="middle" font-size="12.5" font-weight="700" fill="#1C2333" font-family="Inter,sans-serif">${X[i]}</text>`).join('')
  return `<svg viewBox="0 0 360 246" style="width:100%;max-width:470px">
    <defs><linearGradient id="tlgrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FF66C4"/><stop offset="35%" stop-color="#FFA63F"/>
      <stop offset="65%" stop-color="#7ED957"/><stop offset="100%" stop-color="#38B6FF"/>
    </linearGradient></defs>
    ${grid}
    <path d="M52 200 C97 200 97 156 142 156 C187 156 187 110 232 110 C277 110 277 64 322 64 L340 58" fill="none" stroke="url(#tlgrad)" stroke-width="7" stroke-linecap="round"/>
    ${dots}${labels}
    <line x1="30" y1="218" x2="340" y2="218" stroke="#E3E9F2" stroke-width="1.5"/>
    ${xlabels}
  </svg>`
})

// ---- Moneda por ubicación (país elegido en el funnel): eurozona €, Reino Unido £, resto $ ----
const EUROZONE = ['Spain', 'France', 'Germany', 'Italy', 'Portugal', 'Netherlands', 'Belgium', 'Austria', 'Ireland', 'Finland', 'Greece', 'Slovakia', 'Slovenia', 'Lithuania', 'Latvia', 'Estonia', 'Luxembourg', 'Malta', 'Cyprus', 'Croatia']
const currency = computed(() => {
  const c = f.answers.P11
  if (c === 'United Kingdom') return '£'
  if (EUROZONE.includes(c)) return '€'
  return '$'
})
const money = n => `${Number(n).toFixed(2)} ${currency.value}`
const perDay = p => p.price / p.days

// Checkout REAL. 1º intento: sesión de Checkout creada por el worker con customer_email
// BLOQUEADO (no editable). Fallback: Payment Link con prefilled_email (editable).
const AI_ENDPOINT = (typeof localStorage !== 'undefined' && localStorage.getItem('jw_ai_endpoint')) || 'https://jobwinner-ai.jobwinner.workers.dev'
async function goCheckout () {
  const p = PLANS[f.selectedPlan] || PLANS[1]
  const email = (f.answers.PEMAIL || '').trim()
  f.persistPlan() // al volver de Stripe (atrás del navegador), se restaura esta página
  try {
    const r = await fetch(`${AI_ENDPOINT}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: p.key, email }),
      signal: AbortSignal.timeout(6000)
    })
    const j = await r.json()
    if (j && j.url) { window.location.href = j.url; return }
  } catch (e) { /* worker sin clave de Stripe u offline → fallback */ }
  window.location.href = p.link + (email ? `?prefilled_email=${encodeURIComponent(email)}` : '')
}

const countdown = computed(() => {
  const fmt = n => String(n).padStart(2, '0')
  return `${fmt(Math.floor(f.secondsLeft / 60))}:${fmt(f.secondsLeft % 60)}`
})
function scrollToPlans () {
  // OJO: el scroll 'smooth' queda bloqueado en esta página (cadena #main/overflow); 'instant' sí funciona.
  if (!plansEl.value) return
  const top = plansEl.value.getBoundingClientRect().top + window.scrollY - 90
  window.scrollTo({ top, behavior: 'instant' })
  const m = document.getElementById('main')
  if (m && m.scrollHeight > m.clientHeight) m.scrollTo({ top: plansEl.value.offsetTop - 90, behavior: 'instant' })
}

function checkSticky () {
  const visible = el => {
    if (!el) return false
    const r = el.getBoundingClientRect()
    return r.bottom > 0 && r.top < window.innerHeight
  }
  showSticky.value = !visible(buyEl.value) && !visible(buy2El.value)
}
let timer = null
onMounted(() => {
  f.persistPlan() // el usuario llegó a su plan: recordarlo para próximas visitas
  timer = setInterval(() => { if (f.secondsLeft > 0) f.secondsLeft-- }, 1000)
  window.addEventListener('scroll', checkSticky, { passive: true })
  const m = document.getElementById('main')
  if (m) m.addEventListener('scroll', checkSticky, { passive: true })
  checkSticky()
})
onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('scroll', checkSticky)
  const m = document.getElementById('main')
  if (m) m.removeEventListener('scroll', checkSticky)
})
</script>
