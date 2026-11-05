<template>
  <div class="wrap"><div class="screen"><div class="inter ai-ben">
    <span class="ai-chip">✨ {{ f.T(screen.chip) }}</span>
    <h1>{{ f.T(screen.title) }}</h1>
    <!-- Las tarjetas aparecen una a una (como en RJF); con movimiento reducido salen todas a la vez -->
    <div class="ai-list">
      <div v-for="(it, k) in screen.items" :key="k" class="ai-row" :class="{ show: shown > k }">
        <span class="ai-ic" :class="it.c" v-html="duo(it.i)" />
        <b v-html="f.T(it.t)" />
      </div>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'CONTINUAR'])" @go="f.next()" />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { duo } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const shown = ref(0)
let timers = []
onMounted(() => {
  const n = props.screen.items.length
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { shown.value = n; return }
  for (let k = 0; k < n; k++) timers.push(setTimeout(() => { shown.value = k + 1 }, 350 + k * 450))
})
onUnmounted(() => timers.forEach(clearTimeout))
</script>
