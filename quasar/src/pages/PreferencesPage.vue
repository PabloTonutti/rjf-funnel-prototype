<template>
  <div class="pv7">
    <div class="inner">
      <header class="head">
        <div>
          <h1>{{ p.T(['Search preferences', 'Preferencias de búsqueda']) }}</h1>
          <p class="intro">{{ p.T(['Tell us what you\'re looking for and we\'ll match you with the right jobs. Changes are saved automatically.', 'Cuéntanos qué buscas y te encontraremos las ofertas adecuadas. Los cambios se guardan solos.']) }}</p>
        </div>
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
  </div>
</template>

<script setup>
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
const p = usePrefs()
</script>

<style scoped>
.pv7{min-height:100vh;background:#fff;padding:0 0 60px}
.inner{max-width:1200px;margin:0 auto;padding:34px 26px 0}
/* Hueco reservado para la futura sidebar de la app en pantallas anchas */
@media(min-width:1100px){.inner{margin-left:280px;margin-right:auto}}
.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:22px}
.head h1{font-size:26px;font-weight:800;color:#0A1F44;margin:0;letter-spacing:-.3px;text-align:left}
.intro{color:#5A6B8C;font-size:14.5px;margin:6px 0 0;max-width:640px}
.lang{border:1px solid #E3E8F2;background:#fff;border-radius:9px;padding:6px 11px;font-size:13.5px;font-weight:700;color:#007AFF;cursor:pointer;flex:0 0 auto}
.block{border:1px solid #E7ECF5;border-radius:14px;margin-bottom:18px;overflow:hidden}
.bh{background:#F7F9FC;padding:11px 18px;font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#5A6B8C;border-bottom:1px solid #E7ECF5}
.row{display:grid;grid-template-columns:260px 1fr;gap:18px;padding:17px 18px;border-bottom:1px solid #F0F3F9;align-items:start}
.row:last-child{border-bottom:none}
.lab{display:flex;gap:9px;align-items:flex-start;padding-top:5px}
.ldot{width:8px;height:8px;border-radius:50%;background:#D8E0EE;margin-top:7px;flex:0 0 8px}
.ldot.on{background:#007AFF}
.lab b{font-size:14.5px;color:#0A1F44;display:block;line-height:1.3}
.lab small{font-size:12.5px;color:#93A3C0;display:block;margin-top:2px;line-height:1.4}
/* Controles densos */
.ctl :deep(.ppill){padding:7px 13px;font-size:13.5px;border-radius:9px}
.ctl :deep(.pref-chip){font-size:13.5px;padding:6px 11px}
.ctl :deep(.pref-addrow input),.ctl :deep(.pref-select){padding:9px 13px;font-size:14px}
.ctl :deep(.pref-add){padding:9px 14px;font-size:13.5px}
.ctl :deep(.pref-sub){display:none}
@media(max-width:760px){.row{grid-template-columns:1fr;gap:8px}.head{flex-direction:column}.inner{padding:26px 16px 0}}
</style>
