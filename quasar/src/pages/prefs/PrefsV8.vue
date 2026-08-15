<template>
  <div class="pv8">
    <div class="hero">
      <div class="hinner">
        <div class="hleft">
          <h1>{{ p.T(['Your search profile', 'Tu perfil de búsqueda']) }}</h1>
          <p>{{ p.T(['The more complete it is, the better your matches.', 'Cuanto más completo, mejores serán tus matches.']) }}</p>
          <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'EN' : 'ES' }} ⇄</button>
        </div>
        <div class="ring">
          <svg viewBox="0 0 120 120" width="110" height="110">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="10" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"
              :stroke-dasharray="`${pct * 3.267} 326.7`" transform="rotate(-90 60 60)" />
          </svg>
          <div class="pctxt"><b>{{ pct }}%</b><small>{{ p.T(['complete', 'completo']) }}</small></div>
        </div>
      </div>
    </div>

    <div class="inner">
      <div v-for="(g, k) in p.GROUPS" :key="k" class="gcard">
        <div class="ghead">
          <h2>{{ p.T(g) }}</h2>
          <span class="gcount">{{ doneIn(k) }}/{{ countIn(k) }}</span>
        </div>
        <section v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" class="sec">
          <PrefField :p="p" :n="fl.n" :num="false" />
        </section>
      </div>
    </div>
    <VariantNav :cur="8" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
const pct = computed(() => Math.round(p.FIELDS.filter(x => p.filled(x.n)).length / p.FIELDS.length * 100))
const countIn = g => p.FIELDS.filter(x => x.g === g).length
const doneIn = g => p.FIELDS.filter(x => x.g === g && p.filled(x.n)).length
</script>

<style scoped>
.pv8{min-height:100vh;background:#F4F7FB;padding:0 0 90px}
.hero{background:linear-gradient(120deg,#0A66FF,#0047C2);color:#fff}
.hinner{max-width:820px;margin:0 auto;padding:40px 24px 44px;display:flex;justify-content:space-between;align-items:center;gap:24px}
.hleft h1{font-size:29px;font-weight:800;margin:0 0 7px;letter-spacing:-.4px}
.hleft p{font-size:15px;opacity:.85;margin:0 0 14px}
.lang{border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.12);border-radius:10px;padding:7px 13px;font-size:13px;font-weight:700;color:#fff;cursor:pointer}
.ring{position:relative;flex:0 0 110px}
.pctxt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.pctxt b{font-size:24px;line-height:1}
.pctxt small{font-size:10.5px;opacity:.8;margin-top:2px}
.inner{max-width:820px;margin:-22px auto 0;padding:0 24px}
.gcard{background:#fff;border-radius:18px;border:1px solid #E7ECF5;box-shadow:0 6px 22px rgba(15,30,80,.06);padding:6px 26px 12px;margin-bottom:18px}
.ghead{display:flex;justify-content:space-between;align-items:center;padding:18px 0 4px}
.ghead h2{font-size:17px;font-weight:800;color:#0A1F44;margin:0}
.gcount{font-size:12px;font-weight:800;background:#EAF3FF;color:#007AFF;border-radius:999px;padding:3px 10px}
.sec{padding:16px 0;border-bottom:1px solid #F0F3F9}
.sec:last-child{border-bottom:none}
@media(max-width:640px){.hinner{flex-direction:column;text-align:center}.hleft h1{font-size:24px}}
</style>
