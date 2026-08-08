<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="card" style="max-width:480px;margin:14px auto 0;width:100%">
      <div class="illo" style="margin:6px 0 4px" v-html="donut" />
      <p style="text-align:center;font-size:14.5px;color:var(--jw-slate);margin-bottom:16px">
        {{ f.T(['Your score:', 'Tu nota:']) }} <b style="color:#5B7A4B">{{ f.T(['Good, but not optimized', 'Buena, pero sin optimizar']) }}</b>
      </p>
      <div v-for="(r, k) in rows" :key="k" class="score-row">
        <div class="score-meta"><span>{{ f.T(r.label) }}</span><b :style="{ color: r.v >= 88 ? '#5B7A4B' : '#C06B45' }">{{ r.v }}%</b></div>
        <div class="score-bar"><i :style="{ width: r.v + '%', background: r.v >= 88 ? 'var(--jw-success)' : 'var(--jw-terracotta)' }" /></div>
      </div>
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Real score from the AI review when available; static fallback otherwise
const ai = f.aiScore
const SCORE = ai ? ai.overall : 84
const rows = [
  { label: ['Structure', 'Estructura'], v: ai ? ai.structure : 90 },
  { label: ['Details', 'Detalles'], v: ai ? ai.details : 90 },
  { label: ['Summary', 'Resumen'], v: ai ? ai.summary : 90 },
  { label: ['Employment', 'Experiencia'], v: ai ? ai.employment : 79 },
  { label: ['Education', 'Formación'], v: ai ? ai.education : 87 },
  { label: ['Skills', 'Habilidades'], v: ai ? ai.skills : 90 }
]

const donut = computed(() => {
  const C = 2 * Math.PI * 44, off = C * (1 - SCORE / 100)
  return `<svg width="130" height="130" viewBox="0 0 130 130">
    <circle cx="65" cy="65" r="44" fill="none" stroke="#E3E9F2" stroke-width="12"/>
    <circle cx="65" cy="65" r="44" fill="none" stroke="#88AB75" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}" transform="rotate(-90 65 65)"/>
    <text x="65" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="30" fill="#02112D">${SCORE}</text>
    <text x="65" y="86" text-anchor="middle" font-size="11" fill="#9AA5B5" font-family="Inter,sans-serif">/100</text>
  </svg>`
})
</script>
