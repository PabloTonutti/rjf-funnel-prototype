<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1>{{ f.T(screen.title) }}</h1>

    <!-- matches: fresh top-matches card -->
    <div v-if="screen.variant === 'matches'" class="bf-card">
      <div class="bf-head">
        <span class="dots"><i style="background:#DE8F6E"/><i style="background:#F2C037"/><i style="background:#88AB75"/></span>
        <b>{{ f.T(['3 fresh top matches for you', '3 matches nuevos para ti']) }}</b>
        <span class="bf-pill">✓ {{ f.T(['Updated today', 'Actualizado hoy']) }}</span>
      </div>
      <div v-for="(j, k) in jobs" :key="k" class="bf-row">
        <span class="bf-logo" :style="{ background: j.c }">{{ j.co[0] }}</span>
        <span class="bf-job"><b>{{ j.role }}</b><small>{{ j.co }} · {{ f.T(j.meta) }}</small></span>
        <span class="bf-match">{{ j.m }}%<small>match</small></span>
      </div>
    </div>

    <!-- ats: before/after resume score -->
    <div v-else-if="screen.variant === 'ats'" class="bf-card bf-ats">
      <div class="bf-score before"><small>{{ f.T(['BEFORE', 'ANTES']) }}</small><b>62</b><span>{{ f.T(['Resume score', 'Nota del CV']) }}</span></div>
      <div class="bf-mini-cv">
        <div class="bf-cv-head"><span class="bf-av">AR</span><span><b>Alex Richter</b><small>Senior Product Manager</small></span></div>
        <div class="bf-strike">{{ f.T(['Responsible for team', 'Responsable del equipo']) }}</div>
        <div class="bf-fixed">{{ f.T(['Scaled team of 8 engineers…', 'Escaló un equipo de 8 ingenieros…']) }}</div>
        <ul>
          <li>{{ f.T(['Replaced 3 weak verbs', '3 verbos débiles reemplazados']) }}</li>
          <li>{{ f.T(['Quantified 7 metrics', '7 métricas cuantificadas']) }}</li>
          <li>{{ f.T(['Added ATS keywords', 'Keywords ATS añadidas']) }}</li>
        </ul>
      </div>
      <div class="bf-score after"><small>{{ f.T(['AFTER', 'DESPUÉS']) }}</small><b>94</b><span>{{ f.T(['Resume score', 'Nota del CV']) }}</span></div>
    </div>

    <!-- speed: others vs jobwinner time -->
    <div v-else-if="screen.variant === 'speed'" class="bf-card bf-speed">
      <div class="bf-time">
        <small>{{ f.T(['OTHERS', 'OTROS']) }}</small>
        <span class="ring gray"><b>~45</b></span>
        <span class="bf-tlabel">~45 min</span>
      </div>
      <div class="bf-time">
        <small>JOBWINNER</small>
        <span class="ring blue"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#007AFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <span class="bf-tlabel" style="color:var(--jw-blue);font-weight:700">5 min</span>
      </div>
      <div class="bf-saved">{{ f.T(['40 min saved per application', '40 min ahorrados por solicitud']) }}</div>
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

const jobs = [
  { role: 'Senior Product Manager', co: 'Nordia', meta: ['Hybrid · 85–110k €', 'Híbrido · 85-110k €'], m: 96, c: '#02112D' },
  { role: 'Product Manager, Growth', co: 'Peoplr', meta: ['Remote · 75–95k €', 'Remoto · 75-95k €'], m: 93, c: '#007AFF' },
  { role: 'Lead Product Manager', co: 'Deliveo', meta: ['Berlin · 95–125k €', 'Berlín · 95-125k €'], m: 91, c: '#DE8F6E' }
]
</script>
