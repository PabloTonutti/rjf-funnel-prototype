<template>
  <!-- Cierre de JOB PREFERENCES (pasos nuevos A/B).
       variant 'list' (A): título + 3 checks + «Next: your personalized plan» (opción T3)
       variant 'pill' (B): etiqueta «Profile ready» + título + frase en recuadro (opción T4) -->
  <div class="wrap"><div class="screen"><div class="inter pd" :class="'pdv-' + screen.variant">
    <div class="illo pd-illo" v-html="ILLO.profileok" />
    <span v-if="screen.variant === 'pill'" class="pd-pill">✓ {{ f.T(['Profile ready', 'Perfil listo']) }}</span>
    <h1>{{ f.T(screen.title) }}</h1>
    <div v-if="screen.variant === 'list'" class="pd-list">
      <div v-for="(t, k) in screen.items" :key="k" class="pd-row"><span class="pd-ck" v-html="CK" /><span>{{ f.T(t) }}</span></div>
      <div class="pd-row pd-next"><i /><span><b>{{ f.T(['Next:', 'Siguiente:']) }}</b> {{ f.T(['your personalized plan', 'tu plan personalizado']) }}</span></div>
    </div>
    <p v-else class="pd-box" v-html="f.T(screen.body)" />
  </div></div></div>
  <FootContinue :label="screen.cta ? f.T(screen.cta) : f.T(['CONTINUE', 'CONTINUAR'])" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import { ILLO } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const CK = '<svg viewBox="0 0 20 20" width="22" height="22"><circle cx="10" cy="10" r="10" fill="#88AB75"/><path d="M6 10.2l2.6 2.6L14 7.4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
</script>
