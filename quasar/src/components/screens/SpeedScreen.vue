<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="speed-widget">
      <div class="speed-big">{{ bigLabel }}</div>
      <div class="speed-icons">
        <span class="speed-ic" :class="{ on: val <= 2 }" v-html="duo('bolt')" @click="val = 1" />
        <span class="speed-ic" :class="{ on: val >= 3 && val <= 4 }" v-html="duo('clockfull')" @click="val = 3" />
        <span class="speed-ic" :class="{ on: val >= 5 }" v-html="duo('compass')" @click="val = 6" />
      </div>
      <input
        type="range" class="rng speed-rng" min="1" max="6" step="1"
        :value="val" @input="val = +$event.target.value"
        :aria-label="f.T(['Months to find a job', 'Meses para encontrar empleo'])"
      >
      <div class="speed-labels">
        <span :class="{ on: val <= 2 }" @click="val = 1">{{ f.T(['1 month', '1 mes']) }}</span>
        <span :class="{ on: val >= 3 && val <= 4 }" @click="val = 3">{{ f.T(['3 months', '3 meses']) }}</span>
        <span :class="{ on: val >= 5 }" @click="val = 6">{{ f.T(['6+ months', '6+ meses']) }}</span>
      </div>
      <div v-if="val === 3" class="speed-reco">{{ f.T(['Recommended', 'Recomendado']) }}</div>
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="go" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { duo } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Continuous 1–6: the ball moves month by month; 6 means "6+"
const prev = f.answers.PSPEED
const val = ref(prev && prev.months ? prev.months : 3)

const bigLabel = computed(() => labelFor(val.value, f.lang))
function labelFor (m, lang) {
  if (m >= 6) return lang === 'en' ? '6+ months' : '6+ meses'
  if (m === 1) return lang === 'en' ? '1 month' : '1 mes'
  return lang === 'en' ? `${m} months` : `${m} meses`
}
function go () {
  f.answers.PSPEED = { months: val.value, t: [labelFor(val.value, 'en'), labelFor(val.value, 'es')] }
  f.next()
}
</script>
