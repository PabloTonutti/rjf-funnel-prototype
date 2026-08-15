<template>
  <div class="pv5">
    <div class="inner">
      <header class="head">
        <h1>{{ p.T(['Your preferences', 'Tus preferencias']) }}</h1>
        <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'EN' : 'ES' }} ⇄</button>
      </header>
      <p class="intro">{{ p.T(['Tap a row to edit it. Everything saves automatically.', 'Toca una fila para editarla. Todo se guarda solo.']) }}</p>

      <div class="acc">
        <template v-for="(g, k) in p.GROUPS" :key="k">
          <div class="gh">{{ p.T(g) }}</div>
          <div v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" class="row" :class="{ open: open === fl.n }">
            <button class="rhead" @click="open = open === fl.n ? 0 : fl.n">
              <span class="rnum" :class="{ on: p.filled(fl.n) }">{{ p.filled(fl.n) ? '✓' : fl.n }}</span>
              <span class="rtitle">{{ p.T(fl.t) }}</span>
              <span class="rsum">{{ p.summary(fl.n) || p.T(['Not set', 'Sin definir']) }}</span>
              <span class="chev" :class="{ rot: open === fl.n }">▾</span>
            </button>
            <div v-if="open === fl.n" class="rbody">
              <PrefField :p="p" :n="fl.n" :show-title="false" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <VariantNav :cur="5" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
const open = ref(1)
</script>

<style scoped>
.pv5{min-height:100vh;background:#F4F6FA;padding:0 0 90px}
.inner{max-width:760px;margin:0 auto;padding:40px 20px 0}
.head{display:flex;justify-content:space-between;align-items:center}
.head h1{font-size:27px;font-weight:800;color:#0A1F44;margin:0;letter-spacing:-.4px}
.lang{border:1px solid #E3E8F2;background:#fff;border-radius:10px;padding:7px 12px;font-size:13px;font-weight:700;color:#007AFF;cursor:pointer}
.intro{color:#5A6B8C;font-size:14.5px;margin:6px 0 22px}
.gh{font-size:11.5px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#93A3C0;margin:22px 4px 8px}
.row{background:#fff;border:1px solid #E7ECF5;border-radius:14px;margin-bottom:10px;overflow:hidden;transition:box-shadow .15s}
.row.open{box-shadow:0 8px 26px rgba(15,30,80,.10);border-color:#BFD9FF}
.rhead{display:flex;align-items:center;gap:12px;width:100%;background:none;border:none;padding:15px 18px;cursor:pointer;text-align:left}
.rnum{width:26px;height:26px;flex:0 0 26px;border-radius:50%;background:#EEF2F8;color:#5A6B8C;font-size:12.5px;font-weight:800;display:flex;align-items:center;justify-content:center}
.rnum.on{background:#22C55E;color:#fff}
.rtitle{font-size:15px;font-weight:700;color:#0A1F44;white-space:nowrap}
.rsum{flex:1;font-size:13px;color:#93A3C0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right}
.chev{color:#93A3C0;font-size:13px;transition:transform .15s}
.chev.rot{transform:rotate(180deg)}
.rbody{padding:2px 18px 18px 56px;border-top:1px dashed #EEF2F8}
@media(max-width:640px){.rsum{display:none}.rbody{padding-left:18px}}
</style>
