<template>
  <div class="wrap"><div class="screen">
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
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO, DUO, duo, ic } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

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
</script>
