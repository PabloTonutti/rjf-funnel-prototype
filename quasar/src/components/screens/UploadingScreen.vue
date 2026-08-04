<template>
  <div class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start;padding-top:18px">
    <h1>{{ li ? f.T(['Your LinkedIn profile is importing', 'Tu perfil de LinkedIn se está importando']) : f.T(['Your resume is uploading', 'Tu currículum se está subiendo']) }}</h1>
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

let timer = null
onMounted(() => { timer = setTimeout(() => f.next(), 3200) })
onUnmounted(() => clearTimeout(timer))
</script>
