<template>
  <div class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start">
    <h1 class="jpv-title">{{ f.T(screen.title) }}</h1>
    <p class="subtitle jpv-sub"><b>{{ f.T(screen.sub) }}</b><br>{{ f.T(screen.sub2) }}</p>
    <div class="start-badge-wrap"><span class="start-badge">💼 <u>{{ f.T(screen.badge) }}</u></span></div>
    <div v-for="(j, k) in jobs" :key="k" class="jpv-card" :class="{ 'jpv-faded': j.faded }">
      <div class="jpv-co"><span class="jpv-logo" :style="{ background: j.c }">{{ j.co[0] }}</span>{{ j.co }}<span class="jpv-new">NEW</span></div>
      <div class="jpv-role">{{ j.role }}</div>
      <template v-if="!j.faded">
        <div class="jpv-meta">🌍 {{ f.T(['Full Remote 100%', '100% remoto']) }}</div>
        <div class="jpv-foot"><b>{{ j.sal }}</b><small>{{ f.T(j.when) }}</small></div>
      </template>
    </div>
  </div></div></div>
  <FootContinue :label="f.T(screen.cta)" @go="f.next()" />
</template>

<script setup>
import { useFunnel } from 'stores/funnel'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const jobs = [
  { co: 'Nordia', c: '#02112D', role: 'Senior Product Manager', sal: '85–110k €', when: ['Just now', 'Ahora mismo'] },
  { co: 'Peoplr', c: '#007AFF', role: 'Virtual Assistant', sal: 'Up to $4,800/m', when: ['2 min ago', 'hace 2 min'] },
  { co: 'Stackly', c: '#DE8F6E', role: 'Frontend Developer', faded: true }
]
</script>
