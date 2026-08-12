<template>
  <div id="shell">
    <header id="hdr">
      <div class="hdr-row">
        <button id="backBtn" :class="{ ghost: hideBack }" aria-label="Back" @click="f.back()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div class="logo-wrap"><img :src="logo" alt="JobWinner"></div>
        <button id="langBtn" @click="f.toggleLang()">
          <template v-if="f.lang === 'en'"><b>EN</b> · ES</template>
          <template v-else>EN · <b>ES</b></template>
        </button>
      </div>
      <div id="progWrap" v-show="showProg">
        <div id="progress">
          <div v-for="(w, p) in segWidths" :key="p" class="seg"><i :style="{ width: w + '%' }" /></div>
        </div>
        <div id="phaseLabel">{{ phaseLabel }}</div>
      </div>
    </header>
    <main id="main" :class="{ pwmode: f.screen.type === 'paywall' }"><router-view /></main>
    <footer id="foot"></footer>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useFunnel } from 'stores/funnel'
import { SCREENS, PHASES } from 'src/data/screens'
import logo from 'assets/jobwinner-logo.png'

const f = useFunnel()

// Enter advances when a Continue button is enabled (same as the prototype)
function onKey (e) {
  if (e.key !== 'Enter') return
  const b = document.getElementById('cont')
  if (b && !b.disabled && document.activeElement.tagName !== 'BUTTON') b.click()
}
function onPop (e) {
  f.browserJump(e.state && typeof e.state.funnelI === 'number' ? e.state.funnelI : 0)
}
onMounted(() => {
  document.addEventListener('keydown', onKey)
  try { window.history.replaceState({ funnelI: f.currentI }, '') } catch (e) {}
  window.addEventListener('popstate', onPop)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('popstate', onPop)
})

const hidden = computed(() => ['loader', 'success'].includes(f.screen.type))
const showProg = computed(() => !hidden.value && f.screen.type !== 'paywall')
const hideBack = computed(() => f.currentI === 0 || hidden.value || f.screen.type === 'paywall')
const phaseLabel = computed(() => PHASES[f.screen.phase])

// El contador "Step X of Y" se oculta a propósito: el usuario no debe ver los pasos.
const segWidths = computed(() => {
  const s = f.screen
  const inPhase = SCREENS.filter(x => x.phase === s.phase)
  const pos = inPhase.findIndex(x => x.id === s.id)
  return PHASES.map((_, p) => {
    if (p < s.phase) return 100
    if (p === s.phase) return Math.round(((pos + 1) / inPhase.length) * 100)
    return 0
  })
})
</script>
