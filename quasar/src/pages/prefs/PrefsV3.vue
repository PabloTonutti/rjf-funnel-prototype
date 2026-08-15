<template>
  <div class="pv3">
    <div class="inner">
      <aside class="nav">
        <div class="navtitle">{{ p.T(['Preferences', 'Preferencias']) }}</div>
        <div v-for="(g, k) in p.GROUPS" :key="k" class="navgroup">
          <div class="ng">{{ p.T(g) }}</div>
          <a v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" :href="'#f' + fl.n" class="nl">
            <span class="dot" :class="{ on: p.filled(fl.n) }" />{{ p.T(fl.t) }}
          </a>
        </div>
        <button class="lang" @click="p.f.toggleLang()">{{ p.f.lang === 'en' ? 'Cambiar a ES' : 'Switch to EN' }}</button>
      </aside>

      <main class="main">
        <h1>{{ p.T(['Your preferences', 'Tus preferencias']) }}</h1>
        <p class="intro">{{ p.T(['Changes are saved automatically.', 'Los cambios se guardan solos.']) }}</p>
        <template v-for="(g, k) in p.GROUPS" :key="k">
          <h2 class="gh">{{ p.T(g) }}</h2>
          <section v-for="fl in p.FIELDS.filter(x => x.g === k)" :key="fl.n" :id="'f' + fl.n" class="sec">
            <PrefField :p="p" :n="fl.n" :num="false" />
          </section>
        </template>
      </main>
    </div>
    <VariantNav :cur="3" />
  </div>
</template>

<script setup>
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
</script>

<style scoped>
.pv3{min-height:100vh;background:#FBFCFE;padding:0 0 90px}
.inner{max-width:1080px;margin:0 auto;padding:0 24px;display:flex;gap:48px}
.nav{width:230px;flex:0 0 230px;position:sticky;top:0;align-self:flex-start;max-height:100vh;overflow-y:auto;padding:38px 0 24px}
.navtitle{font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#0A1F44;margin-bottom:16px}
.ng{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#93A3C0;margin:16px 0 6px}
.nl{display:flex;align-items:center;gap:8px;font-size:13.5px;color:#3D4E6E;text-decoration:none;padding:6px 8px;border-radius:8px}
.nl:hover{background:#EFF3FA;color:#0A1F44}
.dot{width:7px;height:7px;border-radius:50%;background:#D8E0EE;flex:0 0 7px}
.dot.on{background:#22C55E}
.lang{margin-top:22px;border:1px solid #E3E8F2;background:#fff;border-radius:8px;padding:7px 12px;font-size:12.5px;color:#5A6B8C;cursor:pointer}
.main{flex:1;min-width:0;padding:38px 0 0;scroll-behavior:smooth}
.main h1{font-size:27px;font-weight:800;color:#0A1F44;margin:0 0 4px;letter-spacing:-.4px}
.intro{color:#5A6B8C;font-size:14.5px;margin:0 0 10px}
.gh{font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#007AFF;margin:34px 0 4px;padding-bottom:8px;border-bottom:2px solid #E7F0FF}
.sec{padding:20px 0;border-bottom:1px solid #EEF2F8;scroll-margin-top:20px}
.sec :deep(.pref-title){font-size:15px}
@media(max-width:900px){.nav{display:none}.inner{display:block}}
</style>
