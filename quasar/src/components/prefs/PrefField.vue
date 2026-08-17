<template>
  <div class="pf">
    <div v-if="showTitle" class="pref-title">
      <span class="pcheck" :class="{ on: p.filled(n) }" v-html="p.CK" />
      <b><template v-if="num">{{ n }}. </template>{{ p.T(meta.t) }}</b>
    </div>
    <p v-if="showTitle && meta.sub" class="pref-sub">{{ p.T(meta.sub) }}</p>

    <!-- 1 · Puestos objetivo (chips + typeahead) -->
    <template v-if="n === 1">
      <div class="pref-chips">
        <span v-for="(t, k) in (p.a.P19T || [])" :key="t + k" class="pref-chip">
          {{ t }} <button @click="p.a.P19T.splice(k, 1)" aria-label="remove">✕</button>
        </span>
      </div>
      <div class="pref-addrow" style="position:relative" v-if="(p.a.P19T || []).length < 8">
        <input v-model="p.titleDraft" :placeholder="p.T(['Add a job title…', 'Añade un puesto…'])"
          @keydown.enter.prevent="p.addTitle(p.titleDraft)" @focus="p.titleOpen = true" @input="p.titleOpen = true" @blur="p.closeSoon('title')">
        <button class="pref-add" :disabled="!p.titleDraft.trim()" @click="p.addTitle(p.titleDraft)">＋ {{ p.T(['Add', 'Añadir']) }}</button>
        <div v-if="p.titleOpen && p.titleSugs.length" class="sug-list">
          <button v-for="s in p.titleSugs" :key="s" class="sug-row" @mousedown.prevent="p.addTitle(s)">{{ s }}</button>
        </div>
      </div>
    </template>

    <!-- 2 · Nivel profesional -->
    <div v-else-if="n === 2" class="pref-pills">
      <button v-for="o in p.optsOf('P16')" :key="o.t[0]" class="ppill" :class="{ on: p.same(p.a.P16, o) }" @click="p.a.P16 = o">{{ p.T(o.t) }}</button>
    </div>

    <!-- 3 · Industrias -->
    <div v-else-if="n === 3" class="pref-pills">
      <button v-for="c in p.CATEGORIES.slice(1)" :key="c[0]" class="ppill" :class="{ on: p.hasCat(c) }" @click="p.toggleCat(c)">{{ p.T(c) }}</button>
    </div>

    <!-- 4 · Tipo de trabajo -->
    <div v-else-if="n === 4" class="pref-pills">
      <button v-for="o in p.optsOf('P7')" :key="o.t[0]" class="ppill" :class="{ on: p.hasMulti('P7', o) }" @click="p.toggleMulti('P7', o)">{{ p.T(o.t) }}</button>
    </div>

    <!-- 5 · Modalidad -->
    <div v-else-if="n === 5" class="pref-pills">
      <button v-for="o in p.optsOf('P9')" :key="o.t[0]" class="ppill" :class="{ on: p.hasMulti('P9', o) }" @click="p.toggleMulti('P9', o)">{{ p.T(o.t) }}</button>
    </div>

    <!-- 6 · Salario mínimo -->
    <template v-else-if="n === 6">
      <div class="pref-pills" style="margin-bottom:10px">
        <button v-for="(pd, k) in p.PERIODS" :key="k" class="ppill" :class="{ on: p.a.P8 && p.a.P8.period && p.a.P8.period[0] === pd[0] }" @click="p.setSalaryPeriod(k)">{{ p.T(pd) }}</button>
      </div>
      <div class="pref-addrow">
        <input type="number" min="0" :value="p.a.P8 ? String(p.a.P8.amount).replace(/[^0-9]/g, '') : ''" :placeholder="p.T(['Amount', 'Cantidad'])" @input="p.setSalaryAmount($event.target.value)">
        <span class="pref-unit">{{ p.sym }}</span>
      </div>
    </template>

    <!-- 7 · Ritmo -->
    <div v-else-if="n === 7" class="pref-pills">
      <button v-for="m in [1, 3, 6]" :key="m" class="ppill" :class="{ on: p.a.PSPEED && p.a.PSPEED.months === m }" @click="p.setSpeed(m)">{{ p.speedLabel(m) }}</button>
    </div>

    <!-- 8 · País -->
    <select v-else-if="n === 8" class="pref-select" :value="p.a.P11 || ''" @change="p.a.P11 = $event.target.value">
      <option value="" disabled>{{ p.T(['Choose a country…', 'Elige un país…']) }}</option>
      <option v-for="c in p.COUNTRIES" :key="c" :value="c">{{ p.flagOf(c) }} {{ c }}</option>
    </select>

    <!-- 9 · Ciudad (typeahead) -->
    <div v-else-if="n === 9" class="pref-addrow" style="position:relative">
      <input v-model="p.cityDraft" :placeholder="p.T(['Your city (optional — anywhere works)', 'Tu ciudad (opcional: cualquier lugar vale)'])"
        @input="p.onCityType" @focus="p.cityOpen = true" @blur="p.closeSoon('city')" @keydown.enter.prevent="p.pickCity(p.cityDraft)">
      <div v-if="p.cityOpen && p.citySugs.length" class="sug-list">
        <button v-for="s in p.citySugs" :key="s.name" class="sug-row" @mousedown.prevent="p.pickCity(s.name)">{{ s.name }}</button>
      </div>
    </div>

    <!-- 10 · Tamaño de empresa -->
    <div v-else-if="n === 10" class="pref-pills">
      <button v-for="s in p.COMPANY_SIZES" :key="s" class="ppill" :class="{ on: (p.a.PCOMPSIZE || []).includes(s) }" @click="p.toggleSize(s)">{{ s }}</button>
    </div>

    <!-- 11 · Empresas soñadas -->
    <template v-else-if="n === 11">
      <div class="pref-chips">
        <span v-for="(c, k) in (p.a.PDREAM || [])" :key="c + k" class="pref-chip">
          {{ c }} <button @click="p.a.PDREAM.splice(k, 1)" aria-label="remove">✕</button>
        </span>
      </div>
      <div class="pref-addrow">
        <input v-model="p.dreamDraft" :placeholder="p.T([`Enter companies you'd like to prioritize…`, 'Añade empresas que quieras priorizar…'])" @keydown.enter.prevent="p.addDream">
        <button class="pref-add" :disabled="!p.dreamDraft.trim()" @click="p.addDream">＋ {{ p.T(['Add', 'Añadir']) }}</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FIELDS } from 'src/composables/usePrefs'

const props = defineProps({
  p: { type: Object, required: true },
  n: { type: Number, required: true },
  showTitle: { type: Boolean, default: true },
  num: { type: Boolean, default: true }
})
const meta = computed(() => FIELDS.find(x => x.n === props.n) || {})
</script>
