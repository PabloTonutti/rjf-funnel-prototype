<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="card" style="max-width:480px;margin:14px auto 0;width:100%">
      <div class="illo" style="margin:6px 0 4px" v-html="donut" />
      <p style="text-align:center;font-size:14.5px;color:var(--jw-slate);margin-bottom:12px">
        {{ f.T(['Your score:', 'Tu nota:']) }} <b style="color:#5B7A4B">{{ f.T(['Good, but not optimized', 'Buena, pero sin optimizar']) }}</b>
      </p>
      <div class="score-badges">
        <span class="sbdg red"><span v-html="ic('alerttri', 13)" /> {{ issues }} {{ f.T(['issues found', 'fallos encontrados']) }}</span>
        <span class="sbdg yel"><span v-html="ic('zap', 13)" /> {{ recs }} {{ f.T(['recommendations', 'recomendaciones']) }}</span>
      </div>
      <div v-for="(r, k) in rows" :key="k" class="score-row">
        <div class="score-meta"><span>{{ f.T(r.label) }}</span><b style="color:var(--jw-blue)">{{ r.v }}%</b></div>
        <div class="score-bar"><i :style="{ width: r.v + '%', background: 'var(--jw-blue)' }" /></div>
      </div>
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ic } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Nota REAL del análisis de IA del CV / perfil de LinkedIn. REACTIVO: si el análisis
// sigue en marcha al montar la pantalla, los números se actualizan en cuanto termina.
// El estático solo queda como último recurso si el análisis falló del todo.
const ai = computed(() => f.aiScore)
// Fallback estático REALISTA (un CV normal no saca 90 en todo)
const SCORE = computed(() => ai.value ? ai.value.overall : 68)
const rows = computed(() => [
  { label: ['Structure', 'Estructura'], v: ai.value ? ai.value.structure : 72 },
  { label: ['Details', 'Detalles'], v: ai.value ? ai.value.details : 64 },
  { label: ['Summary', 'Resumen'], v: ai.value ? ai.value.summary : 61 },
  { label: ['Employment', 'Experiencia'], v: ai.value ? ai.value.employment : 75 },
  { label: ['Education', 'Formación'], v: ai.value ? ai.value.education : 78 },
  { label: ['Skills', 'Habilidades'], v: ai.value ? ai.value.skills : 70 }
])

// Fallos (dimensiones <70) y recomendaciones (70-84); mínimo 1 de cada para que
// el paso siguiente del funnel siempre tenga algo que arreglar/mejorar.
const issues = computed(() => Math.max(1, rows.value.filter(r => r.v < 70).length))
const recs = computed(() => Math.max(1, rows.value.filter(r => r.v >= 70 && r.v < 85).length))

const donut = computed(() => {
  const C = 2 * Math.PI * 44, off = C * (1 - SCORE.value / 100)
  return `<svg width="130" height="130" viewBox="0 0 130 130">
    <circle cx="65" cy="65" r="44" fill="none" stroke="#E3E9F2" stroke-width="12"/>
    <circle cx="65" cy="65" r="44" fill="none" stroke="#88AB75" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}" transform="rotate(-90 65 65)"/>
    <text x="65" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="30" fill="#02112D">${SCORE.value}</text>
    <text x="65" y="86" text-anchor="middle" font-size="11" fill="#9AA5B5" font-family="Inter,sans-serif">/100</text>
  </svg>`
})
</script>

<style scoped>
.score-badges{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:18px}
.sbdg{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;border-radius:20px;padding:6px 12px}
.sbdg :deep(svg){flex:none}
.sbdg.red{background:#FDECEC;color:#C23B3B}
.sbdg.yel{background:#FDF3D7;color:#9A6B00}
</style>
