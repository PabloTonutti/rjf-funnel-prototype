<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <div class="illo" v-html="donut" />
    <div class="eyebrow" :class="{ 'eb-lg': screen.bigVis }">{{ f.T(screen.eyebrow) }}</div>
    <h1>{{ f.T(screen.title) }}</h1>
    <p class="subtitle" style="margin-bottom:0">{{ f.T(screen.body) }}</p>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
// color: opcional por slide (p.ej. P24H en rojo, dato negativo como el 75 %)
const donut = computed(() => ILLO.donut(props.screen.pct, props.screen.color || (props.screen.pct >= 75 ? '#DE8F6E' : '#007AFF')))
</script>
