<template>
  <div class="wrap"><div class="screen">
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
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
