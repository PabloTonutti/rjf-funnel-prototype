<template>
  <div class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start">
    <h1>{{ f.T(screen.title) }}</h1>
    <p class="subtitle">{{ f.T(screen.sub) }}</p>
    <div class="start-badge-wrap"><span class="start-badge">💼 <u>{{ f.T(screen.badge) }}</u></span></div>
    <div v-for="(s, k) in screen.steps" :key="k" class="ps-row">
      <span class="ps-ic" v-html="duo(s.i)" />
      <span class="ps-txt"><b>{{ f.T(s.t) }}</b><small>{{ f.T(s.s) }}</small></span>
      <span class="ps-n">{{ k + 1 }}</span>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(screen.cta)" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import { duo } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
</script>
