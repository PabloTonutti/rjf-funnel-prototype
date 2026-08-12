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

// Opiniones REALES en inglés (trustpilot.com/review/jobwinner.ai · 4.7 "Excellent" · 41 reviews)
const REVIEWS = [
  { n: 'Conall Bradley', d: 'Jan 13, 2026', t: 'From silence to 3 interviews in 1 week', x: "I've landed 3 interviews for roles I'm actually excited about. The Skills Match is basically a cheat sheet for beating the ATS." },
  { n: 'Lavallée Alexandre', d: 'Feb 15, 2026', t: 'A must-have for interview prep', x: 'Helped me organize my entire interview preparation process. A systematic approach rather than winging it — this tool delivers.' },
  { n: 'Disha', d: 'Dec 18, 2025', t: 'Made my applications easier', x: 'It tailors your CV and cover letter to each role and shows how well you match with a fit score. Helped me apply with more confidence.' },
  { n: 'Michael Trailer', d: 'Mar 16, 2026', t: 'Support that makes a difference', x: 'I really appreciate the support and the quick response from the team. Their kindness and customer support made a real difference.' },
  { n: 'Montse Lorente', d: 'Dec 23, 2025', t: 'Great tool', x: 'Easy to use, intuitive. I would recommend it to anyone looking for a job who wants to accelerate their search.' },
  { n: 'Belén Franco', d: 'Dec 22, 2025', t: 'I love using it with my clients', x: 'An amazing tool that has helped my clients land jobs faster and focus on the important things.' }
]
const row1 = REVIEWS.slice(0, 3)
const row2 = REVIEWS.slice(3)
const loop = arr => [...arr, ...arr, ...arr] // triplicado para bucle continuo sin salto

const TP_STAR = c => `<svg viewBox="0 0 24 24" width="17" height="17"><rect width="24" height="24" fill="${c}"/><path fill="#fff" d="M12 3.5l2.1 5.2 5.6.3-4.3 3.6 1.4 5.4L12 15l-4.8 3 1.4-5.4-4.3-3.6 5.6-.3z"/></svg>`
const stars = n => Array.from({ length: n }, () => TP_STAR('#00B67A')).join('')
const TP_MINI = TP_STAR('#00B67A')
const TP_LOGO = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#00B67A" d="M12 1.5l2.8 6.9 7.4.4-5.7 4.8 1.9 7.2L12 16.7l-6.4 4.1 1.9-7.2-5.7-4.8 7.4-.4z"/></svg><span class="tp-word">Trustpilot</span>`
</script>
