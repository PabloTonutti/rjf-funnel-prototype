<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1>{{ f.T(screen.title) }}</h1>
    <p class="subtitle">{{ f.T(screen.sub) }}</p>
    <div class="ice-wrap" v-html="svg" />
    <p class="footnote" style="margin-top:12px;font-size:14px;color:var(--jw-ink);font-weight:600">{{ f.T(screen.note) }}</p>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Iceberg "empleos ocultos": punta = portales públicos, masa sumergida = empleos ocultos.
// Diseño según la referencia: facetas en la punta, masa grande atenuada bajo un velo de agua.
const svg = computed(() => {
  const pub = f.T(['Public job', 'Portales'])
  const pub2 = f.T(['boards', 'públicos'])
  const hid = f.T(['Hidden jobs', 'Empleos ocultos'])
  return `<svg viewBox="0 0 380 312" style="width:100%;max-width:480px;display:block">
    <defs>
      <linearGradient id="iceWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#E7F0FE"/><stop offset="1" stop-color="#D0E2FC"/>
      </linearGradient>
    </defs>
    <!-- agua -->
    <rect x="46" y="118" width="288" height="178" rx="16" fill="url(#iceWater)"/>
    <!-- masa sumergida -->
    <path d="M156 118 L146 148 L152 175 L140 202 L162 238 L178 266 L192 288 L210 258 L236 228 L252 194 L244 168 L254 144 L246 118 Z" fill="#4A86E0"/>
    <path d="M196 118 L246 118 L254 144 L244 168 L252 194 L236 228 L210 258 L192 288 L196 210 Z" fill="#3467BE"/>
    <path d="M156 118 L146 148 L152 175 L168 160 L172 130 Z" fill="#5D94E8" opacity=".8"/>
    <!-- velo de agua que atenúa la masa sumergida -->
    <rect x="46" y="119" width="288" height="177" rx="16" fill="#DCE8FC" opacity=".38"/>
    <line x1="54" y1="118" x2="326" y2="118" stroke="#9EC2F5" stroke-width="1.5"/>
    <!-- punta sobre el agua -->
    <path d="M156 118 L168 76 L186 90 L200 48 L219 80 L232 68 L246 118 Z" fill="#78ABF7"/>
    <path d="M200 48 L219 80 L232 68 L246 118 L200 118 Z" fill="#AFCFFF"/>
    <path d="M200 48 L186 90 L200 104 Z" fill="#D8E8FF" opacity=".9"/>
    <!-- llave izquierda: punta -->
    <path d="M128 50 q-10 2 -10 13 v14 q0 9 -8 11 q8 2 8 11 v14 q0 11 10 13" fill="none" stroke="#4A86E0" stroke-width="2.5" stroke-linecap="round"/>
    <text x="104" y="80" text-anchor="end" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="13.5" fill="#0A1F44">${pub}</text>
    <text x="104" y="98" text-anchor="end" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="13.5" fill="#0A1F44">${pub2}</text>
    <!-- llave derecha: masa oculta -->
    <path d="M266 128 q10 2 10 13 v48 q0 9 8 11 q-8 2 -8 11 v48 q0 11 -10 13" fill="none" stroke="#4A86E0" stroke-width="2.5" stroke-linecap="round"/>
    <text x="290" y="206" text-anchor="start" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="13.5" fill="#0A1F44">${hid}</text>
  </svg>`
})
</script>

<style scoped>
.ice-wrap{display:flex;justify-content:center;margin-top:14px}
</style>
