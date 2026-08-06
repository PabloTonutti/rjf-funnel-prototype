<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <div v-if="screen.illo" class="illo" v-html="ILLO[screen.illo]" />
    <div v-if="screen.eyebrow" class="eyebrow">{{ f.T(screen.eyebrow) }}</div>
    <h1>{{ f.T(screen.title) }}</h1>
    <p v-if="body" class="subtitle" :class="{ 'body-strong': screen.id === 'PTHANKS' }" style="margin-bottom:0">{{ body }}</p>
    <div v-if="screen.list" class="icon-list">
      <div v-for="(r, k) in screen.list" :key="k" class="row">
        <span class="ic" v-html="iconFor(r.i)" />
        <p>{{ f.T(r.t) }}</p>
      </div>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO, DUO, duo, ic } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const body = computed(() => {
  const b = props.screen.body
  if (!b) return ''
  return typeof b === 'function' ? b(f, f.lang) : f.T(b)
})
const iconFor = n => (DUO[n] ? duo(n) : ic(n))
</script>
