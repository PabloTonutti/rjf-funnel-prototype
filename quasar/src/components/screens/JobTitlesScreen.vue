<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="titles-box">
      <div class="input-wrap" style="margin-bottom:0;position:relative">
        <input
          type="text" v-model="draft"
          :placeholder="f.T(['Add up to 8 job titles', 'Añade hasta 8 puestos'])"
          :disabled="titles.length >= 8"
          @keydown.enter.prevent.stop="add"
          @keydown="onComma"
          @focus="openSug = true" @input="openSug = true"
        >
        <div v-if="openSug && draft.trim().length >= 2 && suggestions.length" class="sug-list">
          <button v-for="s in suggestions" :key="s" class="sug-row" @mousedown.prevent="pickSuggestion(s)">{{ s }}</button>
        </div>
      </div>
      <div class="chips" v-if="titles.length">
        <span v-for="(t, k) in titles" :key="t + k" class="chip-t">
          {{ t }}
          <button :aria-label="'remove ' + t" @click="remove(k)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
          </button>
        </span>
      </div>
      <div v-if="prefilled" class="ai-note">
        👌 {{ f.T([
          "We've filled this out based on your most recent role. Feel free to edit or add more job titles if you like!",
          'Lo hemos rellenado según tu puesto más reciente. Edita o añade más puestos si quieres.'
        ]) }}
      </div>
      <button class="skiplink" style="margin-top:18px" @click="showKey = !showKey">⚙️ {{ f.T(['AI settings', 'Ajustes de IA']) }}</button>
      <div v-if="showKey" style="max-width:460px;margin:10px auto 0;width:100%">
        <p class="footnote" style="text-align:left;margin:0 0 8px">{{ f.T(['Optional: paste an OpenAI API key to enable real AI suggestions from the uploaded resume. Stored only in this browser. In production this call moves to the backend.', 'Opcional: pega una API key de OpenAI para sugerencias reales de IA a partir del CV subido. Se guarda solo en este navegador. En producción esta llamada va al backend.']) }}</p>
        <div style="display:flex;gap:8px">
          <input type="password" v-model="keyDraft" placeholder="sk-..." style="flex:1;min-width:0">
          <button class="btn btn-secondary" style="width:auto;padding:12px 16px" @click="saveKey">{{ f.T(['Save', 'Guardar']) }}</button>
        </div>
      </div>
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" :disabled="!titles.length" @go="f.next()" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { TITLE_SUGGESTIONS } from 'src/data/screens'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Prefill once from the AI suggestions (or fallback), then the user owns the list
if (!f.answers.P19T) f.answers.P19T = [...f.aiTitles]
const titles = computed(() => f.answers.P19T)
const prefilled = ref(f.aiTitles.length > 0 && titles.value.length > 0)

const draft = ref('')
const showKey = ref(false)
const keyDraft = ref(f.openaiKey)
const openSug = ref(false)

// Autocomplete: suggest standard titles while the user types
const suggestions = computed(() => {
  const q = draft.value.trim().toLowerCase()
  if (q.length < 2) return []
  return TITLE_SUGGESTIONS
    .filter(t => t.toLowerCase().includes(q))
    .filter(t => !titles.value.some(x => x.toLowerCase() === t.toLowerCase()))
    .slice(0, 6)
})
function pickSuggestion (s) {
  if (titles.value.length >= 8) return
  titles.value.push(s)
  draft.value = ''
  openSug.value = false
}

function add () {
  const t = draft.value.trim().replace(/,$/, '')
  if (!t || titles.value.length >= 8) return
  if (!titles.value.some(x => x.toLowerCase() === t.toLowerCase())) titles.value.push(t)
  draft.value = ''
}
function onComma (e) { if (e.key === ',') { e.preventDefault(); add() } }
function remove (k) { titles.value.splice(k, 1) }
function saveKey () { f.setOpenAIKey(keyDraft.value); showKey.value = false }
</script>
