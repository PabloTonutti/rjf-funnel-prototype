<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <p class="subtitle qsub">{{ f.T(screen.sub) }}</p>
    <div class="sal-widget">
      <div class="toggle">
        <button
          v-for="(p, k) in periods" :key="k"
          :class="{ on: f.salaryPeriod === k }"
          @click="setPeriod(k)"
        >{{ f.T(p) }}</button>
      </div>
      <div class="histo">
        <i v-for="(h, i) in BARS" :key="i" :style="{ height: h + '%' }" :class="{ off: i < cutoff }" />
      </div>
      <input type="range" class="rng" :min="cfg.min" :max="cfg.max" :step="cfg.step" v-model.number="val">
      <label class="sal-label">{{ $t('minSalary') }}, <span>{{ sym + f.T(cfg.unit) }}</span></label>
      <div class="input-wrap">
        <span class="cur-prefix">{{ sym }}</span>
        <input type="text" class="sal-input" inputmode="numeric" :value="fmt(val)" @change="onType($event)">
        <span class="currency">{{ sym + f.T(cfg.unit) }}</span>
      </div>
    </div>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" :disabled="false" @go="go" />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useFunnel } from 'stores/funnel'
import { currencySymbol } from 'src/utils/currency'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

// Moneda por ubicación (país del funnel si ya se respondió; si no, región del navegador)
const sym = computed(() => currencySymbol(f.answers.P11))

const periods = [['Hourly', 'Por hora'], ['Monthly', 'Mensual'], ['Yearly', 'Anual']]
const CFG = [
  { min: 5, max: 80, step: 1, def: 15, unit: ['/hour', '/hora'] },
  { min: 500, max: 10000, step: 100, def: 2500, unit: ['/month', '/mes'] },
  { min: 10000, max: 150000, step: 1000, def: 30000, unit: ['/year', '/año'] }
]
const BARS = [6, 10, 16, 26, 42, 58, 72, 64, 52, 42, 34, 28, 23, 19, 16, 13, 11, 9, 8, 7]

const cfg = computed(() => CFG[f.salaryPeriod])
const val = ref(
  f.answers.P8_amount && f.answers.P8_period === f.salaryPeriod
    ? +f.answers.P8_amount
    : cfg.value.def
)

const cutoff = computed(() =>
  Math.round((val.value - cfg.value.min) / (cfg.value.max - cfg.value.min) * (BARS.length - 1))
)
const fmt = n => Number(n).toLocaleString('en-US')

function save () {
  f.answers.P8_amount = val.value
  f.answers.P8_period = f.salaryPeriod
  f.answers.P8 = { amount: fmt(val.value), period: periods[f.salaryPeriod] }
}
function setPeriod (k) {
  f.salaryPeriod = k
  val.value = CFG[k].def
}
function onType (e) {
  const n = parseInt(String(e.target.value).replace(/[^0-9]/g, ''), 10)
  if (!isNaN(n)) val.value = Math.min(cfg.value.max, Math.max(cfg.value.min, n))
  e.target.value = fmt(val.value)
}
watch(val, save, { immediate: true })
function go () { save(); f.next() }
</script>
