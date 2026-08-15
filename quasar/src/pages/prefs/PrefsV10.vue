<template>
  <div class="pv10">
    <aside class="side">
      <div class="stitle">{{ p.T(['Live profile', 'Perfil en vivo']) }}</div>
      <p class="ssub">{{ p.T(['Updates as you edit', 'Se actualiza mientras editas']) }}</p>
      <div v-for="fl in p.FIELDS" :key="fl.n" class="srow">
        <span class="sic">{{ fl.icon }}</span>
        <div class="stxt">
          <small>{{ p.T(fl.t) }}</small>
          <b :class="{ empty: !p.filled(fl.n) }">{{ p.summary(fl.n) || '—' }}</b>
        </div>
      </div>
      <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'Cambiar a ES' : 'Switch to EN' }}</button>
    </aside>

    <main class="main">
      <h1>{{ p.T(['Edit your preferences', 'Edita tus preferencias']) }}</h1>
      <p class="intro">{{ p.T(['Changes are saved automatically and reflected on the left.', 'Los cambios se guardan solos y se reflejan a la izquierda.']) }}</p>
      <template v-for="(g, k) in p.GROUPS" :key="k">
        <h2 class="gh">{{ p.T(g) }}</h2>
        <section v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" class="sec">
          <PrefField :p="p" :n="fl.n" :num="false" />
        </section>
      </template>
    </main>
    <VariantNav :cur="10" />
  </div>
</template>

<script setup>
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
</script>

<style scoped>
.pv10{min-height:100vh;background:#fff;display:flex}
.side{width:330px;flex:0 0 330px;background:#0E1626;color:#fff;padding:34px 26px 100px;position:sticky;top:0;align-self:flex-start;max-height:100vh;overflow-y:auto}
.stitle{font-size:19px;font-weight:800;letter-spacing:-.2px}
.ssub{font-size:12.5px;color:#7B8AAD;margin:4px 0 20px}
.srow{display:flex;gap:11px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #1B2740}
.sic{font-size:17px;margin-top:1px}
.stxt small{display:block;font-size:11px;color:#7B8AAD;text-transform:uppercase;letter-spacing:.6px;font-weight:700}
.stxt b{display:block;font-size:13.5px;color:#EAF0FC;margin-top:2px;line-height:1.35;word-break:break-word}
.stxt b.empty{color:#3D4E6E;font-weight:400}
.lang{margin-top:22px;border:1px solid #2A3450;background:#161D31;border-radius:10px;padding:8px 13px;font-size:12.5px;font-weight:700;color:#4D8DFF;cursor:pointer}
.main{flex:1;min-width:0;max-width:720px;padding:38px 40px 110px}
.main h1{font-size:27px;font-weight:800;color:#0A1F44;margin:0 0 5px;letter-spacing:-.4px}
.intro{color:#5A6B8C;font-size:14.5px;margin:0 0 8px}
.gh{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.1px;color:#007AFF;margin:30px 0 2px}
.sec{padding:18px 0;border-bottom:1px solid #F0F3F9}
@media(max-width:900px){.pv10{display:block}.side{width:auto;flex:none;position:static;max-height:none;padding:26px 20px}.main{padding:28px 20px 110px}}
</style>
