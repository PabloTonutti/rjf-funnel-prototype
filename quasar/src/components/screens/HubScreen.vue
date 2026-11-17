<template>
  <!-- Hub «todo en uno» (opción C5): copa en el centro, 4 áreas alrededor y pastilla con la cifra de herramientas -->
  <div class="wrap"><div class="screen"><div class="inter hub">
    <span v-if="screen.chip" class="ai-chip">✨ {{ f.T(screen.chip) }}</span>
    <h1 v-html="f.T(screen.title)" />
    <div class="hub-orb">
      <div class="hub-core" v-html="CUP" />
      <div v-for="(it, k) in screen.items" :key="k" class="hub-sat" :class="['s' + k, { show: shown > k }]">
        <span class="ai-ic" :class="it.c" v-html="duo(it.i)" />
        <b>{{ f.T(it.t) }}</b>
      </div>
    </div>
    <span v-if="screen.pill" class="hub-pill">{{ f.T(screen.pill) }}</span>
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
const CUP = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 9h18v8a9 9 0 0 1-18 0z" fill="#007AFF"/><path d="M15 11h-4a5 5 0 0 0 5 6M33 11h4a5 5 0 0 1-5 6" fill="none" stroke="#007AFF" stroke-width="2.6"/><path d="M24 26v6M18 36h12" stroke="#02112D" stroke-width="3" stroke-linecap="round"/><path d="M36 4l1.2 2.8 2.8 1.2-2.8 1.2L36 12l-1.2-2.8L32 8l2.8-1.2z" fill="#F2C037"/></svg>'
const shown = ref(0)
let timers = []
onMounted(() => {
  const n = props.screen.items.length
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { shown.value = n; return }
  for (let k = 0; k < n; k++) timers.push(setTimeout(() => { shown.value = k + 1 }, 300 + k * 300))
})
onUnmounted(() => timers.forEach(clearTimeout))
</script>
