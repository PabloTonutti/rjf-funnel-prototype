<template>
  <div class="screen pw-screen">
    <!-- Cuenta atrás (diseño recuperado del prototipo) -->
    <div class="pw-banner"><div class="pw-inner">
      <span class="t">{{ f.T(['50% discount reserved for you', '50% de descuento reservado para ti']) }} <b>{{ countdown }}</b></span>
      <button @click="scrollToPlans">{{ f.T(['GET ACCESS', 'OBTENER ACCESO']) }}</button>
    </div></div>

    <div class="pw-body">
      <!-- Plan personalizado -->
      <div class="result-hero">
        <div class="illo" style="margin:2px 0 10px" v-html="ILLO.trophy" />
        <h1 style="font-size:26px">{{ f.T(['Your personalized plan is ready', 'Tu plan personalizado está listo']) }}</h1>
        <p class="subtitle" style="margin-bottom:0">{{ f.T(['We got you covered for all your job hunt.', 'Te cubrimos en toda tu búsqueda de empleo.']) }}</p>
        <div v-if="f.answers.PEMAIL" class="plan-email-pill">
          ✉️ {{ f.T(['Your plan will be sent to', 'Tu plan se enviará a']) }} <b>{{ f.answers.PEMAIL }}</b>
        </div>
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
          <div v-if="f.answers.PEMAIL" class="pc-row"><span class="k">Email</span><span class="v">{{ f.answers.PEMAIL }}</span></div>
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
            <div><span class="plan-old">{{ p.old }}</span><span class="chip">60% OFF</span></div>
          </div>
          <div class="plan-day"><div class="n">{{ p.day }} €</div><div class="u">{{ f.T(['per day', 'por día']) }}</div></div>
        </div>
      </div>

      <button ref="buyEl" class="btn btn-primary" @click="f.next()">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
      <div class="stripe-badge">
        <span v-html="ic('lock', 13)" style="display:contents" /> {{ f.T(['Secure checkout with', 'Pago seguro con']) }}
        <span class="sb">stripe</span> <em style="font-size:11px">{{ f.T(['(mock, no charge)', '(maqueta, sin cobro)']) }}</em>
      </div>

      <div class="pw-cols">
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

      <button ref="buy2El" class="btn btn-primary" @click="f.next()">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
      <p class="footnote" style="margin:12px 0 20px">{{ f.T(['No commitment. Cancel anytime from your account.', 'Sin permanencia. Cancela cuando quieras desde tu cuenta.']) }}</p>
    </div>

    <!-- Mobile: CTA fija cuando los botones no están a la vista -->
    <div class="pw-sticky" :class="{ show: showSticky }">
      <button class="btn btn-primary" @click="f.next()">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
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
const revs = [
  [['In 5 weeks I went from zero responses to 2 offers. The matching is on another level.', 'En 5 semanas pasé de cero respuestas a 2 ofertas. El matching es otra cosa.'], 'Andrea · Product Designer'],
  [['Tailored applications saved me hours every week. And you can tell by the replies.', 'Las solicitudes personalizadas me ahorraron horas cada semana. Y se nota en las respuestas.'], 'Carlos · Data Analyst']
]

const countdown = computed(() => {
  const fmt = n => String(n).padStart(2, '0')
  return `${fmt(Math.floor(f.secondsLeft / 60))}:${fmt(f.secondsLeft % 60)}`
})
function scrollToPlans () {
  if (plansEl.value) plansEl.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
