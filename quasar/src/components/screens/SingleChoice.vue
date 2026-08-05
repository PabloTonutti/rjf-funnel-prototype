<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ title.t }}</h1>
    <p v-if="title.sub" class="subtitle qsub">{{ title.sub }}</p>
    <div class="options">
      <button
        v-for="(o, k) in screen.opts" :key="k"
        class="opt radio" :class="{ sel: f.answers[screen.id] === o }"
        @click="pick(o)"
      >
        <span v-if="screen.icons !== false && o.i" class="duo" v-html="duo(o.i)" />
        <span class="lbl">{{ f.T(o.t) }}<small v-if="o.sub" class="opt-sub">{{ f.T(o.sub) }}</small></span>
        <span class="mark" v-html="ic('check')" />
      </button>
    </div>
    <button v-if="title.optional" class="skiplink" @click="skip">{{ $t('preferNot') }}</button>
  </div></div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { EU } from 'src/data/screens'
import { ic, duo } from 'assets/graphics'

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const advancing = ref(false)

// Dynamic work-authorization title adapts to the country picked in P11
const title = computed(() => {
  const s = props.screen
  if (s.dynamic === 'workAuth') {
    const c = f.answers.P11 || ''
    if (c === 'United States') {
      return { t: f.T(['Are you authorized to work in the US?', '¿Estás autorizado para trabajar en EE. UU.?']), sub: '', optional: false }
    }
    if (EU.includes(c)) {
      return { t: f.T(['Do you have a work permit in the EU?', '¿Tienes permiso de trabajo en la UE?']), sub: '', optional: false }
    }
    return {
      t: f.T([`Do you have a work permit in ${c || 'your target country'}?`, `¿Tienes permiso de trabajo en ${c || 'tu país de destino'}?`]),
      sub: f.T(['Optional — you can skip this one.', 'Pregunta opcional: puedes saltarla si lo prefieres.']),
      optional: true
    }
  }
  return { t: f.T(s.title), sub: s.sub ? f.T(s.sub) : '', optional: false }
})

// Single choice: selecting auto-advances (no Continue button)
function pick (o) {
  if (advancing.value) return
  advancing.value = true
  f.answers[props.screen.id] = o
  setTimeout(() => f.next(), 280)
}
function skip () {
  if (advancing.value) return
  advancing.value = true
  f.answers[props.screen.id] = null
  f.next()
}
</script>
