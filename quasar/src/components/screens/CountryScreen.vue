<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="csel" :class="{ open }" ref="rootEl">
      <div class="csel-box">
        <span class="cflag">{{ f.answers.P11 ? flagOf(f.answers.P11) : '🌍' }}</span>
        <input
          type="text" :placeholder="$t('searchCountry')" v-model="q" autocomplete="off"
          @focus="onFocus" @input="open = true" @keydown.enter="pickFirst"
        >
        <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="csel-list">
        <button
          v-for="c in rows" :key="c[0]"
          class="crow" :class="{ active: c[0] === f.answers.P11 }"
          @click="pick(c[0])"
        ><span class="cf">{{ c[1] }}</span>{{ c[0] }}</button>
        <div v-if="!rows.length" class="csel-empty">{{ $t('noMatches') }}</div>
      </div>
    </div>
    <p class="microcopy" style="justify-content:center"><span v-html="ic('mappin')" style="display:contents" /> {{ f.T(screen.micro) }}</p>
  </div></div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { CDATA, flagOf } from 'src/data/screens'
import { ic } from 'assets/graphics'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const q = ref(f.answers.P11 || '')
const open = ref(false)
const rootEl = ref(null)
const advancing = ref(false)

const strip = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const rows = computed(() => {
  const query = q.value === f.answers.P11 ? '' : q.value
  return CDATA.filter(c => !query || strip(c[0]).includes(strip(query)))
})

function onFocus () { open.value = true }
function pick (name) {
  if (advancing.value) return
  advancing.value = true
  f.answers.P11 = name
  q.value = name
  open.value = false
  setTimeout(() => f.next(), 250)
}
function pickFirst () { if (rows.value.length) pick(rows.value[0][0]) }

function onDocClick (e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) open.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>
