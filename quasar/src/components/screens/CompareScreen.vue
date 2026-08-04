<template>
  <div class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start;padding-top:6px">
    <h1>{{ f.T(screen.title) }}</h1>
    <div class="compare">
      <div class="col">
        <h4>{{ f.T(['Traditional search', 'Búsqueda tradicional']) }}</h4>
        <div v-for="(p, i) in trad" :key="i" class="bar-row">
          <span class="pct">{{ p }}% match</span>
          <div class="bar"><i :style="{ width: p + '%' }" /></div>
        </div>
      </div>
      <div class="col jw">
        <h4>JobWinner</h4>
        <div v-for="(p, i) in jw" :key="i" class="bar-row">
          <span class="pct">{{ p }}% match</span>
          <div class="bar"><i :style="{ width: p + '%' }" /></div>
        </div>
      </div>
    </div>
    <p class="subtitle" style="margin-bottom:0">{{ f.T(screen.body) }}</p>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const trad = [62, 83, 30, 71, 27]
const jw = [100, 98, 100, 97, 100]
</script>
