<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1 class="h1-xl" style="max-width:520px;margin-left:auto;margin-right:auto">{{ f.T(screen.title) }}</h1>

    <div class="tp-logo" v-html="TP_LOGO" />
    <div class="tp-badge">
      <span class="tp-stars" v-html="stars(5)" />
      <span>{{ f.T(['Rated "Excellent" on Trustpilot · 4.7', 'Calificado como "Excelente" en Trustpilot · 4,7']) }}</span>
    </div>

    <!-- Reviews reales de es.trustpilot.com/review/jobwinner.ai en marquesina (2 filas, direcciones opuestas) -->
    <div class="tp-marquee">
      <div class="tp-track">
        <div v-for="(r, k) in loop(row1)" :key="'a' + k" class="tp-card">
          <div class="tp-head"><span class="tp-stars" v-html="stars(5)" /><span class="tp-date">{{ r.d }}</span></div>
          <b>{{ r.t }}</b>
          <p>{{ r.x }}</p>
          <div class="tp-foot"><span class="tp-mini" v-html="TP_MINI" /><span class="tp-name">{{ r.n }}</span></div>
        </div>
      </div>
    </div>
    <div class="tp-marquee">
      <div class="tp-track rev">
        <div v-for="(r, k) in loop(row2)" :key="'b' + k" class="tp-card">
          <div class="tp-head"><span class="tp-stars" v-html="stars(5)" /><span class="tp-date">{{ r.d }}</span></div>
          <b>{{ r.t }}</b>
          <p>{{ r.x }}</p>
          <div class="tp-foot"><span class="tp-mini" v-html="TP_MINI" /><span class="tp-name">{{ r.n }}</span></div>
        </div>
      </div>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Opiniones REALES (es.trustpilot.com/review/jobwinner.ai · 4,7 "Excelente" · 41 opiniones)
const REVIEWS = [
  { n: 'Mariel Jara', d: '10 jul 2026', t: 'La herramienta es muy útil', x: 'Muy útil para personalizar el CV y la carta de acuerdo a la oferta y ver el porcentaje de match con el puesto.' },
  { n: 'Karol Guerrero Soto', d: '20 abr 2026', t: '¡Excelente herramienta!', x: 'La usé y me funcionó muy bien. Te indica las áreas que debes mejorar para que el algoritmo de LinkedIn te visualice mejor.' },
  { n: 'Pablo Labarta', d: '14 abr 2026', t: 'Una plataforma que evoluciona', x: 'Unos cracks. Profesionalidad y transparencia desde el primer momento. Escuchan el feedback y mejoran la app constantemente.' },
  { n: 'Ivon', d: '17 mar 2026', t: 'Es una herramienta muy útil', x: 'Te ayuda a personalizar tu experiencia potenciando las habilidades que encajan con el perfil requerido. Buenísimo.' },
  { n: 'Giovanna Mejia', d: '2 dic 2025', t: 'La mejor inversión', x: 'Subes tu CV y te lo redacta acorde a la oferta. Te quita el estrés y te deja centrarte en la entrevista. Os lo recomiendo.' },
  { n: 'M. Rivas', d: '6 nov 2025', t: 'Vale la pena', x: 'Muy útil para no tener que estar modificando interminablemente tu CV. ¿Vale la pena? Sí, 100%.' }
]
const row1 = REVIEWS.slice(0, 3)
const row2 = REVIEWS.slice(3)
const loop = arr => [...arr, ...arr, ...arr] // triplicado para bucle continuo sin salto

const TP_STAR = c => `<svg viewBox="0 0 24 24" width="17" height="17"><rect width="24" height="24" fill="${c}"/><path fill="#fff" d="M12 3.5l2.1 5.2 5.6.3-4.3 3.6 1.4 5.4L12 15l-4.8 3 1.4-5.4-4.3-3.6 5.6-.3z"/></svg>`
const stars = n => Array.from({ length: n }, () => TP_STAR('#00B67A')).join('')
const TP_MINI = TP_STAR('#00B67A')
const TP_LOGO = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#00B67A" d="M12 1.5l2.8 6.9 7.4.4-5.7 4.8 1.9 7.2L12 16.7l-6.4 4.1 1.9-7.2-5.7-4.8 7.4-.4z"/></svg><span class="tp-word">Trustpilot</span>`
</script>
