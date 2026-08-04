<template>
  <div class="wrap"><div class="screen">
    <div class="illo" style="margin-top:6px" v-html="ILLO.shield" />
    <h1 style="text-align:center">{{ f.T(['Almost done — set up your account', 'Ya casi está: configura tu cuenta']) }}</h1>
    <p class="subtitle" style="text-align:center">{{ f.T(["We'll keep your data safe, no spam.", 'Mantendremos tus datos seguros, sin spam.']) }}</p>
    <div class="input-wrap" style="max-width:440px;margin-left:auto;margin-right:auto;width:100%">
      <input type="email" v-model="email" placeholder="you@email.com">
    </div>
    <p class="footnote">{{ f.T(['Prototype mock: nothing is sent or stored.', 'Maqueta de prototipo: no se envía ni se guarda nada.']) }}</p>
  </div></div>
  <FootContinue :label="f.T(['CREATE ACCOUNT', 'Crear cuenta'])" :disabled="!ok" @go="go" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const email = ref(f.answers.P50 || '')
const ok = computed(() => /.+@.+\..+/.test(email.value))
function go () { if (ok.value) { f.answers.P50 = email.value; f.next() } }
</script>
