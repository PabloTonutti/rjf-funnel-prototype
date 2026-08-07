<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="titles-box">
      <div class="input-wrap" style="margin-bottom:0;position:relative">
        <input
          type="text" v-model="draft"
          :placeholder="f.T(['Add an industry or category', 'Añade una industria o categoría'])"
          @keydown.enter.prevent.stop="addDraft"
          @focus="openSug = true" @input="openSug = true"
        >
        <button class="add-inline" :disabled="!draft.trim()" @click="addDraft">
          ＋ {{ f.T(['Add', 'Añadir']) }}
        </button>
        <div v-if="openSug && suggestions.length" class="sug-list">
          <button v-for="s in suggestions" :key="s[0]" class="sug-row" @mousedown.prevent="addCat(s)">{{ f.T(s) }}</button>
        </div>
      </div>
      <div class="chips" v-if="picked.length">
        <span v-for="(c, k) in picked" :key="c.t[0] + k" class="chip-t">
          {{ f.T(c.t) }}
          <button :aria-label="'remove'" @click="remove(k)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
          </button>
        </span>
      </div>
      <div v-if="prefilled" class="ai-note">
        👌 {{ f.T(['Suggested from your job titles — edit as you like, or add your own industries.', 'Sugeridas según tus puestos. Edítalas o añade tus propias industrias.']) }}
      </div>
      <button class="btn btn-secondary" style="margin-top:18px" @click="selectAll">{{ f.T(['SELECT ALL INDUSTRIES', 'Seleccionar todas las industrias']) }}</button>
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" :disabled="!picked.length" @go="f.next()" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { CATEGORIES } from 'src/data/screens'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Map chosen job titles to likely categories for the prefill
const KEYS = [
  [/engineer|developer|devops|software|architect|qa|python|java|mobile|web dev/i, 'IT & Software'],
  [/support|customer/i, 'Customer Service'],
  [/market|seo|social media|paid media|growth|brand/i, 'Marketing & PR'],
  [/design/i, 'Design (Graphic, UX, Product)'],
  [/data|analyst|analytics|scientist|machine learning|bi /i, 'Data & Analytics'],
  [/sales|account exec|account manager|partnership|business development/i, 'Sales & Partnerships'],
  [/writer|copy|content|editor|translator/i, 'Content, Writing & Media'],
  [/recruit|talent|hr /i, 'HR & Recruitment'],
  [/finance|financial|account(ant|ing)|payroll/i, 'Finance'],
  [/legal|contract|paralegal/i, 'Legal'],
  [/product manager|project|scrum|operations|coordinator|assistant|office/i, 'Admin & Operations'],
  [/teacher|tutor|instruct|education/i, 'Education & Training'],
  [/research/i, 'Research'],
  [/medical|health|nurse|telehealth/i, 'Healthcare']
]
// Preselect the categories that apply the MOST to the resume-derived titles (max 3)
function inferCategories () {
  const titles = f.answers.P19T || []
  const found = []
  for (const t of titles) {
    for (const [re, cat] of KEYS) {
      if (re.test(t) && !found.includes(cat)) found.push(cat)
    }
  }
  return found.slice(0, 3).map(name => ({ t: CATEGORIES.find(c => c[0] === name) })).filter(x => x.t)
}

if (!f.answers.P13) f.answers.P13 = inferCategories()
const picked = computed(() => f.answers.P13)
const prefilled = ref(picked.value.length > 0)

const draft = ref('')
const openSug = ref(false)
// Main dropdown = the 15 real categories ("open to any role" is covered by Select all)
const MAIN_CATEGORIES = CATEGORIES.filter(c => c[0] !== "I'm open to any role")
const suggestions = computed(() => {
  const q = draft.value.trim().toLowerCase()
  return MAIN_CATEGORIES
    .filter(c => !picked.value.some(p => p.t[0] === c[0]))
    .filter(c => !q || c[0].toLowerCase().includes(q) || c[1].toLowerCase().includes(q))
    .slice(0, q ? 6 : 15)
})

function addCat (c) {
  if (!picked.value.some(p => p.t[0] === c[0])) picked.value.push({ t: c })
  draft.value = ''; openSug.value = false
}
function addDraft () {
  const q = draft.value.trim()
  if (!q) return
  if (suggestions.value.length) { addCat(suggestions.value[0]); return }
  // free-text industry entered by the user
  picked.value.push({ t: [q, q] })
  draft.value = ''; openSug.value = false
}
function remove (k) { picked.value.splice(k, 1) }
function selectAll () {
  f.answers.P13 = CATEGORIES.filter(c => c[0] !== "I'm open to any role").map(c => ({ t: c }))
}
</script>
