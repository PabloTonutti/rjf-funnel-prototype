<template>
  <div class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start;padding-top:18px">
    <h1>{{ li ? f.T(['Your LinkedIn profile is importing', 'Tu perfil de LinkedIn se está importando']) : f.T(['Our AI is reviewing your resume', 'Nuestra IA está revisando tu currículum']) }}</h1>
    <p class="subtitle qsub">{{ f.T(['Identifying your latest roles to match you with the right jobs', 'Identificando tus últimos puestos para emparejarte con los empleos adecuados']) }}</p>
    <div class="scan-card">
      <div class="sc-label">{{ li ? f.T(['Reading your profile', 'Leyendo tu perfil']) : f.T(['Scanning your resume', 'Escaneando tu currículum']) }}</div>
      <div class="scan-doc">
        <div class="av" />
        <div class="ln" style="width:70%" />
        <div class="ln" style="width:45%" />
        <div style="clear:both;padding-top:6px" />
        <div class="ln" />
        <div class="ln" style="width:88%" />
        <div class="ln" style="width:94%" />
        <div class="ln" style="width:60%" />
        <div class="ln" style="width:82%" />
        <div class="scan-bar" />
      </div>
    </div>
  </div></div></div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useFunnel } from 'stores/funnel'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const li = computed(() => f.upload && f.upload.kind === 'linkedin')

// Wait for the scan animation AND the AI title suggestion (max 8s) before advancing
let cancelled = false
onMounted(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  const minTime = sleep(3200)
  await Promise.race([f.aiPromise || Promise.resolve(), sleep(8000)])
  await minTime
  if (!cancelled) f.next()
})
onUnmounted(() => { cancelled = true })
</script>
