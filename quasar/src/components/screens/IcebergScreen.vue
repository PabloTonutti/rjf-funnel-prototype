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

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Iceberg "empleos ocultos": punta = portales públicos, masa sumergida = empleos ocultos.
// Diseño según la referencia: facetas en la punta, masa grande atenuada bajo un velo de agua.
const svg = computed(() => props.screen.v2 ? svgV2() : svgV1())

// v2 (paso HOW WE HELP nuevo): iceberg con facetas marcadas, masa sumergida grande y nítida y agua en degradado
function svgV2 () {
  const pub = f.T(['Public job', 'Portales'])
  const pub2 = f.T(['boards', 'públicos'])
  const hid = f.T(['Hidden jobs', 'Empleos ocultos'])
  return `<svg viewBox="0 0 380 330" style="width:100%;max-width:480px;display:block">
    <defs>
      <linearGradient id="iw2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEF4FE"/><stop offset="1" stop-color="#CFDFFA"/></linearGradient>
    </defs>
    <rect x="30" y="112" width="320" height="206" rx="18" fill="url(#iw2)"/>
    <!-- masa sumergida: facetas -->
    <path d="M152 112 L144 132 L150 162 L136 200 L156 248 L176 284 L190 312 L206 290 L222 232 L244 196 L250 150 L238 112 Z" fill="#3E7FDB"/>
    <path d="M196 112 L238 112 L250 150 L244 196 L222 232 L206 290 L190 312 L198 236 L186 168 Z" fill="#2C5FB0"/>
    <path d="M222 112 L238 112 L250 150 L232 140 Z" fill="#24508F"/>
    <path d="M152 112 L144 132 L150 162 L176 140 L170 112 Z" fill="#5E97EA"/>
    <path d="M136 200 L156 248 L176 284 L170 230 L150 200 Z" fill="#5590E6"/>
    <path d="M222 232 L206 290 L198 236 L214 214 Z" fill="#1F4A8A"/>
    <!-- velo de agua suave -->
    <rect x="30" y="113" width="320" height="205" rx="18" fill="#E3EDFD" opacity=".16"/>
    <line x1="30" y1="112" x2="350" y2="112" stroke="#9EC2F5" stroke-width="1.5"/>
    <!-- punta sobre el agua -->
    <path d="M152 112 L170 62 L186 74 L200 38 L222 70 L232 62 L238 112 Z" fill="#4A88E3"/>
    <path d="M200 38 L222 70 L232 62 L238 112 L204 112 L210 76 Z" fill="#8DB9F6"/>
    <path d="M200 38 L186 74 L196 96 L210 76 Z" fill="#B9D5FC"/>
    <path d="M170 62 L186 74 L196 96 L178 112 L152 112 Z" fill="#3A78D6"/>
    <!-- llave izquierda: punta -->
    <path d="M136 40 q-8 2 -8 11 v18 q0 8 -7 10 q7 2 7 10 v12 q0 9 8 11" fill="none" stroke="#2C5FB0" stroke-width="2.5" stroke-linecap="round"/>
    <text x="112" y="74" text-anchor="end" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="14" fill="#0A1F44">${pub}</text>
    <text x="112" y="92" text-anchor="end" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="14" fill="#0A1F44">${pub2}</text>
    <!-- llave derecha: masa oculta -->
    <path d="M262 116 q9 2 9 12 v70 q0 9 8 11 q-8 2 -8 11 v70 q0 10 -9 12" fill="none" stroke="#2C5FB0" stroke-width="2.5" stroke-linecap="round"/>
    <text x="288" y="214" text-anchor="start" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="14" fill="#0A1F44">${hid}</text>
  </svg>`
}

function svgV1 () {
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
}
</script>

<style scoped>
.ice-wrap{display:flex;justify-content:center;margin-top:14px}
</style>
