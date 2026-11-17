<template>
  <!-- Timeline vertical «How JobWinner works»: los pasos entran uno a uno; el último (objetivo) va destacado -->
  <div class="wrap"><div class="screen"><div class="inter tl2">
    <span v-if="screen.chip" class="ai-chip">✨ {{ f.T(screen.chip) }}</span>
    <h1>{{ f.T(screen.title) }}</h1>
    <ol class="tl2-list">
      <li v-for="(it, k) in screen.items" :key="k" class="tl2-step" :class="{ show: shown > k, last: k === screen.items.length - 1 }">
        <span class="tl2-ic" v-html="duo(it.i)" />
        <div class="tl2-tx"><span class="tl2-n">{{ f.T(['Step', 'Paso']) }} {{ k + 1 }}</span><b v-html="f.T(it.t)" /></div>
      </li>
    </ol>
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
  for (let k = 0; k < n; k++) timers.push(setTimeout(() => { shown.value = k + 1 }, 300 + k * 380))
})
onUnmounted(() => timers.forEach(clearTimeout))
</script>
