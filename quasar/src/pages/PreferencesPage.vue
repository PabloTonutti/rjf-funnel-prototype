<template>
  <div id="shell">
    <header class="pref-hdr">
      <button class="pref-back" aria-label="Back" @click="$router.push('/')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <h1>{{ T(['Your preferences', 'Tus preferencias']) }}</h1>
      <button id="langBtn" @click="f.toggleLang()">
        <template v-if="f.lang === 'en'"><b>EN</b> · ES</template>
        <template v-else>EN · <b>ES</b></template>
      </button>
    </header>

    <main class="pref-main">
      <p class="subtitle" style="margin:4px 0 6px">{{ T(['Everything you told us in the funnel. Edit whatever you like — changes are saved automatically.', 'Todo lo que nos contaste en el funnel. Edita lo que quieras: los cambios se guardan solos.']) }}</p>

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
        <div class="pref-addrow" v-if="(a.P19T || []).length < 8">
          <input v-model="titleDraft" :placeholder="T(['Add a job title…', 'Añade un puesto…'])" @keydown.enter.prevent="addTitle">
          <button class="pref-add" :disabled="!titleDraft.trim()" @click="addTitle">＋ {{ T(['Add', 'Añadir']) }}</button>
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

      <!-- ============ LOCATION ============ -->
      <h2 class="pref-group">{{ T(['Location', 'Ubicación']) }}</h2>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P11 }" v-html="CK" /> <b>8. {{ T(['Country', 'País']) }}</b></div>
        <select class="pref-select" :value="a.P11 || ''" @change="a.P11 = $event.target.value">
          <option value="" disabled>{{ T(['Choose a country…', 'Elige un país…']) }}</option>
          <option v-for="c in COUNTRIES" :key="c" :value="c">{{ flagOf(c) }} {{ c }}</option>
        </select>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.PCITY }" v-html="CK" /> <b>9. {{ T(['City / region', 'Ciudad / región']) }}</b></div>
        <div class="pref-addrow">
          <input v-model="a.PCITY" :placeholder="T(['Your city (optional — anywhere works)', 'Tu ciudad (opcional: cualquier lugar vale)'])">
        </div>
      </section>

      <!-- ============ YOUR SITUATION ============ -->
      <h2 class="pref-group">{{ T(['Your situation', 'Tu situación']) }}</h2>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P1 }" v-html="CK" /> <b>10. {{ T(['Work status', 'Situación laboral']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P1')" :key="o.t[0]" class="ppill" :class="{ on: same(a.P1, o) }" @click="a.P1 = o">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P2 }" v-html="CK" /> <b>11. {{ T(['Search approach', 'Enfoque de búsqueda']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P2')" :key="o.t[0]" class="ppill" :class="{ on: same(a.P2, o) }" @click="a.P2 = o">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P3 }" v-html="CK" /> <b>12. {{ T(['How long have you been job hunting?', '¿Cuánto llevas buscando?']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P3')" :key="o.t[0]" class="ppill" :class="{ on: same(a.P3, o) }" @click="a.P3 = o">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P18 }" v-html="CK" /> <b>13. {{ T(['Resume status', 'Estado de tu CV']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P18')" :key="o.t[0]" class="ppill" :class="{ on: same(a.P18, o) }" @click="a.P18 = o">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P6 }" v-html="CK" /> <b>14. {{ T(['Have you tried AI tools for your search?', '¿Has probado herramientas de IA?']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('P6')" :key="o.t[0]" class="ppill" :class="{ on: same(a.P6, o) }" @click="a.P6 = o">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.PH1 }" v-html="CK" /> <b>15. {{ T(['Where can JobWinner help you most?', '¿Dónde te ayudamos más?']) }}</b></div>
        <div class="pref-pills">
          <button v-for="o in optsOf('PH1')" :key="o.t[0]" class="ppill" :class="{ on: same(a.PH1, o) }" @click="a.PH1 = o">{{ T(o.t) }}</button>
        </div>
      </section>

      <section class="pref-sec">
        <div class="pref-title"><span class="pcheck" :class="{ on: !!a.P48a || !!a.P48b }" v-html="CK" /> <b>16. {{ T(['Quick details', 'Detalles rápidos']) }}</b></div>
        <p class="pref-sub">{{ T(['Open to learning new skills if the role requires it?', '¿Abierto a aprender nuevas habilidades si el rol lo requiere?']) }}</p>
        <div class="pref-pills" style="margin-bottom:10px">
          <button v-for="v in ['Yes', 'No']" :key="'a' + v" class="ppill" :class="{ on: a.P48a === v }" @click="a.P48a = v">{{ v === 'Yes' ? T(['Yes', 'Sí']) : 'No' }}</button>
        </div>
        <p class="pref-sub">{{ T(['Do you have a laptop to work remotely?', '¿Tienes portátil para trabajar en remoto?']) }}</p>
        <div class="pref-pills">
          <button v-for="v in ['Yes', 'No']" :key="'b' + v" class="ppill" :class="{ on: a.P48b === v }" @click="a.P48b = v">{{ v === 'Yes' ? T(['Yes', 'Sí']) : 'No' }}</button>
        </div>
      </section>

      <!-- ============ ACCOUNT ============ -->
      <h2 class="pref-group">{{ T(['Account', 'Cuenta']) }}</h2>

      <section class="pref-sec" style="border-bottom:none">
        <div class="pref-title"><span class="pcheck" :class="{ on: emailOk }" v-html="CK" /> <b>17. Email</b></div>
        <p class="pref-sub">{{ T(['Where we send your plan and your job matches', 'Donde te enviamos tu plan y tus matches']) }}</p>
        <div class="pref-addrow">
          <input type="email" v-model="a.PEMAIL" placeholder="you@email.com">
        </div>
      </section>

      <button class="btn btn-primary" style="margin:8px 0 26px" @click="$router.push('/')">{{ T(['BACK TO MY PLAN', 'Volver a mi plan']) }}</button>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useFunnel } from 'stores/funnel'
import { SCREENS, CATEGORIES, COUNTRIES, flagOf } from 'src/data/screens'

const f = useFunnel()
const T = pair => f.T(pair)

// Si se entra directo a /preferences sin estado en memoria, cargar el snapshot guardado
if (!Object.keys(f.answers).length) f.restorePlan()
const a = f.answers

// Auto-guardado: cualquier edición re-persiste el snapshot (mismo almacenamiento que el plan)
let saveT = null
watch(() => JSON.stringify(a), () => { clearTimeout(saveT); saveT = setTimeout(() => f.persistPlan(), 400) })

const CK = '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const optsOf = id => (SCREENS.find(s => s.id === id) || {}).opts || []
const same = (sel, o) => !!sel && sel.t && sel.t[0] === o.t[0]

// Multi (P7, P9): array de opciones
function hasMulti (id, o) { return (a[id] || []).some(x => x.t[0] === o.t[0]) }
function toggleMulti (id, o) {
  if (!a[id]) a[id] = []
  const i = a[id].findIndex(x => x.t[0] === o.t[0])
  if (i >= 0) a[id].splice(i, 1); else a[id].push(o)
}

// Industrias (P13): {t: pair}
const hasCat = c => (a.P13 || []).some(x => x.t && x.t[0] === c[0])
function toggleCat (c) {
  if (!a.P13) a.P13 = []
  const i = a.P13.findIndex(x => x.t && x.t[0] === c[0])
  if (i >= 0) a.P13.splice(i, 1); else a.P13.push({ t: c })
}

// Puestos objetivo
const titleDraft = ref('')
function addTitle () {
  const t = titleDraft.value.trim()
  if (!t || (a.P19T || []).length >= 8) return
  if (!a.P19T) a.P19T = []
  if (!a.P19T.includes(t)) a.P19T.push(t)
  titleDraft.value = ''
}

// Salario
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

// Ritmo (PSPEED)
function speedLabel (m) {
  if (m >= 6) return f.lang === 'en' ? '6+ months' : '6+ meses'
  if (m === 1) return f.lang === 'en' ? '1 month' : '1 mes'
  return f.lang === 'en' ? `${m} months` : `${m} meses`
}
function setSpeed (m) {
  a.PSPEED = { months: m, t: [speedLabel(m), speedLabel(m)] }
}

const emailOk = computed(() => /.+@.+\..+/.test(a.PEMAIL || ''))
</script>
