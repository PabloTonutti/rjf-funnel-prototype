<template>
  <div class="wrap"><div class="screen"><div class="success-wrap">
    <div class="illo" v-html="ILLO.trophy" />
    <h1>{{ f.T(['Subscription activated!', '¡Suscripción activada!']) }}</h1>
    <p class="subtitle">
      {{ f.T(['Plan', 'Plan']) }} <b>{{ f.T(plan.name) }}</b> · {{ plan.price }} {{ f.T(['with 60% off.', 'con 60% de descuento.']) }}<br>
      {{ f.T(['Your 300–450 matching jobs are waiting inside.', 'Tus 300-450 empleos compatibles te esperan.']) }}
    </p>
    <button class="btn btn-primary" style="max-width:280px" @click="f.restart()">{{ f.T(['START OVER', 'Volver a empezar']) }}</button>
    <div class="mock-note">{{ f.T(['Prototype: simulated payment — no real charge was made.', 'Prototipo: pago simulado, no se ha realizado ningún cargo real.']) }}</div>
  </div></div></div>
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO } from 'assets/graphics'
import { PLANS } from 'src/data/screens'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const plan = computed(() => PLANS[f.selectedPlan])
</script>
