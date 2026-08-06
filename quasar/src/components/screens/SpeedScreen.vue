<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="speed-widget">
      <div class="speed-big">{{ f.T(options[val].label) }}</div>
      <div class="speed-cards">
        <button
          v-for="(o, k) in options" :key="k"
          class="speed-card" :class="{ on: val === k }"
          @click="val = k"
        >
          <span class="speed-ic" v-html="duo(o.icon)" />
          <b>{{ f.T(o.label) }}</b>
          <small v-if="k === 1" class="speed-tag">{{ f.T(['Recommended', 'Recomendado']) }}</small>
        </button>
      </div>
      <input type="range" class="rng speed-rng" min="0" max="2" step="1" :value="val" @input="val = +$event.target.value">
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="go" />
</template>

<script setup>
import { ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { duo } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const options = [
  { label: ['1 month', '1 mes'], icon: 'bolt' },
  { label: ['3 months', '3 meses'], icon: 'clockfull' },
  { label: ['6+ months', '6+ meses'], icon: 'compass' }
]
const prev = f.answers.PSPEED
const val = ref(prev ? Math.max(0, options.findIndex(o => o.label[0] === prev.t[0])) : 1)
function go () {
  const o = options[val.value]
  f.answers.PSPEED = { t: o.label }
  f.next()
}
</script>
