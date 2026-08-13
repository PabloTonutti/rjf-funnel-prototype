<template>
  <div class="wrap"><div class="screen">
    <div class="illo" style="margin-top:6px" v-html="ILLO.shield" />
    <h1 style="text-align:center">{{ f.T(['Almost done — set up your account', 'Ya casi está: configura tu cuenta']) }}</h1>
    <p class="subtitle" style="text-align:center">{{ f.T(["We'll keep your data safe, no spam.", 'Mantendremos tus datos seguros, sin spam.']) }}</p>

    <div class="auth-box">
      <!-- Option 1: Google -->
      <button class="btn btn-google" @click="withGoogle">
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 40.2 44 35 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
        {{ f.T(['Access with Google', 'Acceder con Google']) }}
      </button>

      <div class="or-divider"><i></i><span>{{ f.T(['or', 'o']) }}</span><i></i></div>

      <!-- Option 2: email registration -->
      <button v-if="mode !== 'email'" class="btn btn-secondary" @click="mode = 'email'">
        {{ f.T(['REGISTER WITH EMAIL', 'Registrarme con email']) }}
      </button>

      <div v-else class="auth-fields">
        <div class="input-wrap"><input type="text" v-model="name" :placeholder="f.T(['Name', 'Nombre'])" autocomplete="name"></div>
        <div class="input-wrap"><input type="email" v-model="email" placeholder="you@email.com" autocomplete="email"></div>
        <div class="input-wrap"><input type="password" v-model="password" :placeholder="f.T(['Password (6+ characters)', 'Contraseña (6+ caracteres)'])" autocomplete="new-password"></div>
      </div>
    </div>

    <p class="footnote">{{ f.T(['Prototype mock: nothing is sent or stored.', 'Maqueta de prototipo: no se envía ni se guarda nada.']) }}</p>
  </div></div>
  <FootContinue
    v-if="mode === 'email'"
    :label="f.T(['CREATE ACCOUNT', 'Crear cuenta'])"
    :disabled="!valid"
    @go="withEmail"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ILLO } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const mode = ref('choice')
const name = ref('')
const email = ref(f.answers.PEMAIL || '') // prefilado con el email capturado antes del plan
const password = ref('')

const valid = computed(() =>
  name.value.trim().length >= 2 &&
  /.+@.+\..+/.test(email.value) &&
  password.value.length >= 6
)

// Both paths are mocks — no real auth in the prototype
function withGoogle () {
  f.answers.P50 = { method: 'google' }
  f.next()
}
function withEmail () {
  if (!valid.value) return
  f.answers.P50 = { method: 'email', name: name.value.trim(), email: email.value.trim() }
  f.next()
}
</script>
