<template>
  <div class="pv2">
    <div class="inner">
      <header class="head">
        <h1>{{ p.T(['Your preferences', 'Tus preferencias']) }}</h1>
        <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'EN' : 'ES' }} ⇄</button>
      </header>
      <p class="intro">{{ p.T(['Fine-tune what we look for. Autosaved as you go.', 'Ajusta lo que buscamos por ti. Se guarda solo.']) }}</p>

      <div class="tabs">
        <button v-for="(g, k) in p.GROUPS" :key="k" class="tab" :class="{ on: tab === k }" @click="tab = k">
          {{ p.T(g) }}
          <span class="tdone">{{ doneIn(k) }}/{{ countIn(k) }}</span>
        </button>
      </div>

      <div class="panel">
        <section v-for="fl in p.FIELDS.filter(x => x.g === tab)" :key="fl.n" class="sec">
          <PrefField :p="p" :n="fl.n" :num="false" />
        </section>
      </div>
    </div>
    <VariantNav :cur="2" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
const tab = ref(0)
const countIn = g => p.FIELDS.filter(x => x.g === g).length
const doneIn = g => p.FIELDS.filter(x => x.g === g && p.filled(x.n)).length
</script>

<style scoped>
.pv2{min-height:100vh;background:#fff;padding:0 0 90px}
.inner{max-width:860px;margin:0 auto;padding:42px 24px 0}
.head{display:flex;justify-content:space-between;align-items:center}
.head h1{font-size:28px;font-weight:800;color:#0A1F44;margin:0;letter-spacing:-.5px}
.lang{border:1px solid #E3E8F2;background:#fff;border-radius:10px;padding:7px 12px;font-size:13px;font-weight:700;color:#007AFF;cursor:pointer}
.intro{color:#5A6B8C;font-size:15px;margin:8px 0 24px}
.tabs{display:flex;gap:6px;background:#F1F4F9;border-radius:14px;padding:5px}
.tab{flex:1;border:none;background:transparent;border-radius:10px;padding:11px 8px;font-size:14px;font-weight:700;color:#5A6B8C;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}
.tab.on{background:#fff;color:#0A1F44;box-shadow:0 2px 8px rgba(15,30,80,.10)}
.tdone{font-size:11px;font-weight:800;background:#E3E8F2;color:#5A6B8C;border-radius:999px;padding:2px 7px}
.tab.on .tdone{background:#007AFF;color:#fff}
.panel{padding-top:8px}
.sec{padding:24px 4px;border-bottom:1px solid #EEF2F8}
.sec:last-child{border-bottom:none}
@media(max-width:640px){.tab{font-size:12.5px;flex-direction:column;gap:4px}}
</style>
