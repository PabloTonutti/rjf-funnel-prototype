<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <div class="illo" v-html="ILLO.mailflow || ILLO.target" />
    <h1>{{ f.T(screen.title) }}</h1>
    <p class="subtitle" style="margin-bottom:18px">{{ f.T(screen.sub) }}</p>
    <div class="input-wrap" style="max-width:420px;margin:0 auto;width:100%">
      <input
        type="email" v-model="email" placeholder="you@email.com" autocomplete="email"
        @keydown.enter.prevent="go"
      >
    </div>
    <p class="footnote" style="margin-top:14px">{{ f.T(['No spam — just your plan and your job matches.', 'Nada de spam: solo tu plan y tus empleos compatibles.']) }}</p>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" :disabled="!valid" @go="go" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const email = ref(f.answers.PEMAIL || '')
const valid = computed(() => /.+@.+\..+/.test(email.value.trim()))
function go () {
  if (!valid.value) return
  f.answers.PEMAIL = email.value.trim()
  f.next()
}
</script>
