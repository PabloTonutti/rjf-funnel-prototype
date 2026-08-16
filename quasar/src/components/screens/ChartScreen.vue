<template>
  <div class="wrap"><div class="screen"><div class="inter">
    <h1>{{ f.T(screen.title) }}</h1>
    <p class="subtitle" style="font-weight:600;color:var(--jw-ink)">{{ f.T(screen.sub) }}</p>
    <div style="background:#fff;border:1px solid var(--jw-line);border-radius:var(--r-card);box-shadow:var(--shadow);padding:18px 14px 10px;display:flex;justify-content:center" v-html="svg" />
    <p class="footnote" style="margin-top:12px">{{ f.T(screen.note) }}</p>
  </div></div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" @go="f.next()" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { membersChartSvg } from 'src/utils/membersChart'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const svg = computed(() => membersChartSvg(f))
</script>
