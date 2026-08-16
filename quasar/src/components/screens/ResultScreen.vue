<template>
  <div class="screen pw-screen rw">
    <!-- Barra de oferta fija (60% + cuenta atrás), diseño de referencia -->
    <div class="pw-banner"><div class="pw-inner rw-barin">
      <div>
        <span class="t">{{ f.T(['60% discount reserved for you', '60% de descuento reservado para ti']) }}</span>
        <div class="rw-clock">{{ countdown }}</div>
      </div>
      <button @click="scrollToPlans">{{ f.T(['GET ACCESS', 'OBTENER ACCESO']) }}</button>
    </div></div>

    <!-- 1 · Hero personalizado -->
    <section class="rw-sec rw-hero">
      <div class="rw-in">
        <div class="illo" v-html="ILLO.trophy" />
        <h1 class="rw-h1">{{ f.T(['Your plan is ready', 'Tu plan está listo']) }}</h1>
        <p v-if="goalDate" class="rw-dateline">{{ f.T(['Land your next role before', 'Consigue tu próximo puesto antes del']) }} <span class="d">{{ goalDate }}</span></p>
        <p class="rw-sub" v-if="heroLine">{{ heroLine }}</p>
        <!-- Línea de tiempo de la búsqueda (estilo funnel) -->
        <div class="rw-journey">
          <div v-html="journeySvg" />
        </div>
        <div class="rw-heroGrid">
          <div class="rw-big"><b>💼 {{ matches }}</b><span>{{ f.T(['jobs match your job search preferences and profile', 'empleos que encajan con tus preferencias de búsqueda y perfil']) }}</span></div>
        </div>
      </div>
    </section>

    <!-- 2 · Tiles de datos + respuestas desplegables -->
    <section class="rw-sec" style="padding-top:0">
      <div class="rw-in">
        <div class="rw-stats">
          <div class="rw-stat" v-if="annualK"><span>{{ f.T(['Market salary, your profile', 'Salario de mercado, tu perfil']) }}</span><b>{{ sym }}{{ marketLo }}k–{{ marketHi }}k</b></div>
          <div class="rw-stat" v-if="annualK"><span>{{ f.T(['Your stated minimum', 'Tu mínimo indicado']) }}</span><b>{{ sym }}{{ annualK }}k</b></div>
          <div class="rw-stat"><span>{{ f.T(['Estimated first interview', 'Primera entrevista estimada']) }}</span><b>{{ f.T(['Week 3', 'Semana 3']) }}</b></div>
          <div class="rw-stat" v-if="modes"><span>{{ f.T(['Work mode', 'Modalidad']) }}</span><b>{{ modes }}</b></div>
        </div>
        <button class="rw-reveal" :aria-expanded="String(showAns)" aria-controls="rw-answers" @click="showAns = !showAns">
          {{ showAns ? f.T(['Hide your answers', 'Ocultar tus respuestas']) : f.T([`See the ${ansRows.length} answers you gave`, `Ver las ${ansRows.length} respuestas que diste`]) }}
          <span class="chev" :class="{ up: showAns }" v-html="ic('chevrondown', 14)" />
        </button>
        <div v-if="showAns" class="rw-answers" id="rw-answers">
          <div v-for="(r, k) in ansRows" :key="k" class="rw-arow"><span>{{ f.T(r[0]) }}</span><b>{{ r[1] }}</b></div>
        </div>
      </div>
    </section>

    <!-- 3 · Camino hasta la oferta firmada (timeline con fechas) -->
    <section class="rw-sec rw-tint2">
      <div class="rw-in">
        <h2 class="rw-h2">{{ f.T(['Your path to a signed offer', 'Tu camino hasta la oferta firmada']) }}</h2>
        <p class="rw-sub" style="margin:4px 0 24px" v-if="goalMonths">{{ f.T([`Built around the ${goalMonths}-month goal you set`, `Construido en torno a tu objetivo de ${goalMonths} meses`]) }}</p>
        <div class="rw-rail">
          <div class="rw-step">
            <div class="rw-node">1</div>
            <div class="rw-card">
              <div class="rw-cbody">
                <div class="rw-meta"><span class="day">{{ f.T(['DAY 1', 'DÍA 1']) }}</span><span class="rw-chip warn">{{ f.T([`${issues} issues found`, `${issues} fallos encontrados`]) }}</span></div>
                <h3>{{ f.T(["Fix what's holding your resume back", 'Arregla lo que frena tu CV']) }}</h3>
                <p>{{ f.T(['We found issues in your resume that could be keeping you out of the shortlist.', 'Encontramos fallos en tu CV que podrían estar dejándote fuera de la lista final.']) }}</p>
              </div>
              <span class="rw-cic" v-html="duo('pen')" />
            </div>
          </div>
          <div class="rw-step">
            <div class="rw-node">2</div>
            <div class="rw-card">
              <div class="rw-cbody">
                <div class="rw-meta"><span class="day">{{ f.T(['DAY 1', 'DÍA 1']) }}</span><span class="rw-chip">{{ f.T([`${matches} matches today!`, `¡${matches} matches hoy!`]) }}</span></div>
                <h3>{{ f.T(['Open your matched jobs', 'Abre tus empleos compatibles']) }}</h3>
                <p>{{ f.T(['Scored against your preferences and refreshed every morning.', 'Puntuados contra tus preferencias y actualizados cada mañana.']) }}</p>
              </div>
              <span class="rw-cic" v-html="duo('search')" />
            </div>
          </div>
          <div class="rw-step">
            <div class="rw-node">3</div>
            <div class="rw-card">
              <div class="rw-cbody">
                <div class="rw-meta"><span class="day">{{ f.T(['WEEK 1+', 'SEMANA 1+']) }}</span><span class="rw-chip">{{ f.T(['30 sec each', '30 seg cada una']) }}</span></div>
                <h3>{{ f.T(['Apply with a tailored resume and cover letter every time', 'Aplica siempre con un CV y carta adaptados']) }}</h3>
                <p>{{ f.T(['Both rewritten for every listing, automatically.', 'Ambos reescritos para cada oferta, automáticamente.']) }}</p>
              </div>
              <span class="rw-cic" v-html="duo('doccheck')" />
            </div>
          </div>
          <div class="rw-step">
            <div class="rw-node">4</div>
            <div class="rw-card">
              <div class="rw-cbody">
                <div class="rw-meta"><span class="day">{{ f.T(['WEEK 2+', 'SEMANA 2+']) }}</span><span class="rw-chip">Interview Kit</span></div>
                <h3>{{ f.T(['Walk in ready for the interviews', 'Llega preparado a las entrevistas']) }}</h3>
                <p>{{ f.T(['Mock interviews on real questions for your role, scored.', 'Simulacros con preguntas reales de tu puesto, con puntuación.']) }}</p>
              </div>
              <span class="rw-cic" v-html="duo('mic')" />
            </div>
          </div>
          <div class="rw-step" style="align-items:center;margin-bottom:0">
            <div class="rw-node end"><span v-html="ic('trophy', 20)" /></div>
            <div class="rw-end">
              <b>{{ f.T(['Offer signed', 'Oferta firmada']) }}</b>
              <span v-if="goalMonths">{{ f.T(goalMonths === 1 ? ['Your target: 30 days from today', 'Tu objetivo: 30 días desde hoy'] : [`Your target: ${goalMonths} months from today`, `Tu objetivo: ${goalMonths} meses desde hoy`]) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 · Planes -->
    <section class="rw-sec" ref="plansEl">
      <div class="rw-in">
        <h2 class="rw-h2">{{ f.T(['Choose your plan', 'Elige tu plan']) }}</h2>
        <p class="rw-sub" style="margin:4px 0 22px">{{ f.T(['All plans include full access to everything below.', 'Todos los planes incluyen acceso completo a todo lo de abajo.']) }}</p>
        <!-- Tarjetas de precio: diseño original del funnel (horizontal, radio a la izquierda) -->
        <div class="plans">
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
              <div class="plan-bill">{{ f.T(whyOf(p)) }}</div>
            </div>
            <div class="plan-day"><div class="n">{{ money(perDay(p)) }}</div><div class="u">{{ f.T(['per day', 'por día']) }}</div></div>
          </div>
        </div>
        <div class="rw-cta">
          <button ref="buyEl" class="rw-btn" @click="goCheckout">{{ f.T(['GET MY PLAN', 'OBTENER MI PLAN']) }}</button>
          <p class="rw-note"><span v-html="ic('lock', 13)" /> {{ f.T(['Secure checkout with Stripe · Cancel in one tap', 'Pago seguro con Stripe · Cancela en un toque']) }}</p>
        </div>
      </div>
    </section>

    <!-- 5 · Garantía -->
    <section class="rw-sec" style="padding-top:0">
      <div class="rw-in">
        <div class="rw-guar">
          <span class="gic" v-html="ic('refresh', 30)" />
          <div>
            <b>{{ f.T(['7-day money-back guarantee', 'Garantía de devolución de 7 días']) }}</b>
            <span>{{ f.T(["Try everything for 7 days. If it's not for you, send us one email and we refund you in full. No questions asked.", 'Pruébalo todo durante 7 días. Si no es para ti, mándanos un email y te devolvemos el importe completo. Sin preguntas.']) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 6 · Gráfica de resultados -->
    <section class="rw-sec">
      <div class="rw-in">
        <h2 class="rw-h2" style="margin-bottom:18px">{{ f.T(['55% of members interview in the first month', 'El 55% de los miembros consigue entrevista el primer mes']) }}</h2>
        <!-- Misma gráfica que la pantalla '55%...' de los primeros pasos del funnel -->
        <div class="rw-card">
          <div style="display:flex;justify-content:center" v-html="chartSvg" />
          <p class="rw-meth" style="margin-top:8px">{{ f.T(['Based on 4,182 members who tracked applications between Jan and Jun 2026.', 'Basado en 4.182 miembros que registraron sus candidaturas entre enero y junio de 2026.']) }}</p>
        </div>
      </div>
    </section>

    <!-- 7 · Todo incluido (25+ herramientas) -->
    <section class="rw-sec rw-tint">
      <div class="rw-in">
        <h2 class="rw-h2">{{ f.T(['Everything for your search, in one place — from resume to signed offer', 'Todo para tu búsqueda en un solo sitio: del CV a la oferta firmada']) }}</h2>
        <p class="rw-sub" style="margin:4px 0 20px">{{ f.T([`${5 + MORE_TOOLS.length} AI tools, all unlocked from day one`, `${5 + MORE_TOOLS.length} herramientas de IA, todas desbloqueadas desde el día uno`]) }}</p>
        <div class="rw-tools">
          <div v-for="(t, k) in tools" :key="k" class="rw-tool">
            <span class="tic" v-html="duo(t.i)" />
            <b>{{ f.T(t.b) }}</b><small>{{ f.T(t.tool) }}</small>
          </div>
          <div class="rw-tool rw-tool-toggle" role="button" tabindex="0" @click="showAllTools = !showAllTools" @keydown.enter.prevent="showAllTools = !showAllTools">
            <span class="tic" v-html="duo('docdash')" />
            <b>{{ showAllTools ? f.T(['Show less', 'Ver menos']) : f.T([`+${MORE_TOOLS.length} more tools`, `+${MORE_TOOLS.length} herramientas más`]) }}</b>
            <small>{{ showAllTools ? f.T(['Back to highlights', 'Volver a destacadas']) : f.T(['See the full list', 'Ver la lista completa']) }}</small>
          </div>
        </div>
        <!-- Lista completa de herramientas reales (jobwinner.ai/tools), de más a menos importante -->
        <div v-if="showAllTools" class="rw-card" style="margin-top:10px">
          <div class="rw-tlist">
            <span v-for="t in MORE_TOOLS" :key="t" class="rw-titem"><span class="ck" v-html="ic('check', 14)" />{{ t }}</span>
          </div>
          <button class="rw-lesslink" @click="showAllTools = false">{{ f.T(['Show less', 'Ver menos']) }} <span class="chev up" v-html="ic('chevrondown', 13)" /></button>
        </div>
        <div class="rw-card" style="margin-top:10px">
          <p class="rw-incl"><span class="ck" v-html="ic('check', 15)" />{{ f.T(['5M+ jobs from 1,000+ sources, only verified listings', '5M+ empleos de 1.000+ fuentes, solo ofertas verificadas']) }}</p>
          <p class="rw-incl"><span class="ck" v-html="ic('check', 15)" />{{ f.T([`${matches} matches for your preferences, updated daily`, `${matches} matches para tus preferencias, actualizados a diario`]) }}</p>
          <p class="rw-incl"><span class="ck" v-html="ic('check', 15)" />{{ f.T(['Unlimited tailored resumes and cover letters', 'CVs y cartas de presentación a medida, ilimitados']) }}</p>
        </div>
      </div>
    </section>

    <!-- 8 · Testimonios -->
    <section class="rw-sec">
      <div class="rw-in">
        <h2 class="rw-h2">{{ f.T(['What our users say', 'Lo que dicen nuestros usuarios']) }}</h2>
        <div class="tp-head">
          <span class="tp-row" v-html="TP_STARS" />
          <span class="tp-rate">{{ f.T(['Rated', 'Valorados con']) }} <b>4.7</b> {{ f.T(['on', 'en']) }}</span>
          <span class="tp-logo"><span class="tp-lstar" v-html="TP_STAR" /><b>Trustpilot</b></span>
        </div>
        <div class="rw-quotes">
          <div v-for="(r, k) in revs" :key="k" class="rw-quote">
            <div class="tp-row" v-html="TP_STARS" />
            <p>"{{ f.T(r[0]) }}"</p>
            <div class="tp-who">
              <b>{{ r[1] }}</b>
              <span class="tp-logo sm"><span class="tp-lstar" v-html="TP_STAR" />Trustpilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9 · FAQ -->
    <section class="rw-sec rw-tint">
      <div class="rw-in">
        <h2 class="rw-h2" style="margin-bottom:18px">{{ f.T(['Questions before you start', 'Dudas antes de empezar']) }}</h2>
        <div class="rw-faqs">
          <details v-for="(q, k) in faqs" :key="k" class="rw-faq"><summary>{{ f.T(q[0]) }}</summary><p>{{ f.T(q[1]) }}</p></details>
        </div>
      </div>
    </section>

    <!-- 10 · CTA final + garantía repetida -->
    <section class="rw-sec">
      <div class="rw-in">
        <h2 class="rw-h1">{{ f.T([`${matches} jobs are waiting for you`, `${matches} empleos te están esperando`]) }}</h2>
        <p class="rw-sub" style="margin:6px 0 20px">{{ f.T(['Start today and your first tailored application is ready in under five minutes.', 'Empieza hoy y tu primera candidatura a medida estará lista en menos de cinco minutos.']) }}</p>
        <!-- Mismos precios que arriba (misma tarjeta, misma selección) -->
        <div class="plans">
          <div
            v-for="(p, k) in PLANS" :key="'b' + k"
            class="plan" :class="{ sel: f.selectedPlan === k }"
            @click="f.selectedPlan = k"
          >
            <div v-if="p.popular" class="pop-pill">{{ f.T(['Most popular', 'Most popular']) }}</div>
            <div class="radio" />
            <div>
              <div class="plan-name">{{ f.T(p.name) }}</div>
              <div><span class="plan-old">{{ money(p.old) }}</span><span class="chip">60% OFF</span></div>
              <div class="plan-bill">{{ f.T(whyOf(p)) }}</div>
            </div>
            <div class="plan-day"><div class="n">{{ money(perDay(p)) }}</div><div class="u">{{ f.T(['per day', 'por día']) }}</div></div>
          </div>
        </div>
        <div class="rw-cta">
          <button ref="buy2El" class="rw-btn" @click="goCheckout">{{ f.T(['GET MY PLAN', 'OBTENER MI PLAN']) }} · {{ money(perDay(PLANS[f.selectedPlan] || PLANS[1])) }}/{{ f.T(['DAY', 'DÍA']) }}</button>
        </div>
        <div class="rw-guar" style="margin-top:20px">
          <span class="gic" v-html="ic('refresh', 30)" />
          <div>
            <b>{{ f.T(['7-day money-back guarantee', 'Garantía de devolución de 7 días']) }}</b>
            <span>{{ f.T(["Try everything for 7 days. If it's not for you, send us one email and we refund you in full. No questions asked.", 'Pruébalo todo durante 7 días. Si no es para ti, mándanos un email y te devolvemos el importe completo. Sin preguntas.']) }}</span>
          </div>
        </div>
        <p class="rw-note"><span v-html="ic('lock', 13)" /> {{ f.T(['Secure checkout with Stripe · Cancel in one tap', 'Pago seguro con Stripe · Cancela en un toque']) }}</p>
      </div>
    </section>

    <div class="rw-foot">{{ f.T(['Terms · Refund policy · Privacy · Contact', 'Términos · Política de reembolso · Privacidad · Contacto']) }}<br>{{ f.T(['Prices include VAT. Renewal terms shown before payment.', 'Precios con IVA incluido. Las condiciones de renovación se muestran antes del pago.']) }}</div>

    <!-- Mobile: CTA fija → lleva a la vista de precios (no directo a Stripe) -->
    <div class="pw-sticky" :class="{ show: showSticky }">
      <button class="btn btn-primary" @click="scrollToPlans">{{ f.T(['GET MY PLAN', 'OBTENER MI PLAN']) }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO, duo, ic } from 'assets/graphics'
import { PLANS, CATEGORIES } from 'src/data/screens'
import { membersChartSvg } from 'src/utils/membersChart'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const showAns = ref(false)
const plansEl = ref(null)
const buyEl = ref(null)
const buy2El = ref(null)
const showSticky = ref(false)

// ---- Moneda por ubicación: eurozona €, Reino Unido £, resto $ ----
const EUROZONE = ['Spain', 'France', 'Germany', 'Italy', 'Portugal', 'Netherlands', 'Belgium', 'Austria', 'Ireland', 'Finland', 'Greece', 'Slovakia', 'Slovenia', 'Lithuania', 'Latvia', 'Estonia', 'Luxembourg', 'Malta', 'Cyprus', 'Croatia']
const currency = computed(() => {
  const c = f.answers.P11
  if (c === 'United Kingdom') return '£'
  if (EUROZONE.includes(c)) return '€'
  return '$'
})
const sym = computed(() => currency.value)
const money = n => `${Number(n).toFixed(2)} ${currency.value}`
const perDay = p => p.price / p.days
const fmt0 = n => Number(n).toLocaleString(f.lang === 'es' ? 'es-ES' : 'en-US', { maximumFractionDigits: 0 })

// ---- Nº de matches: estable por usuario (mismas respuestas → mismo número exacto) ----
const matches = computed(() => {
  const seed = JSON.stringify([f.answers.P19T, f.answers.P11, f.answers.P13])
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return 280 + (h % 160)
})

// ---- Datos derivados de las respuestas del funnel ----
const monthlyMin = computed(() => {
  const s = f.answers.P8
  if (!s || !s.amount) return null
  const n = Number(String(s.amount).replace(/[^0-9]/g, ''))
  if (!n) return null
  const p = s.period ? s.period[0] : 'Monthly'
  if (p === 'Hourly') return Math.round(n * 160)
  if (p === 'Yearly') return Math.round(n / 12)
  return n
})
const annualK = computed(() => monthlyMin.value ? Math.round(monthlyMin.value * 12 / 1000) : null)
const marketLo = computed(() => Math.round(annualK.value * 1.6))
const marketHi = computed(() => Math.round(annualK.value * 2.05))
const goalMonths = computed(() => f.answers.PSPEED ? f.answers.PSPEED.months : null)
const modes = computed(() => (f.answers.P9 || []).map(o => f.T(o.t)).join(', '))

// Nº de fallos del CV: dimensiones del análisis de IA por debajo de 90 (fallback: estáticas del ScoreScreen)
const issues = computed(() => {
  const s = f.aiScore
  const dims = s ? [s.structure, s.details, s.summary, s.employment, s.education, s.skills] : [90, 90, 90, 79, 87, 90]
  return Math.min(6, Math.max(1, dims.filter(v => Number(v) < 90).length))
})

// Categorías: si están todas seleccionadas, "All categories" en lugar de la lista completa
const catsText = computed(() => {
  const sel = f.answers.P13 || []
  if (!sel.length) return ''
  if (sel.length >= CATEGORIES.length - 1) return f.T(['All categories', 'Todas las categorías'])
  return sel.map(o => f.T(o.t)).join(', ')
})

const heroLine = computed(() => {
  // La modalidad NO va aquí: ya aparece en el tile "Work mode" (evita el duplicado).
  const parts = []
  const title = (f.answers.P19T || [])[0] || (f.aiTitles || [])[0]
  if (title) parts.push(title)
  if (f.answers.PCITY) parts.push(f.answers.PCITY)
  parts.push(f.T(['Built from your answers', 'Construido con tus respuestas']))
  return parts.join(' · ')
})

const ansRows = computed(() => {
  const rows = []
  const add = (l, v) => { if (v) rows.push([l, v]) }
  add(['Job titles', 'Puestos'], (f.answers.P19T || []).join(', '))
  add(['Categories', 'Categorías'], catsText.value)
  add(['Career level', 'Nivel profesional'], f.answers.P16 && f.T(f.answers.P16.t))
  add(['Type of work', 'Tipo de trabajo'], (f.answers.P7 || []).map(o => f.T(o.t)).join(', '))
  add(['Work mode', 'Modalidad'], modes.value)
  add(['Location', 'Ubicación'], [f.answers.PCITY, f.answers.P11].filter(Boolean).join(', '))
  add(['Minimum salary', 'Salario mínimo'], f.answers.P8 && f.answers.P8.amount ? `${sym.value}${fmt0(f.answers.P8.amount)} / ${f.T(f.answers.P8.period || ['month', 'mes']).toLowerCase()}` : null)
  add(['Target timeline', 'Plazo objetivo'], f.answers.PSPEED && f.T(f.answers.PSPEED.t))
  add(['Email', 'Email'], f.answers.PEMAIL)
  return rows
})

// Línea "why" de cada plan (diseño de referencia)
const whyOf = p => {
  if (p.key === 'weekly') return ['Billed weekly', 'Facturación semanal']
  if (p.key === 'monthly') return goalMonths.value ? [`Matches your ${goalMonths.value}-month goal`, `Encaja con tu objetivo de ${goalMonths.value} meses`] : ['Our members\' favorite', 'El favorito de nuestros miembros']
  return ['One payment, no renewal', 'Un solo pago, sin renovación']
}

const tools = [
  { i: 'search', b: ['Jobs that truly fit you', 'Empleos que encajan de verdad'], tool: ['AI Job Match', 'AI Job Match'] },
  { i: 'doc', b: ['A resume that stands out', 'Un CV que destaca'], tool: ['AI Resume Builder', 'AI Resume Builder'] },
  { i: 'boltcirc', b: ['Tailored apps in seconds', 'Candidaturas a medida en segundos'], tool: ['AI Application Kit', 'AI Application Kit'] },
  { i: 'shieldcheck', b: ['Pass the ATS filters', 'Supera los filtros ATS'], tool: ['AI ATS Check', 'AI ATS Check'] },
  { i: 'mic', b: ['Interview with confidence', 'Entrevistas con confianza'], tool: ['AI Mock Interview', 'AI Mock Interview'] }
]

// Resto de herramientas reales (jobwinner.ai/tools), ordenadas de más a menos importante.
// Nombres de producto: se muestran igual en EN y ES.
const MORE_TOOLS = [
  'Job Tracker', 'Skills Match Analysis', 'Job Description Keyword Finder',
  'Interview Q&A Generator', 'Interview Answer Enhancer', 'Elevator Pitch Generator',
  'Questions to Ask Generator', 'Interview Email Follow-up Generator', 'AI Company Insights',
  'LinkedIn Profile Reviewer', 'LinkedIn Headline Generator', 'LinkedIn Summary Generator',
  'LinkedIn Experience Generator', 'AI Professional Summary Generator',
  'AI Bullet Point Generator', 'AI Bullet Point Enhancer'
]
const showAllTools = ref(false)

// Reviews REALES de Trustpilot (trustpilot.com/review/jobwinner.ai · 4.7 "Excellent")
const revs = [
  [["I've landed 3 interviews for roles I'm actually excited about. The Skills Match is basically a cheat sheet for beating the ATS.", "I've landed 3 interviews for roles I'm actually excited about. The Skills Match is basically a cheat sheet for beating the ATS."], 'Conall B.'],
  [['It tailors your CV and cover letter to each role and shows how well you match with a fit score. I applied with far more confidence.', 'It tailors your CV and cover letter to each role and shows how well you match with a fit score. I applied with far more confidence.'], 'Disha K.'],
  [['I stopped wasting hours on job boards. Two weeks in, I had more responses than in three months on my own.', 'I stopped wasting hours on job boards. Two weeks in, I had more responses than in three months on my own.'], 'Montse L.']
]

// Estrellas estilo Trustpilot: caja verde #00B67A con estrella blanca
const TP_STAR = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 1.8l3 6.4 7 .9-5.2 4.8 1.4 6.9-6.2-3.5-6.2 3.5 1.4-6.9L2 9.1l7-.9z"/></svg>'
const TP_STARS = Array.from({ length: 5 }, () => `<span class="tp-box">${TP_STAR}</span>`).join('')

// FAQ ordenadas estratégicamente: primero puntos de venta, el pricing una sola vez y al final
const faqs = [
  [['How is this different from LinkedIn or Indeed?', '¿En qué se diferencia de LinkedIn o Indeed?'],
    ["Job boards show you listings and leave the rest to you. JobWinner covers the whole search end to end: it finds verified matches across 5M+ listings, fixes your resume, tailors every application, preps your interviews and tracks it all in one place.", 'Los portales te enseñan ofertas y el resto es cosa tuya. JobWinner cubre toda la búsqueda de principio a fin: encuentra matches verificados entre 5M+ ofertas, arregla tu CV, adapta cada candidatura, te prepara las entrevistas y lo organiza todo en un solo sitio.']],
  [["I've been applying for months with no luck. Why would this work?", 'Llevo meses aplicando sin suerte. ¿Por qué esto sí funcionaría?'],
    ['Mass-applying with the same resume is what keeps most people stuck. Applying to matched jobs with a resume and cover letter tailored to each listing is how our members get to interviews — 55% within the first month.', 'Aplicar en masa con el mismo CV es lo que mantiene atascada a la mayoría. Aplicar a empleos compatibles con un CV y una carta adaptados a cada oferta es lo que lleva a nuestros miembros a entrevistas: el 55% en el primer mes.']],
  [['What exactly do I get right after paying?', '¿Qué recibo justo después de pagar?'],
    ['Instant access to everything: your matched jobs are already waiting, your resume review is ready, and your first tailored application can go out in under five minutes.', 'Acceso inmediato a todo: tus empleos compatibles ya te están esperando, la revisión de tu CV está lista y tu primera candidatura a medida puede salir en menos de cinco minutos.']],
  [['Does it work for my sector?', '¿Funciona para mi sector?'],
    ['We aggregate 5M+ listings from 1,000+ sources across every sector. Your matches are scored against the titles, industries and location you selected.', 'Agregamos 5M+ ofertas de 1.000+ fuentes de todos los sectores. Tus matches se puntúan contra los puestos, industrias y ubicación que seleccionaste.']],
  [['How does the pricing work?', '¿Cómo funciona el precio?'],
    ['Pick weekly, monthly, or a single payment until you\'re hired. Renewal date and amount are always shown before you pay, you can cancel in one tap from your account, and every plan comes with a 7-day full money-back guarantee.', 'Elige semanal, mensual o un pago único hasta que te contraten. La fecha y el importe de renovación se muestran siempre antes de pagar, puedes cancelar en un toque desde tu cuenta y todos los planes incluyen garantía de devolución total de 7 días.']]
]

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

const chartSvg = computed(() => membersChartSvg(f, 800))

// Fecha objetivo: día de hoy (cuando se completa el funnel) + los meses que eligió el usuario
const goalDate = computed(() => {
  if (!goalMonths.value) return null
  const d = new Date()
  d.setMonth(d.getMonth() + goalMonths.value)
  return d.toLocaleDateString(f.lang === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'long' })
})

// Línea de tiempo de la búsqueda (estilo funnel): hoy → candidaturas → entrevistas → ofertas
const journeySvg = computed(() => {
  const m = matches.value
  const apps = `${Math.round(m * 0.35 / 10) * 10}–${Math.round(m * 0.6 / 10) * 10}`
  const PTS = [[84, 158], [172, 116], [256, 76], [332, 40]]
  const path = PTS.map((p, i) => {
    if (i === 0) return `M ${p[0]} ${p[1]}`
    const [x0, y0] = PTS[i - 1]
    const mx = (x0 + p[0]) / 2
    return `C ${mx} ${y0}, ${mx} ${p[1]}, ${p[0]} ${p[1]}`
  }).join(' ')
  const labels = [
    [String(m), f.T(['jobs found', 'empleos'])],
    [apps, f.T(['applications', 'candidaturas'])],
    ['5–10', f.T(['interviews', 'entrevistas'])],
    ['1–2', f.T(['job offers', 'ofertas'])]
  ]
  const xlabs = [f.T(['Today', 'Hoy']), f.T(['Week 2', 'Semana 2']), f.T(['Week 4', 'Semana 4']), f.T(['Week 6', 'Semana 6'])]
  const guides = PTS.map(p => `<line x1="${p[0]}" y1="${p[1] + 12}" x2="${p[0]}" y2="178" stroke="#CBD9EE" stroke-width="1.5" stroke-dasharray="2 5"/>`).join('')
  // Etiquetas SIEMPRE arriba-izquierda del punto: como la curva asciende, todo lo que queda
  // a la izquierda de un punto está más abajo que él → el texto nunca pisa la línea.
  const texts = PTS.map((p, i) => `
    <text x="${p[0] - 15}" y="${p[1] - 20}" text-anchor="end" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="15" fill="#02112D">${labels[i][0]}</text>
    <text x="${p[0] - 15}" y="${p[1] - 7}" text-anchor="end" font-size="10.5" fill="#5A6478" font-family="Inter,sans-serif">${labels[i][1]}</text>`).join('')
  const dots = PTS.map((p, i) => i === 0
    ? `<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="#88AB75"/><path d="M${p[0] - 4.5} ${p[1]}l3.2 3.4 6-6.6" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<circle cx="${p[0]}" cy="${p[1]}" r="8" fill="#F2C037" stroke="#fff" stroke-width="2.5"/>`).join('')
  const xtexts = xlabs.map((t, i) => `<text x="${PTS[i][0]}" y="200" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-weight="700" font-size="11.5" fill="#02112D">${t}</text>`).join('')
  return `<svg viewBox="0 0 380 212" style="width:100%;display:block">
    <defs><linearGradient id="jwline" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#88AB75"/><stop offset=".35" stop-color="#3E9BFF"/><stop offset=".8" stop-color="#007AFF"/><stop offset="1" stop-color="#007AFF" stop-opacity=".25"/>
    </linearGradient></defs>
    ${guides}
    <line x1="20" y1="178" x2="360" y2="178" stroke="#DCE4F0" stroke-width="1.5"/>
    <path d="${path} L 358 36" fill="none" stroke="url(#jwline)" stroke-width="7" stroke-linecap="round"/>
    ${dots}${texts}${xtexts}
  </svg>`
})

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

<style scoped>
/* Tokens de la referencia adaptados al sistema del funnel (azul #007AFF, tipos pjs/inter) */
.rw{--ink:#02112D;--body:#5A6478;--muted:#8A93A6;--line:#E7EBF3;--line2:#E2E8F3;
  --blue:var(--jw-blue);--blue-dark:#1E4FB8;--blue-bg:#EAF3FD;--blue-bg2:#F4F8FE;
  --green-bg:#E9F5E7;--green-ink:#1E4A18;--green-body:#2E6B2A;--green-ico:#3B8A34;
  --badge-bg:#E7F4E4;--badge-ink:#2E6B2A;
  --amber-bg:#FDF3E0;--amber-ink:#5A3806;--amber-body:#7A4E08;--amber-card:#FEF8EA;--amber-line:#F5E3BC;
  --coral-bg:#FDECE4;--coral-ink:#B14A1C;
  --surface:#F7F9FC;--surface2:#F9FBFE;
  background:#fff;padding-bottom:0}
.rw-sec{padding:26px 18px}
.rw-in{max-width:845px;margin:0 auto;width:100%}
.rw-tint{background:var(--surface)}
.rw-tint2{background:var(--surface2);border-top:.5px solid #EDF1F8;border-bottom:.5px solid #EDF1F8}
.rw-h1{font-family:var(--pjs);font-size:26px;font-weight:800;line-height:1.2;text-align:center;color:var(--ink);margin:0}
.rw-h2{font-family:var(--pjs);font-size:22px;font-weight:800;line-height:1.25;text-align:center;color:var(--ink);margin:0}
.rw-sub{font-size:14px;color:var(--body);text-align:center;line-height:1.5;margin:6px 0 0}
.rw-card{background:#fff;border:.5px solid var(--line);border-radius:14px;padding:16px}
.rw-btn{display:block;width:100%;background:var(--blue);color:#fff;border:0;border-radius:14px;padding:17px 16px;font-size:15px;font-weight:700;letter-spacing:.06em;text-align:center;cursor:pointer;font-family:var(--inter)}
.rw-btn:hover{background:var(--jw-blue-hover)}
.rw-note{font-size:12px;color:var(--muted);text-align:center;line-height:1.6;margin-top:12px}
.rw-note :deep(svg){vertical-align:-2px;margin-right:2px}
.rw-cta{max-width:380px;margin:0 auto}

/* Barra de oferta (usa .pw-banner global; aquí solo la variante de 2 líneas + reloj dorado) */
.rw-barin{max-width:845px}
.rw-clock{font-family:var(--pjs);font-size:19px;color:var(--jw-gold);font-weight:700;letter-spacing:.04em;font-variant-numeric:tabular-nums}

/* Hero */
.rw-hero{text-align:center}
.rw-hero .illo{margin:2px 0 10px}
.rw-dateline{font-family:var(--pjs);font-size:16.5px;font-weight:800;color:var(--ink);margin:8px 0 0;line-height:1.3}
.rw-dateline .d{color:var(--blue)}
.rw-journey{margin-top:18px;padding:22px 16px 12px;background:#F4F8FE;border:1px solid #D9E6FA;border-radius:16px}
.rw-heroGrid{display:grid;gap:12px;text-align:left;margin-top:20px}
.rw-big{background:var(--blue-bg);border-radius:14px;padding:20px}
.rw-big b{display:block;font-family:var(--pjs);font-size:42px;font-weight:800;color:var(--blue-dark);line-height:1}
.rw-big span{display:block;font-size:14px;color:var(--blue-dark);margin-top:6px;line-height:1.4}

/* Tiles + respuestas */
.rw-stats{display:grid;gap:10px;grid-template-columns:repeat(2,1fr)}
.rw-stat{background:var(--surface);border-radius:12px;padding:14px 16px}
.rw-stat span{display:block;font-size:12px;color:var(--muted);margin-bottom:4px}
.rw-stat b{font-size:18px;font-weight:700;line-height:1.25;display:block;color:var(--ink)}
.rw-reveal{display:block;width:100%;background:none;border:0;color:var(--blue);font-size:13px;font-weight:600;text-align:center;padding:14px 0 0;cursor:pointer;font-family:var(--inter)}
.rw-reveal .chev{display:inline-block;vertical-align:-2px;margin-left:3px;transition:transform .15s}
.rw-reveal .chev.up{transform:rotate(180deg)}
.rw-answers{margin-top:12px;background:var(--surface);border-radius:12px;padding:6px 16px}
.rw-arow{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-top:.5px solid var(--line);font-size:13px}
.rw-arow:first-child{border-top:0}
.rw-arow span{color:var(--body);flex-shrink:0}
.rw-arow b{font-weight:600;text-align:right;color:var(--ink)}

/* Timeline */
.rw-rail{position:relative;max-width:520px;margin:0 auto}
.rw-rail:before{content:"";position:absolute;left:21px;top:24px;bottom:28px;width:2px;background:#DCE4F2}
.rw-step{position:relative;display:flex;gap:14px;margin-bottom:12px}
.rw-node{width:44px;height:44px;flex-shrink:0;border-radius:50%;background:var(--blue);border:4px solid var(--surface2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;font-family:var(--pjs)}
.rw-node.end{background:var(--jw-gold)}
.rw-step .rw-card{flex:1;min-width:0;border-color:var(--line2);display:flex;align-items:center;gap:14px}
.rw-cbody{flex:1;min-width:0}
.rw-cic{display:none}
.rw-meta{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px}
.rw-meta .day{font-size:11px;color:var(--muted);letter-spacing:.07em;font-weight:600}
.rw-chip{font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:var(--blue-bg);color:var(--blue-dark);white-space:nowrap}
.rw-chip.warn{background:var(--coral-bg);color:var(--coral-ink)}
.rw-step h3{font-family:var(--pjs);font-size:16px;font-weight:800;line-height:1.3;margin:0 0 4px;color:var(--ink)}
.rw-step p{font-size:13px;color:var(--body);line-height:1.5;margin:0}
.rw-end{flex:1;min-width:0;background:var(--amber-card);border:.5px solid var(--amber-line);border-radius:14px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.rw-end b{font-family:var(--pjs);font-size:16px;font-weight:800;color:var(--amber-ink)}
.rw-end span{font-size:12px;color:var(--amber-body)}

/* Planes: usa las clases globales .plans/.plan del diseño original del funnel;
   aquí solo se limita el ancho dentro de la sección */
.rw .plans{max-width:600px;margin:16px auto 18px}

/* Garantía */
.rw-guar{background:var(--green-bg);border-radius:14px;padding:20px;display:flex;gap:16px;align-items:center}
.rw-guar .gic{color:var(--green-ico);flex-shrink:0;display:flex}
.rw-guar b{display:block;font-family:var(--pjs);font-size:18px;font-weight:800;color:var(--green-ink);line-height:1.3;margin-bottom:4px}
.rw-guar>div>span{font-size:13px;color:var(--green-body);line-height:1.55}

/* Gráfica (svg compartido del funnel) */
.rw-meth{font-size:11px;color:var(--muted);line-height:1.5;margin:0}

/* Herramientas */
.rw-tools{display:grid;gap:10px;grid-template-columns:repeat(2,1fr)}
.rw-tool{background:#fff;border:.5px solid var(--line);border-radius:14px;padding:16px}
.rw-tool .tic{display:block;width:34px;height:34px}
.rw-tool .tic :deep(svg){width:34px;height:34px}
.rw-tool b{display:block;font-family:var(--pjs);font-size:14px;font-weight:800;line-height:1.3;margin:9px 0 2px;color:var(--ink)}
.rw-tool small{font-size:12px;color:var(--muted)}
.rw-tool-toggle{cursor:pointer;transition:border-color .15s}
.rw-tool-toggle:hover{border-color:var(--blue)}
.rw-tool-toggle b{color:var(--blue)}
.rw-tlist{display:grid;grid-template-columns:1fr 1fr;gap:9px 14px}
.rw-titem{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--ink);line-height:1.35}
.rw-titem .ck{color:var(--green-ico);flex-shrink:0;display:flex;margin-top:1.5px}
.rw-lesslink{display:block;margin:14px auto 0;background:none;border:0;color:var(--blue);font-size:13px;font-weight:600;cursor:pointer;font-family:var(--inter)}
.rw-lesslink .chev{display:inline-block;vertical-align:-2px;transform:rotate(180deg)}
.rw-incl{font-size:13px;color:var(--body);line-height:1.5;margin:0 0 10px;display:flex;gap:9px;align-items:flex-start}
.rw-incl:last-child{margin-bottom:0}
.rw-incl .ck{color:var(--green-ico);flex-shrink:0;display:flex;margin-top:1px}

/* Testimonios (diseño Trustpilot: cajas verdes con estrella blanca) */
.tp-head{display:flex;align-items:center;justify-content:center;gap:8px;margin:10px 0 18px;flex-wrap:wrap}
.tp-rate{font-size:13.5px;color:#191919}
.tp-rate b{font-weight:800}
.tp-row{display:inline-flex;gap:2px}
.tp-row :deep(.tp-box),.tp-box{width:20px;height:20px;background:#00B67A;display:inline-flex;align-items:center;justify-content:center}
.tp-row :deep(svg){width:13px;height:13px;display:block}
.tp-logo{display:inline-flex;align-items:center;gap:4px;font-size:14px;color:#191919;font-weight:800;font-family:var(--inter)}
.tp-logo.sm{font-size:11.5px;font-weight:700}
.tp-lstar{width:15px;height:15px;background:#00B67A;display:inline-flex;align-items:center;justify-content:center;flex:none}
.tp-lstar :deep(svg){width:10px;height:10px;display:block}
.rw-quotes{display:grid;gap:10px}
.rw-quote{background:#fff;border:1px solid #E7EBF3;border-radius:8px;padding:16px;display:flex;flex-direction:column}
.rw-quote .tp-row{margin-bottom:10px}
.rw-quote p{font-size:13px;line-height:1.55;margin:0 0 12px;color:#191919}
.tp-who{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:auto}
.tp-who b{font-size:12.5px;color:#191919}

/* FAQ */
.rw-faqs{display:grid;gap:10px}
.rw-faq{background:#fff;border:.5px solid var(--line);border-radius:12px;padding:0 16px;cursor:pointer}
.rw-faq summary{list-style:none;padding:14px 0;font-size:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;color:var(--ink);font-weight:600}
.rw-faq summary::-webkit-details-marker{display:none}
.rw-faq summary:after{content:"+";color:var(--muted);font-size:18px;flex-shrink:0}
.rw-faq[open] summary:after{content:"–"}
.rw-faq p{font-size:13px;color:var(--body);line-height:1.6;padding:0 0 14px;margin:0}

.rw-foot{border-top:.5px solid var(--line);padding:16px 18px 90px;text-align:center;font-size:11px;color:#B4BCCB;line-height:1.7}

@media(max-width:719px){
  .rw-big{text-align:center}
}
@media(min-width:720px){
  .rw-sec{padding:30px 32px}
  .rw-h1{font-size:28px}
  .rw-h2{font-size:24px}
  .rw-stats{grid-template-columns:repeat(4,1fr)}
  .rw-tools{grid-template-columns:repeat(3,1fr)}
  .rw-tlist{grid-template-columns:repeat(3,1fr)}
  .rw-quotes{grid-template-columns:repeat(3,1fr)}
  .rw-faqs{grid-template-columns:repeat(2,1fr)}
  .rw-foot{padding-bottom:16px}
  /* Timeline: tarjetas más anchas con icono duotone a la derecha (solo desktop) */
  .rw-rail{max-width:660px}
  .rw-cic{display:block;width:48px;height:48px;flex:none;margin-right:4px}
  .rw-cic :deep(svg){width:48px;height:48px}
}
</style>
