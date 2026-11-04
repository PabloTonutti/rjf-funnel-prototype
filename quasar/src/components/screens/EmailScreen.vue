<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1 class="h1-xl h1-balance">{{ f.T(screen.title) }}</h1>
    <div class="illo illo-after-title" v-html="ILLO.mailmedal" />
    <div class="input-wrap" style="max-width:420px;margin:0 auto;width:100%;text-align:left">
      <label class="sal-label" for="pemail">Email</label>
      <input
        id="pemail" type="email" v-model="email" placeholder="you@email.com" autocomplete="email"
        @keydown.enter.prevent="go"
      >
    </div>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" :disabled="!valid" @go="go">
    <p class="legal-note">
      {{ f.T(['No spam. By continuing, you agree to our', 'Sin spam. Al continuar, aceptas nuestros']) }}
      <a :href="f.T(['https://jobwinner.ai/terms-of-service/', 'https://jobwinner.ai/es/terminos-de-uso/'])" target="_blank" rel="noopener">{{ f.T(['Terms of Service', 'Términos de uso']) }}</a>
      {{ f.T(['and', 'y la']) }}
      <a :href="f.T(['https://jobwinner.ai/privacy-policy/', 'https://jobwinner.ai/es/politica-de-privacidad/'])" target="_blank" rel="noopener">{{ f.T(['Privacy Policy', 'Política de privacidad']) }}</a>.
    </p>
  </FootContinue>
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
