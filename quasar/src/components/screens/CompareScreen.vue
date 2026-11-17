<template>
  <!-- v2 (paso HOW WE HELP nuevo): ofertas como tarjetas con su % de match en color, portales vs JobWinner -->
  <div v-if="screen.v2" class="wrap"><div class="screen"><div class="inter cmp2">
    <h1>{{ f.T(screen.title) }}</h1>
    <p class="subtitle cmp2-sub" v-html="f.T(screen.body)" />
    <div class="cmp2-box">
      <div class="cmp2-col">
        <div class="cmp2-hd cmp2-brands" :aria-label="'LinkedIn · Indeed'"><span class="li-mark">Linked<i>in</i></span><span class="in-mark">indeed</span></div>
        <div v-for="(p, i) in trad" :key="i" class="cmp2-job" :class="tone(p)">
          <span class="cmp2-logo" /><span class="cmp2-lines"><i /><i /></span><b>{{ p }}%<small>match</small></b>
        </div>
      </div>
      <div class="cmp2-col jw">
        <div class="cmp2-hd"><span class="cmp2-cup" v-html="ic('trophy', 14)" />JobWinner</div>
        <div v-for="(p, i) in jwv2" :key="i" class="cmp2-job good">
          <span class="cmp2-logo" /><span class="cmp2-lines"><i /><i /></span><b>{{ p }}%<small>match</small></b>
        </div>
      </div>
    </div>
  </div></div></div>
  <div v-else class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start;padding-top:6px">
    <h1>{{ f.T(screen.title) }}</h1>
    <div class="compare">
      <div class="col">
        <h4>{{ f.T(['Traditional search', 'Búsqueda tradicional']) }}</h4>
        <div v-for="(p, i) in trad" :key="i" class="bar-row">
          <span class="pct">{{ p }}% match</span>
          <div class="bar"><i :style="{ width: p + '%' }" /></div>
        </div>
      </div>
      <div class="col jw">
        <h4>JobWinner</h4>
        <div v-for="(p, i) in jw" :key="i" class="bar-row">
          <span class="pct">{{ p }}% match</span>
          <div class="bar"><i :style="{ width: p + '%' }" /></div>
        </div>
      </div>
    </div>
    <p class="subtitle" style="margin-bottom:0">{{ f.T(screen.body) }}</p>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'
import { ic } from 'assets/graphics'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const trad = [62, 83, 30, 71, 27]
const jw = [100, 98, 100, 97, 100]
const jwv2 = [98, 96, 95, 93, 91]
const tone = p => (p < 50 ? 'bad' : p < 75 ? 'mid' : 'good')
</script>
