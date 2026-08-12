<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1 class="h1-xl" style="max-width:520px;margin-left:auto;margin-right:auto">{{ f.T(screen.title) }}</h1>
    <div class="pot-card">
      <h3>{{ f.T(['Your interviews', 'Your interviews']) }}</h3>
      <div v-html="svg" style="display:flex;justify-content:center" />
      <p class="footnote pot-note">{{ f.T([
        'Based on JobWinner historical data, responses usually take a while at first. But after 14 days you start receiving interview invitations much faster.',
        'Based on JobWinner historical data, responses usually take a while at first. But after 14 days you start receiving interview invitations much faster.'
      ]) }}</p>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Curva de entrevistas: plana al principio (7→14 días) y despega hasta el trofeo (3 meses).
const svg = computed(() => {
  const blue = '#007AFF'
  return `<svg viewBox="0 0 360 230" style="width:100%;max-width:460px">
    <defs>
      <linearGradient id="potFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${blue}" stop-opacity=".22"/>
        <stop offset="100%" stop-color="${blue}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <line x1="30" y1="100" x2="330" y2="100" stroke="#D9DEE7" stroke-width="1.5" stroke-dasharray="4 5"/>
    <line x1="30" y1="145" x2="330" y2="145" stroke="#D9DEE7" stroke-width="1.5" stroke-dasharray="4 5"/>
    <path d="M45 172 C 105 170, 135 168, 168 163 C 225 152, 262 118, 300 62 L 300 190 L 45 190 Z" fill="url(#potFill)" stroke="none"/>
    <path d="M45 172 C 105 170, 135 168, 168 163" fill="none" stroke="#1C2333" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M168 163 C 225 152, 262 118, 300 62" fill="none" stroke="${blue}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="30" y1="190" x2="330" y2="190" stroke="#C9D1DC" stroke-width="2"/>
    <circle cx="45" cy="172" r="7.5" fill="#fff" stroke="#1C2333" stroke-width="4"/>
    <circle cx="168" cy="163" r="7.5" fill="#fff" stroke="#1C2333" stroke-width="4"/>
    <g>
      <circle cx="303" cy="56" r="22" fill="${blue}"/>
      <g fill="#fff" transform="translate(303,56)">
        <path d="M-7 -9 h14 v4.5 a7 7 0 0 1 -14 0 z"/>
        <path d="M-9.5 -9 h2.5 v4 a4.5 4.5 0 0 1 -2.5 -4 z" opacity=".85"/>
        <path d="M9.5 -9 h-2.5 v4 a4.5 4.5 0 0 0 2.5 -4 z" opacity=".85"/>
        <rect x="-1.6" y="1.5" width="3.2" height="5"/>
        <rect x="-5.5" y="6.5" width="11" height="3" rx="1.2"/>
      </g>
    </g>
    <text x="45" y="215" text-anchor="middle" font-size="15" font-weight="700" fill="#5A6474" font-family="Inter,sans-serif">${f.T(['7 days', '7 días'])}</text>
    <text x="168" y="215" text-anchor="middle" font-size="15" font-weight="700" fill="#5A6474" font-family="Inter,sans-serif">${f.T(['14 days', '14 días'])}</text>
    <text x="300" y="215" text-anchor="middle" font-size="15" font-weight="700" fill="#5A6474" font-family="Inter,sans-serif">${f.T(['3 months', '3 meses'])}</text>
  </svg>`
})
</script>
