<template>
  <!-- Entrevistas por semana (paso YOUR GOALS nuevo). Mismo widget que PSPEED: número grande, 3 iconos, slider 1–7 y etiqueta de ritmo -->
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="speed-widget">
      <div class="speed-big">{{ bigLabel }}</div>
      <div class="speed-icons">
        <span class="speed-ic" :class="{ on: val <= 2 }" v-html="duo('sun')" @click="val = 1" />
        <span class="speed-ic" :class="{ on: val >= 3 && val <= 5 }" v-html="duo('mic')" @click="val = 4" />
        <span class="speed-ic" :class="{ on: val >= 6 }" v-html="duo('rocket')" @click="val = 7" />
      </div>
      <input
        type="range" class="rng speed-rng" min="1" max="7" step="1"
        :value="val" @input="val = +$event.target.value"
        :aria-label="f.T(['Interviews per week', 'Entrevistas por semana'])"
      >
      <div class="speed-labels">
        <span :class="{ on: val === 1 }" @click="val = 1">1</span>
        <span :class="{ on: val === 4 }" @click="val = 4">4</span>
        <span :class="{ on: val === 7 }" @click="val = 7">7</span>
      </div>
      <div class="speed-reco">{{ f.T(pace) }}</div>
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'CONTINUAR'])" @go="go" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { duo } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const prev = f.answers[props.screen.id]
const val = ref(prev && prev.n ? prev.n : 3)

const labelFor = (n, lang) => lang === 'en' ? `${n} per week` : `${n} por semana`
const bigLabel = computed(() => labelFor(val.value, f.lang))
const pace = computed(() => val.value <= 2 ? ['Steady start', 'Ritmo tranquilo'] : val.value <= 5 ? ['Great pace', 'Buen ritmo'] : ['Ambitious goal', 'Objetivo ambicioso'])
function go () {
  f.answers[props.screen.id] = { n: val.value, t: [labelFor(val.value, 'en'), labelFor(val.value, 'es')] }
  f.next()
}
</script>
