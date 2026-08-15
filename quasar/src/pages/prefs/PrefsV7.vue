<template>
  <div class="pv7">
    <div class="inner">
      <header class="head">
        <h1>{{ p.T(['Search preferences', 'Preferencias de búsqueda']) }}</h1>
        <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'EN' : 'ES' }} ⇄</button>
      </header>

      <div v-for="(g, k) in p.GROUPS" :key="k" class="block">
        <div class="bh">{{ p.T(g) }}</div>
        <div v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" class="row">
          <div class="lab">
            <span class="ldot" :class="{ on: p.filled(fl.n) }" />
            <div>
              <b>{{ p.T(fl.t) }}</b>
              <small v-if="fl.sub">{{ p.T(fl.sub) }}</small>
            </div>
          </div>
          <div class="ctl"><PrefField :p="p" :n="fl.n" :show-title="false" /></div>
        </div>
      </div>
    </div>
    <VariantNav :cur="7" />
  </div>
</template>

<script setup>
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
</script>

<style scoped>
.pv7{min-height:100vh;background:#fff;padding:0 0 90px}
.inner{max-width:980px;margin:0 auto;padding:36px 24px 0}
.head{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.head h1{font-size:24px;font-weight:800;color:#0A1F44;margin:0;letter-spacing:-.3px}
.lang{border:1px solid #E3E8F2;background:#fff;border-radius:9px;padding:6px 11px;font-size:12.5px;font-weight:700;color:#007AFF;cursor:pointer}
.block{border:1px solid #E7ECF5;border-radius:14px;margin-bottom:18px;overflow:hidden}
.bh{background:#F7F9FC;padding:10px 18px;font-size:11.5px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#5A6B8C;border-bottom:1px solid #E7ECF5}
.row{display:grid;grid-template-columns:250px 1fr;gap:18px;padding:16px 18px;border-bottom:1px solid #F0F3F9;align-items:start}
.row:last-child{border-bottom:none}
.lab{display:flex;gap:9px;align-items:flex-start;padding-top:5px}
.ldot{width:8px;height:8px;border-radius:50%;background:#D8E0EE;margin-top:6px;flex:0 0 8px}
.ldot.on{background:#22C55E}
.lab b{font-size:13.5px;color:#0A1F44;display:block;line-height:1.3}
.lab small{font-size:11.5px;color:#93A3C0;display:block;margin-top:2px;line-height:1.35}
/* Controles densos */
.ctl :deep(.ppill){padding:6px 12px;font-size:12.5px;border-radius:9px}
.ctl :deep(.pref-chip){font-size:12.5px;padding:5px 10px}
.ctl :deep(.pref-addrow input),.ctl :deep(.pref-select){padding:8px 12px;font-size:13px}
.ctl :deep(.pref-add){padding:8px 13px;font-size:12.5px}
.ctl :deep(.pref-sub){display:none}
@media(max-width:760px){.row{grid-template-columns:1fr;gap:8px}}
</style>
