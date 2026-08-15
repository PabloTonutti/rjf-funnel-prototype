<template>
  <div class="pv6">
    <div class="inner">
      <div class="steps">
        <button v-for="(g, k) in p.GROUPS" :key="k" class="step" :class="{ on: step === k, done: k < step }" @click="step = k">
          <span class="snum">{{ k < step ? '✓' : k + 1 }}</span>
          <span class="slab">{{ p.T(g) }}</span>
        </button>
      </div>
      <div class="bar"><div class="fill" :style="{ width: ((step + 1) / 3 * 100) + '%' }" /></div>

      <div class="card">
        <div class="cardhead">
          <h1>{{ p.T(p.GROUPS[step]) }}</h1>
          <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'EN' : 'ES' }} ⇄</button>
        </div>
        <section v-for="fl in p.FIELDS.filter(x => x.g === step)" :key="fl.n" class="sec">
          <PrefField :p="p" :n="fl.n" :num="false" />
        </section>
        <div class="foot">
          <button class="back" :disabled="step === 0" @click="step--">← {{ p.T(['Back', 'Atrás']) }}</button>
          <button v-if="step < 2" class="next" @click="step++; scrollTop()">{{ p.T(['Continue', 'Continuar']) }} →</button>
          <button v-else class="next done2" @click="step = 0; scrollTop()">✓ {{ p.T(['All saved', 'Todo guardado']) }}</button>
        </div>
      </div>
    </div>
    <VariantNav :cur="6" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
const step = ref(0)
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })
</script>

<style scoped>
.pv6{min-height:100vh;background:linear-gradient(180deg,#EAF3FF 0%,#F7FAFF 240px);padding:0 0 90px}
.inner{max-width:680px;margin:0 auto;padding:38px 20px 0}
.steps{display:flex;gap:8px;margin-bottom:12px}
.step{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#fff;border:1px solid #E3E8F2;border-radius:12px;padding:11px 8px;cursor:pointer}
.step.on{border-color:#007AFF;box-shadow:0 0 0 1px #007AFF inset}
.snum{width:22px;height:22px;border-radius:50%;background:#EEF2F8;color:#5A6B8C;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center}
.step.on .snum{background:#007AFF;color:#fff}
.step.done .snum{background:#22C55E;color:#fff}
.slab{font-size:13px;font-weight:700;color:#3D4E6E}
.bar{height:6px;background:#E3E8F2;border-radius:999px;overflow:hidden;margin-bottom:20px}
.fill{height:100%;background:#007AFF;border-radius:999px;transition:width .25s}
.card{background:#fff;border-radius:20px;border:1px solid #E7ECF5;box-shadow:0 10px 36px rgba(15,30,80,.08);padding:26px 30px 24px}
.cardhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.cardhead h1{font-size:23px;font-weight:800;color:#0A1F44;margin:0;letter-spacing:-.3px}
.lang{border:1px solid #E3E8F2;background:#fff;border-radius:10px;padding:6px 11px;font-size:12.5px;font-weight:700;color:#007AFF;cursor:pointer}
.sec{padding:18px 0;border-bottom:1px solid #F0F3F9}
.foot{display:flex;justify-content:space-between;padding-top:20px}
.back{border:1px solid #E3E8F2;background:#fff;border-radius:12px;padding:11px 20px;font-size:14px;font-weight:700;color:#5A6B8C;cursor:pointer}
.back:disabled{opacity:.4;cursor:default}
.next{border:none;background:#007AFF;color:#fff;border-radius:12px;padding:11px 24px;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 6px 18px rgba(0,122,255,.30)}
.next.done2{background:#22C55E;box-shadow:0 6px 18px rgba(34,197,94,.30)}
@media(max-width:640px){.slab{display:none}.card{padding:20px 18px}}
</style>
