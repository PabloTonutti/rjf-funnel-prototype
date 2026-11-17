<template>
  <div class="wrap"><div class="screen">
    <!-- v2 (paso HOW WE HELP nuevo): la pregunta pasa a ser el título y la cita va en una tarjeta con comillas grandes -->
    <div v-if="screen.v2" class="rel2">
      <h1 class="qtitle">{{ $t('relateQ') }}</h1>
      <div class="rel2-card">
        <span class="rel2-q" aria-hidden="true">&ldquo;</span>
        <p>{{ f.T(screen.quote) }}</p>
      </div>
    </div>
    <div v-else style="flex:1;display:flex;flex-direction:column;justify-content:center">
      <div class="relate-label">{{ $t('relateQ') }}</div>
      <div class="quote-card">
        <div class="qico" v-html="ic('messagecircle')" />
        <p>&ldquo;{{ f.T(screen.quote) }}&rdquo;</p>
      </div>
    </div>
  </div></div>
  <Teleport to="#foot">
    <div class="finner relate-foot"><div class="btn-row" style="width:100%">
      <button class="btn btn-secondary" @click="answer('No')">{{ $t('no') }}</button>
      <button class="btn btn-primary" @click="answer('Yes')">{{ $t('yes') }}</button>
    </div></div>
  </Teleport>
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import { ic } from 'assets/graphics'

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
function answer (v) { f.answers[props.screen.id] = v; f.next() }
</script>
