<template>
  <div class="wrap"><div class="screen">
    <div class="result-hero">
      <div class="illo" style="margin:2px 0 10px" v-html="ILLO.trophy" />
      <div class="eyebrow">{{ f.T(['Success!', '¡Listo!']) }}</div>
      <div class="big">300–450</div>
      <h1 style="font-size:22px">{{ f.T(['remote jobs match your profile', 'empleos remotos encajan con tu perfil']) }}</h1>
      <p class="subtitle" style="margin-bottom:0">{{ f.T(['Estimated range based on your answers — updated daily with new verified listings.', 'Rango estimado según tus respuestas; se actualiza a diario con nuevas ofertas verificadas.']) }}</p>
    </div>
    <div class="result-cols">
      <div class="card">
        <h3><span v-html="ic('calendar')" style="display:contents" /> {{ f.T(['Get hired in 4–6 weeks', 'Consigue empleo en 4-6 semanas']) }}</h3>
        <div class="tl-item"><div class="tl-dot" v-html="ic('check')" /><div class="tl-txt"><b>{{ f.T(['Today', 'Hoy']) }}</b><span>{{ f.T(['300–450 jobs matching your profile', '300-450 empleos compatibles con tu perfil']) }}</span></div></div>
        <div class="tl-item"><div class="tl-dot">2</div><div class="tl-txt"><b>{{ f.T(['Week 2', 'Semana 2']) }}</b><span>{{ f.T(['300–600 tailored applications sent', '300-600 candidaturas personalizadas enviadas']) }}</span></div></div>
        <div class="tl-item"><div class="tl-dot">4</div><div class="tl-txt"><b>{{ f.T(['Week 4', 'Semana 4']) }}</b><span>{{ f.T(['5–10 interviews', '5-10 entrevistas']) }}</span></div></div>
        <div class="tl-item gold"><div class="tl-dot" v-html="ic('award')" /><div class="tl-txt"><b>{{ f.T(['Week 6', 'Semana 6']) }}</b><span>{{ f.T(['1–2 offers', '1-2 ofertas']) }}</span></div></div>
      </div>
      <div class="card" style="background:var(--jw-cloud);box-shadow:none">
        <h3><span v-html="ic('user')" style="display:contents" /> {{ f.T(['Your profile', 'Tu perfil']) }}</h3>
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
import { ILLO, ic } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const val = o => o ? (Array.isArray(o) ? o.slice(0, 2).map(x => f.T(x.t)).join(', ') : f.T(o.t)) : '—'
const roles = computed(() => {
  if (f.answers.P19T && f.answers.P19T.length) return f.answers.P19T.slice(0, 3).join(', ')
  return (f.answers.P13 || []).slice(0, 3).map(o => f.T(o.t)).join(', ') || '—'
})
const prefs = computed(() =>
  [f.answers.P9, f.answers.P31, f.answers.P7].filter(Boolean)
    .flatMap(o => Array.isArray(o) ? o.slice(0, 2) : [o])
    .map(o => f.T(o.t)).join(' · ') || '—'
)
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
