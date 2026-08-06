<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1 class="bf-title">{{ f.T(screen.title) }}</h1>

    <!-- matches: animated fresh-matches card -->
    <div v-if="screen.variant === 'matches'" class="bf-card bf-anim">
      <div class="bf-shimmer" />
      <div class="bf-head">
        <span class="dots"><i style="background:#DE8F6E"/><i style="background:#F2C037"/><i style="background:#88AB75"/></span>
        <b>{{ f.T(['Fresh top matches for you', 'Matches nuevos para ti']) }}</b>
        <span class="bf-pill">✓ {{ f.T(['Updated today', 'Actualizado hoy']) }}</span>
      </div>
      <div v-for="(j, k) in jobs" :key="k" class="bf-row bf-row-loop" :style="{ animationDelay: (k * 0.35) + 's' }">
        <span class="bf-logo" :style="{ background: j.c }">{{ j.co[0] }}</span>
        <span class="bf-job"><b>{{ j.role }}</b><small>{{ j.co }} · {{ f.T(j.meta) }}</small></span>
        <span class="bf-match">{{ j.m }}%<small>match</small></span>
      </div>
      <div class="bf-scanline">{{ f.T(['Scanning 5M+ open jobs…', 'Escaneando 5M+ empleos…']) }}</div>
    </div>

    <!-- ats: before/after resume, mobile-first -->
    <div v-else-if="screen.variant === 'ats'" class="bf-card">
      <div class="bf-scores-row">
        <div class="bf-score before"><small>{{ f.T(['BEFORE', 'ANTES']) }}</small><b>62</b><span>{{ f.T(['Resume score', 'Nota del CV']) }}</span></div>
        <span class="bf-arrow" v-html="ic('arrowright')" />
        <div class="bf-score after"><small>{{ f.T(['AFTER', 'DESPUÉS']) }}</small><b>94</b><span>{{ f.T(['Resume score', 'Nota del CV']) }}</span></div>
      </div>
      <div class="bf-mini-cv">
        <div class="bf-cv-head"><span class="bf-av">AR</span><span><b>Alex Richter</b><small>Senior Product Manager</small></span><span class="bf-pill" style="margin-left:auto">ATS ✓</span></div>
        <div class="bf-strike">{{ f.T(['Responsible for team', 'Responsable del equipo']) }}</div>
        <div class="bf-fixed">{{ f.T(['Scaled team of 8 engineers…', 'Escaló un equipo de 8 ingenieros…']) }}</div>
        <ul>
          <li>{{ f.T(['Replaced 3 weak verbs', '3 verbos débiles reemplazados']) }}</li>
          <li>{{ f.T(['Quantified 7 metrics', '7 métricas cuantificadas']) }}</li>
          <li>{{ f.T(['Tailored to each job description', 'Adaptado a cada oferta']) }}</li>
        </ul>
      </div>
    </div>

    <!-- speed: others vs jobwinner -->
    <div v-else-if="screen.variant === 'speed'" class="bf-card">
      <div class="bf-speed-grid">
        <div class="bf-time">
          <small>{{ f.T(['OTHERS', 'OTROS']) }}</small>
          <span class="ring gray" v-html="ringSvg(92, '#C6CFDC', '~45')" />
          <span class="bf-tlabel">{{ f.T(['~45 min / application', '~45 min / solicitud']) }}</span>
        </div>
        <div class="bf-time">
          <small style="color:var(--jw-blue)">JOBWINNER</small>
          <span class="ring blue" v-html="ringSvg(11, '#007AFF', '5')" />
          <span class="bf-tlabel" style="color:var(--jw-blue);font-weight:700">{{ f.T(['5 min / application', '5 min / solicitud']) }}</span>
        </div>
      </div>
      <div class="bf-saved-wrap"><span class="bf-saved">⚡ {{ f.T(['40 min saved on every application', '40 min ahorrados en cada solicitud']) }}</span></div>
    </div>

    <!-- all: stacked list of every benefit (start to finish) -->
    <div v-else-if="screen.variant === 'all'" style="max-width:480px;margin:14px auto 0;width:100%">
      <div v-for="(b, k) in allRows" :key="k" class="ball-row" :style="{ animationDelay: (0.15 + k * 0.15) + 's' }">
        <span class="ball-ic" v-html="duo(b.ic)" />
        <span style="flex:1;text-align:left"><b>{{ f.T(b.t) }}</b><small>{{ f.T(b.s) }}</small></span>
        <span class="ball-chev">›</span>
      </div>
    </div>

    <!-- prep: AI mock interview -->
    <div v-else class="bf-card" style="text-align:left">
      <div class="bf-head" style="border-bottom:none;padding-bottom:0;margin-bottom:12px">
        <span class="bf-micico" v-html="duo('mic')" />
        <b>{{ f.T(['AI Mock Interview', 'Entrevista simulada con IA']) }}</b>
        <span class="bf-pill">🎙 {{ f.T(['Voice-based', 'Por voz']) }}</span>
      </div>
      <div class="bf-quote">&ldquo;{{ f.T(['Tell me about a time you led a project under pressure…', 'Cuéntame una vez que lideraste un proyecto bajo presión…']) }}&rdquo;</div>
      <div class="feat"><span class="ck" v-html="ic('check')" /> {{ f.T(['Realistic questions for your exact role', 'Preguntas realistas para tu puesto exacto']) }}</div>
      <div class="feat"><span class="ck" v-html="ic('check')" /> {{ f.T(['Instant feedback on every answer', 'Feedback instantáneo en cada respuesta']) }}</div>
      <div class="feat"><span class="ck" v-html="ic('check')" /> {{ f.T(['Practice until you walk in confident', 'Practica hasta entrar con confianza']) }}</div>
    </div>

  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import { duo, ic } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const allRows = [
  { ic: 'search', t: ['Find jobs that match your profile', 'Encuentra empleos que encajan con tu perfil'], s: ['5M+ open jobs scanned daily', '5M+ empleos escaneados a diario'] },
  { ic: 'doccheck', t: ['Get 3× more interviews', 'Consigue 3× más entrevistas'], s: ['ATS-ready resumes & tailoring', 'CVs listos para ATS y tailoring'] },
  { ic: 'boltcirc', t: ['Apply in ~5 minutes', 'Aplica en ~5 minutos'], s: ['40 min saved per application', '40 min ahorrados por solicitud'] },
  { ic: 'mic', t: ['Practice interviews with AI', 'Practica entrevistas con IA'], s: ['Voice mocks + instant feedback', 'Simulacros por voz + feedback instantáneo'] }
]

const jobs = [
  { role: 'Senior Product Manager', co: 'Nordia', meta: ['Hybrid · 85–110k €', 'Híbrido · 85-110k €'], m: 96, c: '#02112D' },
  { role: 'Product Manager, Growth', co: 'Peoplr', meta: ['Remote · 75–95k €', 'Remoto · 75-95k €'], m: 93, c: '#007AFF' },
  { role: 'Lead Product Manager', co: 'Deliveo', meta: ['Berlin · 95–125k €', 'Berlín · 95-125k €'], m: 91, c: '#DE8F6E' }
]

// The matches card loops via pure CSS keyframes (see .bf-row-loop)

function ringSvg (pct, color, label) {
  const C = 2 * Math.PI * 30, off = C * (1 - pct / 100)
  return `<svg width="76" height="76" viewBox="0 0 76 76">
    <circle cx="38" cy="38" r="30" fill="none" stroke="#EDF1F7" stroke-width="8"/>
    <circle cx="38" cy="38" r="30" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}" transform="rotate(-90 38 38)" style="transition:stroke-dashoffset 1s ease"/>
    <text x="38" y="43" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-weight="800" font-size="19" fill="#02112D">${label}</text>
    <text x="38" y="56" text-anchor="middle" font-size="9" fill="#9AA5B5" font-family="Inter,sans-serif">min</text>
  </svg>`
}
</script>
