<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1>{{ f.T(screen.title) }}</h1>
    <div class="x3-card">
      <div class="x3-cols">
        <div class="x3-col">
          <b>{{ f.T(['Without JobWinner', 'Sin JobWinner']) }}</b>
          <div class="x3-spacer"></div>
          <span class="x3-pill">20%</span>
        </div>
        <div class="x3-col">
          <b>{{ f.T(['With JobWinner', 'Con JobWinner']) }}</b>
          <div class="x3-block">3X</div>
        </div>
      </div>
      <p>{{ f.T(['JobWinner makes it easy and keeps you accountable.', 'JobWinner te lo pone fácil y te mantiene constante.']) }}</p>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
</script>
