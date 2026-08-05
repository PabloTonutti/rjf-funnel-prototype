<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ title }}</h1>
    <p class="subtitle qsub">{{ f.T(screen.sub) }}</p>
    <div class="input-wrap" style="max-width:460px;margin:6px auto 0;width:100%">
      <input type="text" v-model="city" :placeholder="f.T(['e.g. Dublin', 'p. ej. Dublín'])" @keydown.enter.stop.prevent="go">
    </div>
    <button class="skiplink" @click="skip">{{ f.T(['Skip — anywhere works', 'Saltar: cualquier lugar me vale']) }}</button>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" :disabled="!city.trim()" @go="go" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const city = ref(f.answers.PCITY || '')

const title = computed(() => {
  const c = f.answers.P11 || (f.lang === 'en' ? 'your country' : 'tu país')
  return f.lang === 'en' ? `Where exactly in ${c}?` : `¿En qué parte de ${c} exactamente?`
})
function go () { if (city.value.trim()) { f.answers.PCITY = city.value.trim(); f.next() } }
function skip () { f.answers.PCITY = ''; f.next() }
</script>
