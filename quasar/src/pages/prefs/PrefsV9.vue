<template>
  <div class="pv9">
    <div class="inner">
      <header class="head">
        <div>
          <h1>{{ p.T(['Your preferences', 'Tus preferencias']) }}</h1>
          <p>{{ p.T(['Autosaved · always up to date', 'Guardado automático · siempre al día']) }}</p>
        </div>
        <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'EN' : 'ES' }} ⇄</button>
      </header>

      <div v-for="(g, k) in p.GROUPS" :key="k" class="glass">
        <h2>{{ p.T(g) }}</h2>
        <section v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" class="sec">
          <PrefField :p="p" :n="fl.n" :num="false" />
        </section>
      </div>
    </div>
    <VariantNav :cur="9" />
  </div>
</template>

<script setup>
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
</script>

<style scoped>
.pv9{min-height:100vh;background:linear-gradient(135deg,#4F46E5 0%,#007AFF 55%,#06B6D4 100%);background-attachment:fixed;padding:0 0 90px}
.inner{max-width:780px;margin:0 auto;padding:42px 22px 0}
.head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;color:#fff}
.head h1{font-size:29px;font-weight:800;margin:0 0 5px;letter-spacing:-.4px;text-shadow:0 2px 12px rgba(0,0,40,.25)}
.head p{font-size:14px;opacity:.85;margin:0}
.lang{border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.15);border-radius:10px;padding:7px 13px;font-size:13px;font-weight:700;color:#fff;cursor:pointer;backdrop-filter:blur(8px)}
.glass{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);border-radius:20px;padding:8px 26px 14px;margin-bottom:20px;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 10px 40px rgba(0,10,60,.18)}
.glass h2{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,.85);margin:18px 0 4px}
.sec{padding:16px 0;border-bottom:1px solid rgba(255,255,255,.16)}
.sec:last-child{border-bottom:none}
/* Skin glass de los controles */
.pv9 :deep(.pref-title),.pv9 :deep(.pref-title b){color:#fff}
.pv9 :deep(.pref-sub){color:rgba(255,255,255,.75)}
.pv9 :deep(.pcheck){color:rgba(255,255,255,.28)}
.pv9 :deep(.pcheck.on){color:#34E27A}
.pv9 :deep(.ppill){background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);color:#fff}
.pv9 :deep(.ppill.on){background:#fff;border-color:#fff;color:#0A5BDB;font-weight:800}
.pv9 :deep(.pref-chip){background:rgba(255,255,255,.9);color:#0A5BDB;border:none;font-weight:700}
.pv9 :deep(.pref-chip button){color:#0A5BDB}
.pv9 :deep(.pref-addrow input),.pv9 :deep(.pref-select){background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);color:#fff}
.pv9 :deep(.pref-addrow input::placeholder){color:rgba(255,255,255,.6)}
.pv9 :deep(.pref-select option){color:#0A1F44}
.pv9 :deep(.pref-add){background:#fff;color:#0A5BDB;border:none;font-weight:800}
.pv9 :deep(.pref-add:disabled){background:rgba(255,255,255,.3);color:rgba(255,255,255,.6)}
.pv9 :deep(.pref-unit){color:rgba(255,255,255,.8)}
.pv9 :deep(.sug-list){background:#fff;border:none}
@media(max-width:640px){.head h1{font-size:24px}.glass{padding:6px 16px 10px}}
</style>
