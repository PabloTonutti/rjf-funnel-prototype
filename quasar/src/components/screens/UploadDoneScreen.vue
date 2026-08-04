<template>
  <div class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start;padding-top:18px">
    <h1>{{ li ? f.T(['Your LinkedIn profile has been added', 'Tu perfil de LinkedIn ha sido añadido']) : f.T(['Your resume has been uploaded', 'Tu currículum ha sido subido']) }}</h1>
    <p class="subtitle">
      <b style="color:var(--jw-ink)">{{ f.T(['Your job matches will now be much more accurate.', 'Tus coincidencias de empleo serán ahora mucho más precisas.']) }}</b>
    </p>
    <div class="file-card">
      <span class="fic" v-html="duo(li ? 'liD' : 'doccheck')" />
      <div>
        <b>{{ u.name || '' }}</b>
        <span>{{ f.T(['Date added:', 'Fecha de añadido:']) }} {{ dateStr }}{{ li ? ' · ' + f.T(['import simulated in this prototype', 'importación simulada en este prototipo']) : '' }}</span>
      </div>
    </div>
    <div class="done-list">
      <div v-for="(r, k) in rows" :key="k" class="done-row" :class="{ show: shown > k }">
        {{ f.T(r) }}<span class="gk" v-html="ic('check')" />
      </div>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { duo, ic } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const u = computed(() => f.upload || {})
const li = computed(() => u.value.kind === 'linkedin')
const rows = [['Experience', 'Experiencia'], ['Skills', 'Habilidades'], ['Education', 'Educación']]
const shown = ref(0)

const dateStr = computed(() => {
  const d = new Date()
  return f.lang === 'en'
    ? `${d.getDate()} ${d.toLocaleString('en-GB', { month: 'long' })} ${d.getFullYear()}`
    : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
})

let timers = []
onMounted(() => {
  rows.forEach((_, k) => timers.push(setTimeout(() => { shown.value = k + 1 }, 350 + k * 350)))
})
onUnmounted(() => timers.forEach(clearTimeout))
</script>
