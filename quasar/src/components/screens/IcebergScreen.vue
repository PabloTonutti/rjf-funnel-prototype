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
const svg = computed(() => {
  const pub = f.T(['Public job', 'Portales'])
  const pub2 = f.T(['boards', 'públicos'])
  const hid = f.T(['Hidden jobs', 'Empleos ocultos'])
  return `<svg viewBox="0 0 380 300" style="width:100%;max-width:460px;display:block">
    <defs>
      <linearGradient id="iceWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#E3EEFF"/><stop offset="1" stop-color="#CFE1FD"/>
      </linearGradient>
    </defs>
    <!-- agua -->
    <rect x="52" y="118" width="276" height="164" rx="16" fill="url(#iceWater)"/>
    <line x1="60" y1="118" x2="320" y2="118" stroke="#9EC2F5" stroke-width="1.5"/>
    <!-- masa sumergida (empleos ocultos) -->
    <path d="M142 120 L238 120 L246 150 L236 168 L244 196 L214 250 L196 270 L176 246 L152 220 L158 186 L146 158 Z" fill="#3E7EDB"/>
    <path d="M190 120 L238 120 L246 150 L236 168 L244 196 L214 250 L196 270 L192 200 Z" fill="#2F66B8" opacity=".85"/>
    <!-- punta (portales públicos) -->
    <path d="M148 118 L166 62 L190 42 L214 70 L232 118 Z" fill="#6FA7F6"/>
    <path d="M190 42 L214 70 L232 118 L196 118 Z" fill="#A9CBFF"/>
    <!-- llave izquierda: punta -->
    <path d="M120 48 q-9 2 -9 12 v10 q0 8 -7 10 q7 2 7 10 v10 q0 10 9 12" fill="none" stroke="#2F66B8" stroke-width="2.4" stroke-linecap="round"/>
    <text x="96" y="72" text-anchor="end" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="13.5" fill="#02112D">${pub}</text>
    <text x="96" y="90" text-anchor="end" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="13.5" fill="#02112D">${pub2}</text>
    <!-- llave derecha: masa oculta -->
    <path d="M262 132 q9 2 9 12 v34 q0 8 7 10 q-7 2 -7 10 v34 q0 10 -9 12" fill="none" stroke="#2F66B8" stroke-width="2.4" stroke-linecap="round"/>
    <text x="286" y="193" text-anchor="start" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="13.5" fill="#02112D">${hid}</text>
  </svg>`
})
</script>

<style scoped>
.ice-wrap{display:flex;justify-content:center;margin-top:14px}
</style>
