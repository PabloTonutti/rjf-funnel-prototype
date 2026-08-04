<template>
  <div class="screen" style="margin:-20px -24px 0;padding:0">
    <div class="pw-banner"><div class="pw-inner">
      <span class="t">{{ f.T(['50% discount reserved for you:', '50% de descuento reservado para ti:']) }} <b>{{ countdown }}</b></span>
      <button @click="scrollToPlans">{{ f.T(['GET ACCESS', 'OBTENER ACCESO']) }}</button>
    </div></div>
    <div class="pw-body">
      <h1>{{ f.T(['Your personalized job search plan is ready', 'Tu plan personalizado de búsqueda de empleo está listo']) }}</h1>
      <p class="subtitle">{{ f.T(['Choose your plan. All plans include full access.', 'Elige tu plan. Todos incluyen acceso completo.']) }}</p>

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

      <div class="billing-note">{{ f.T(PLANS[f.selectedPlan].bill) }}</div>
      <button class="btn btn-primary" @click="f.next()">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
      <div class="stripe-badge">
        <span v-html="ic('lock', 13)" style="display:contents" /> {{ f.T(['Secure checkout with', 'Pago seguro con']) }}
        <span class="sb">stripe</span> <em style="font-size:11px">{{ f.T(['(mock, no charge)', '(maqueta, sin cobro)']) }}</em>
      </div>

      <div class="pw-cols">
        <div class="pw-section">
          <h3>{{ f.T(['What you unlock', 'Lo que desbloqueas']) }}</h3>
          <div v-for="(x, k) in unlock" :key="k" class="feat"><span class="ck" v-html="ic('check')" /> {{ f.T(x) }}</div>
        </div>
        <div class="pw-section">
          <h3>{{ f.T(["What's included", 'Lo que incluye']) }}</h3>
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

      <button class="btn btn-primary" @click="f.next()">{{ f.T(['GET MY PLAN', 'Obtener mi plan']) }}</button>
      <p class="footnote" style="margin:12px 0 20px">{{ f.T(['No commitment. Cancel anytime from your account.', 'Sin permanencia. Cancela cuando quieras desde tu cuenta.']) }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { PLANS } from 'src/data/screens'
import { ic } from 'assets/graphics'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const plansEl = ref(null)

const unlock = [
  ['300–450 jobs matching your profile, updated daily', '300-450 empleos compatibles con tu perfil, actualizados a diario'],
  ['Tailored applications: resume and cover letter adapted to every listing', 'Solicitudes personalizadas: CV y carta adaptados a cada oferta'],
  ['ATS-optimized resume that gets past the filters', 'CV optimizado para superar los filtros ATS'],
  ['Only verified listings that actually hire', 'Solo ofertas verificadas que contratan de verdad']
]
const included = [
  ['1M+ jobs aggregated from 1,000+ sources', '1M+ empleos agregados de 1.000+ fuentes'],
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

let timer = null
onMounted(() => { timer = setInterval(() => { if (f.secondsLeft > 0) f.secondsLeft-- }, 1000) })
onUnmounted(() => clearInterval(timer))
</script>
