<template>
  <div class="prefs-page">
    <div class="prefs-inner">
      <div class="prefs-head">
        <div>
          <h1>{{ T(['Your preferences', 'Tus preferencias']) }}</h1>
          <p class="prefs-intro">{{ T(['Manage your job search preferences. Edit whatever you like — changes are saved automatically.', 'Gestiona tus preferencias de búsqueda de empleo. Edita lo que quieras: los cambios se guardan solos.']) }}</p>
        </div>
        <button id="langBtn" @click="f.toggleLang()">
          <template v-if="f.lang === 'en'"><b>EN</b> · ES</template>
          <template v-else>EN · <b>ES</b></template>
        </button>
      </div>

      <!-- ============ TARGET ROLE ============ -->
      <h2 class="pref-group">{{ T(['Target role', 'Puesto objetivo']) }}</h2>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: (a.P19T || []).length }" v-html="CK" /> <b>1. {{ T(['Target job titles', 'Puestos objetivo']) }}</b></div>
        <p class="pref-sub">{{ T(['Up to 8 titles we use to match you with jobs', 'Hasta 8 puestos que usamos para encontrar tus matches']) }}</p>
        <div class="pref-chips">
          <span v-for="(t, k) in (a.P19T || [])" :key="t + k" class="pref-chip">
            {{ t }} <button @click="a.P19T.splice(k, 1)" aria-label="remove">✕</button>
          </span>
        </div>
        <div class="pref-addrow" style="position:relative" v-if="(a.P19T || []).length < 8">
          <input v-model="titleDraft" :placeholder="T(['Add a job title…', 'Añade un puesto…'])"
            @keydown.enter.prevent="addTitle(titleDraft)" @focus="titleOpen = true" @input="titleOpen = true" @blur="closeSoon('title')">
          <button class="pref-add" :disabled="!titleDraft.trim()" @click="addTitle(titleDraft)">＋ {{ T(['Add', 'Añadir']) }}</button>
          <div v-if="titleOpen && titleSugs.length" class="sug-list">
            <button v-for="s in titleSugs" :key="s" class="sug-row" @mousedown.prevent="addTitle(s)">{{ s }}</button>
          </div>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P16 }" v-html="CK" /> <b>2. {{ T(['Career level', 'Nivel profesional']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P16')" :key="o.t[0]" class="ppill" :class="{ on: same(a.P16, o) }" @click="a.P16 = o">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: (a.P13 || []).length }" v-html="CK" /> <b>3. {{ T(['Industries', 'Industrias']) }}</b></div>
        <p class="pref-sub">{{ T(['Pick the industries you want us to prioritize', 'Elige las industrias que quieres que prioricemos']) }}</p>
        <div class="pref-pills">
          <button v-for="c in CATEGORIES.slice(1)" :key="c[0]" class="ppill" :class="{ on: hasCat(c) }" @click="toggleCat(c)">{{ T(c) }}</button>
        </div>
      </section>

      <!-- ============ JOB PREFERENCES ============ -->
      <h2 class="pref-group">{{ T(['Job preferences', 'Preferencias de empleo']) }}</h2>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: (a.P7 || []).length }" v-html="CK" /> <b>4. {{ T(['Type of work', 'Tipo de trabajo']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P7')" :key="o.t[0]" class="ppill" :class="{ on: hasMulti('P7', o) }" @click="toggleMulti('P7', o)">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: (a.P9 || []).length }" v-html="CK" /> <b>5. {{ T(['Work mode', 'Modalidad']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P9')" :key="o.t[0]" class="ppill" :class="{ on: hasMulti('P9', o) }" @click="toggleMulti('P9', o)">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P8 }" v-html="CK" /> <b>6. {{ T(['Minimum salary', 'Salario mínimo']) }}</b></div>
        <div class="pref-pills" style="margin-bottom:10px">
          <button v-for="(p, k) in PERIODS" :key="k" class="ppill" :class="{ on: a.P8 && a.P8.period && a.P8.period[0] === p[0] }" @click="setSalaryPeriod(k)">{{ T(p) }}</button>
        </div>
        <div class="pref-addrow">
          <input type="number" min="0" :value="a.P8 ? String(a.P8.amount).replace(/[^0-9]/g, '') : ''" :placeholder="T(['Amount', 'Cantidad'])" @input="setSalaryAmount($event.target.value)">
          <span class="pref-unit">$</span>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.PSPEED }" v-html="CK" /> <b>7. {{ T(['How fast do you want a job?', '¿Cómo de rápido quieres el empleo?']) }}</b></div>
        <div class="pref-pills">
          <button v-for="m in [1, 3, 6]" :key="m" class="ppill" :class="{ on: a.PSPEED && a.PSPEED.months === m }" @click="setSpeed(m)">{{ speedLabel(m) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P11 }" v-html="CK" /> <b>8. {{ T(['Country', 'País']) }}</b></div>
        <select class="pref-select" :value="a.P11 || ''" @change="a.P11 = $event.target.value">
          <option value="" disabled>{{ T(['Choose a country…', 'Elige un país…']) }}</option>
          <option v-for="c in COUNTRIES" :key="c" :value="c">{{ flagOf(c) }} {{ c }}</option>
        </select>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.PCITY }" v-html="CK" /> <b>9. {{ T(['City / region', 'Ciudad / región']) }}</b></div>
        <div class="pref-addrow" style="position:relative">
          <input v-model="cityDraft" :placeholder="T(['Your city (optional — anywhere works)', 'Tu ciudad (opcional: cualquier lugar vale)'])"
            @input="onCityType" @focus="cityOpen = true" @blur="closeSoon('city')" @keydown.enter.prevent="pickCity(cityDraft)">
          <div v-if="cityOpen && citySugs.length" class="sug-list">
            <button v-for="s in citySugs" :key="s.name" class="sug-row" @mousedown.prevent="pickCity(s.name)">{{ s.name }}</button>
          </div>
        </div>
      </section>

      <!-- ============ COMPANY PREFERENCES ============ -->
      <h2 class="pref-group">{{ T(['Company preferences', 'Preferencias de empresa']) }}</h2>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: (a.PCOMPSIZE || []).length }" v-html="CK" /> <b>10. {{ T(['Preferred company size', 'Tamaño de empresa preferido']) }}</b></div>
        <p class="pref-sub">{{ T(['You will still see other companies in your recommendations, but these will be prioritized', 'Seguirás viendo otras empresas en tus recomendaciones, pero estas tendrán prioridad']) }}</p>
        <div class="pref-pills">
          <button v-for="s in COMPANY_SIZES" :key="s" class="ppill" :class="{ on: (a.PCOMPSIZE || []).includes(s) }" @click="toggleSize(s)">{{ s }}</button>
        </div>
      </section>

      <section class="pref-sec" style="border-bottom:none">
        <div class="pref-title"><span class="pcheck" :class="{ on: (a.PDREAM || []).length }" v-html="CK" /> <b>11. {{ T(['Dream companies', 'Empresas soñadas']) }}</b></div>
        <p class="pref-sub">{{ T(["Companies you'd love to work for — we'll prioritize their openings", 'Empresas en las que te encantaría trabajar: priorizaremos sus ofertas']) }}</p>
        <div class="pref-chips">
          <span v-for="(c, k) in (a.PDREAM || [])" :key="c + k" class="pref-chip">
            {{ c }} <button @click="a.PDREAM.splice(k, 1)" aria-label="remove">✕</button>
          </span>
        </div>
        <div class="pref-addrow">
          <input v-model="dreamDraft" :placeholder="T([`Enter companies you'd like to prioritize…`, 'Añade empresas que quieras priorizar…'])" @keydown.enter.prevent="addDream">
          <button class="pref-add" :disabled="!dreamDraft.trim()" @click="addDream">＋ {{ T(['Add', 'Añadir']) }}</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useFunnel } from 'stores/funnel'
import { SCREENS, CATEGORIES, COUNTRIES, flagOf, TITLE_SUGGESTIONS } from 'src/data/screens'
import { suggestCities } from 'src/utils/cities'

const f = useFunnel()
const T = pair => f.T(pair)

// Si se entra directo sin estado en memoria, cargar el snapshot guardado
if (!Object.keys(f.answers).length) f.restorePlan()
const a = f.answers

// Auto-guardado con debounce
let saveT = null
watch(() => JSON.stringify(a), () => { clearTimeout(saveT); saveT = setTimeout(() => f.persistPlan(), 400) })

const CK = '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const optsOf = id => (SCREENS.find(s => s.id === id) || {}).opts || []
const same = (sel, o) => !!sel && sel.t && sel.t[0] === o.t[0]

function hasMulti (id, o) { return (a[id] || []).some(x => x.t[0] === o.t[0]) }
function toggleMulti (id, o) {
  if (!a[id]) a[id] = []
  const i = a[id].findIndex(x => x.t[0] === o.t[0])
  if (i >= 0) a[id].splice(i, 1); else a[id].push(o)
}

const hasCat = c => (a.P13 || []).some(x => x.t && x.t[0] === c[0])
function toggleCat (c) {
  if (!a.P13) a.P13 = []
  const i = a.P13.findIndex(x => x.t && x.t[0] === c[0])
  if (i >= 0) a.P13.splice(i, 1); else a.P13.push({ t: c })
}

// --- Puestos objetivo con sugerencias (misma lista que el funnel) ---
const titleDraft = ref('')
const titleOpen = ref(false)
const titleSugs = computed(() => {
  const q = titleDraft.value.trim().toLowerCase()
  if (q.length < 2) return []
  return TITLE_SUGGESTIONS
    .filter(t => t.toLowerCase().includes(q))
    .filter(t => !(a.P19T || []).some(x => x.toLowerCase() === t.toLowerCase()))
    .slice(0, 6)
})
function addTitle (t) {
  t = (t || '').trim()
  if (!t || (a.P19T || []).length >= 8) return
  if (!a.P19T) a.P19T = []
  if (!a.P19T.includes(t)) a.P19T.push(t)
  titleDraft.value = ''
  titleOpen.value = false
}

// --- Ciudad con typeahead (misma lógica que el funnel: local + Photon por país) ---
const cityDraft = ref(a.PCITY || '')
const cityOpen = ref(false)
const citySugs = ref([])
let cityT = null
function onCityType () {
  cityOpen.value = true
  clearTimeout(cityT)
  const q = cityDraft.value.trim()
  if (!q) { citySugs.value = []; a.PCITY = ''; return }
  cityT = setTimeout(async () => {
    citySugs.value = await suggestCities(q, a.P11, f.lang)
  }, 160)
}
function pickCity (name) {
  if (!name || !name.trim()) return
  a.PCITY = name.trim()
  cityDraft.value = name.trim()
  cityOpen.value = false
  citySugs.value = []
}
function closeSoon (which) {
  setTimeout(() => { if (which === 'title') titleOpen.value = false; else cityOpen.value = false }, 180)
}

// --- Salario / ritmo ---
const PERIODS = [['Hourly', 'Por hora'], ['Monthly', 'Mensual'], ['Yearly', 'Anual']]
function setSalaryPeriod (k) {
  a.P8 = { amount: a.P8 ? a.P8.amount : '', period: PERIODS[k] }
  a.P8_period = k
  f.salaryPeriod = k
}
function setSalaryAmount (v) {
  const n = String(v).replace(/[^0-9]/g, '')
  a.P8 = { amount: n, period: (a.P8 && a.P8.period) || PERIODS[f.salaryPeriod || 1] }
}
function speedLabel (m) {
  if (m >= 6) return f.lang === 'en' ? '6+ months' : '6+ meses'
  if (m === 1) return f.lang === 'en' ? '1 month' : '1 mes'
  return f.lang === 'en' ? `${m} months` : `${m} meses`
}
function setSpeed (m) { a.PSPEED = { months: m, t: [speedLabel(m), speedLabel(m)] } }

// --- Preferencias de empresa ---
const COMPANY_SIZES = ['1 - 50', '51 - 200', '201 - 1,000', '1,001+']
function toggleSize (s) {
  if (!a.PCOMPSIZE) a.PCOMPSIZE = []
  const i = a.PCOMPSIZE.indexOf(s)
  if (i >= 0) a.PCOMPSIZE.splice(i, 1); else a.PCOMPSIZE.push(s)
}
const dreamDraft = ref('')
function addDream () {
  const c = dreamDraft.value.trim()
  if (!c) return
  if (!a.PDREAM) a.PDREAM = []
  if (!a.PDREAM.some(x => x.toLowerCase() === c.toLowerCase())) a.PDREAM.push(c)
  dreamDraft.value = ''
}
</script>
