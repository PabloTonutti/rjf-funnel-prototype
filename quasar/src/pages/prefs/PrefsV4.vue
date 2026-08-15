<template>
  <div class="pv4">
    <div class="inner">
      <header class="head">
        <div>
          <h1>{{ p.T(['Your preferences', 'Tus preferencias']) }}</h1>
          <p>{{ p.T(['Dark mode · autosaved', 'Modo oscuro · guardado automático']) }}</p>
        </div>
        <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'EN' : 'ES' }} ⇄</button>
      </header>

      <div v-for="(g, k) in p.GROUPS" :key="k" class="gcard">
        <h2>{{ p.T(g) }}</h2>
        <section v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" class="sec">
          <PrefField :p="p" :n="fl.n" :num="false" />
        </section>
      </div>
    </div>
    <VariantNav :cur="4" />
  </div>
</template>

<script setup>
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
</script>

<style scoped>
.pv4{min-height:100vh;background:#0D1220;padding:0 0 90px}
.inner{max-width:780px;margin:0 auto;padding:40px 22px 0}
.head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
.head h1{font-size:28px;font-weight:800;color:#F2F6FF;margin:0 0 5px;letter-spacing:-.4px}
.head p{color:#7B8AAD;font-size:14px;margin:0}
.lang{border:1px solid #2A3450;background:#161D31;border-radius:10px;padding:7px 12px;font-size:13px;font-weight:700;color:#4D8DFF;cursor:pointer}
.gcard{background:#141A2C;border:1px solid #232C45;border-radius:18px;padding:8px 24px 14px;margin-bottom:20px}
.gcard h2{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:#4D8DFF;margin:18px 0 4px}
.sec{padding:16px 0;border-bottom:1px solid #1D2640}
.sec:last-child{border-bottom:none}
/* Skin oscuro de los controles base */
.pv4 :deep(.pref-title){color:#E7EDFA}
.pv4 :deep(.pref-title b){color:#E7EDFA}
.pv4 :deep(.pref-sub){color:#7B8AAD}
.pv4 :deep(.pcheck){color:#232C45}
.pv4 :deep(.pcheck.on){color:#22C55E}
.pv4 :deep(.ppill){background:#101728;border:1px solid #2A3450;color:#B9C5DE}
.pv4 :deep(.ppill:hover){border-color:#3D4E7E}
.pv4 :deep(.ppill.on){background:#1D3E78;border-color:#4D8DFF;color:#fff;box-shadow:0 0 0 1px #4D8DFF inset}
.pv4 :deep(.pref-chip){background:#1D3E78;color:#DCE8FF;border:1px solid #2A4C8F}
.pv4 :deep(.pref-chip button){color:#9FB8E8}
.pv4 :deep(.pref-addrow input),.pv4 :deep(.pref-select){background:#101728;border:1px solid #2A3450;color:#E7EDFA}
.pv4 :deep(.pref-addrow input::placeholder){color:#5B6A8F}
.pv4 :deep(.pref-add){background:#4D8DFF;color:#fff;border:none}
.pv4 :deep(.pref-add:disabled){background:#232C45;color:#5B6A8F}
.pv4 :deep(.pref-unit){color:#7B8AAD}
.pv4 :deep(.sug-list){background:#161D31;border:1px solid #2A3450;box-shadow:0 14px 40px rgba(0,0,0,.5)}
.pv4 :deep(.sug-row){color:#DCE8FF}
.pv4 :deep(.sug-row:hover){background:#1D2640}
@media(max-width:640px){.head h1{font-size:23px}.gcard{padding:6px 16px 10px}}
</style>
