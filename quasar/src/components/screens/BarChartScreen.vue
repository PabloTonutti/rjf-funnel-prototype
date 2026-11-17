<template>
  <!-- Gráfico de 2 barras (paso HOW WE HELP nuevo): «manual» frente a JobWinner; la barra de JobWinner crece al entrar -->
  <div class="wrap"><div class="screen"><div class="inter bc">
    <h1>{{ f.T(screen.title) }}</h1>
    <div class="bc-chart">
      <span class="bc-axis">↑ {{ f.T(['Applications', 'Candidaturas']) }}</span>
      <div class="bc-grid"><i v-for="k in 7" :key="k" /></div>
      <div class="bc-bars">
        <div class="bc-col"><div class="bc-bar low" /><span class="bc-lbl">{{ f.T(['Applying manually', 'Aplicar a mano']) }}</span></div>
        <div class="bc-col"><div class="bc-bar high" :class="{ grow }"><b>{{ screen.mult }}</b><small>{{ f.T(['more applications', 'más candidaturas']) }}</small></div><span class="bc-lbl">JobWinner</span></div>
      </div>
    </div>
    <p v-if="screen.body" class="subtitle bc-note">{{ f.T(screen.body) }}</p>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'CONTINUAR'])" @go="f.next()" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const grow = ref(false)
onMounted(() => setTimeout(() => { grow.value = true }, 250))
</script>
