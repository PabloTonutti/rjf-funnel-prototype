<template>
  <div class="wrap"><div class="screen"><div class="success-wrap">
    <div class="illo" v-html="ILLO.trophy" />
    <h1>{{ f.T(['Your account is ready!', '¡Tu cuenta está lista!']) }}</h1>
    <p class="subtitle">
      <template v-if="who">{{ f.T(['Welcome,', 'Bienvenido,']) }} <b>{{ who }}</b> 👋<br></template>
      {{ f.T(['Your 300–450 matching jobs are waiting inside.', 'Tus 300-450 empleos compatibles te esperan.']) }}
    </p>
    <button class="btn btn-primary" style="max-width:280px" @click="f.restart()">{{ f.T(['START OVER', 'Volver a empezar']) }}</button>
    <div class="mock-note">{{ f.T(['Prototype: simulated signup — no account was created.', 'Prototipo: registro simulado, no se ha creado ninguna cuenta.']) }}</div>
  </div></div></div>
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO } from 'assets/graphics'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const who = computed(() => (f.answers.P50 && f.answers.P50.name) || '')
</script>
