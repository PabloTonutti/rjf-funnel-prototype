<template>
  <div class="pv1">
    <div class="inner">
      <header class="head">
        <div>
          <h1>{{ p.T(['Your preferences', 'Tus preferencias']) }}</h1>
          <p>{{ p.T(['Everything in one view — changes are saved automatically.', 'Todo en una vista: los cambios se guardan solos.']) }}</p>
        </div>
        <button class="lang" @click="p.f.toggleLang()"><b v-if="p.f.lang === 'en'">EN</b><template v-else>EN</template> · <b v-if="p.f.lang === 'es'">ES</b><template v-else>ES</template></button>
      </header>

      <div class="grid">
        <div v-for="fl in p.FIELDS" :key="fl.n" class="card" :class="'g' + fl.g" :style="fl.n === 3 ? 'grid-column:1/-1' : ''">
          <div class="crown">
            <span class="cicon">{{ fl.icon }}</span>
            <span class="gtag">{{ p.T(p.GROUPS[fl.g]) }}</span>
          </div>
          <PrefField :p="p" :n="fl.n" :num="false" />
        </div>
      </div>
    </div>
    <VariantNav :cur="1" />
  </div>
</template>

<script setup>
import { usePrefs } from 'src/composables/usePrefs'
import PrefField from 'src/components/prefs/PrefField.vue'
import VariantNav from 'src/components/prefs/VariantNav.vue'
const p = usePrefs()
</script>

<style scoped>
.pv1{min-height:100vh;background:#F1F4F9;padding:0 0 90px}
.inner{max-width:1120px;margin:0 auto;padding:38px 28px 0}
.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:26px}
.head h1{font-size:30px;font-weight:800;color:#0A1F44;margin:0 0 6px;letter-spacing:-.5px}
.head p{color:#5A6B8C;font-size:15px;margin:0}
.lang{border:1px solid #D8E0EE;background:#fff;border-radius:999px;padding:8px 14px;font-size:13px;color:#5A6B8C;cursor:pointer}
.lang b{color:#007AFF}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.card{background:#fff;border-radius:18px;padding:22px 24px;box-shadow:0 2px 14px rgba(15,30,80,.06);border:1px solid #EAEFF7}
.crown{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.cicon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:21px;background:#EAF3FF}
.card.g1 .cicon{background:#EDFBF2}
.card.g2 .cicon{background:#FFF6E8}
.gtag{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#93A3C0}
.card :deep(.pref-title){font-size:15.5px}
@media(max-width:820px){.grid{grid-template-columns:1fr}.inner{padding:26px 16px 0}.head h1{font-size:25px}}
</style>
