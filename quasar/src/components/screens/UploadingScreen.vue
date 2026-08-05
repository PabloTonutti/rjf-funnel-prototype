<template>
  <div class="wrap"><div class="screen"><div class="inter" style="justify-content:flex-start;padding-top:18px">
    <h1>{{ li ? f.T(['We are scanning your LinkedIn…', 'Estamos escaneando tu LinkedIn…']) : f.T(['Our AI is reviewing your resume', 'Nuestra IA está revisando tu currículum']) }}</h1>
    <p class="subtitle qsub">{{ f.T(['Identifying your latest roles to match you with the right jobs', 'Identificando tus últimos puestos para emparejarte con los empleos adecuados']) }}</p>
    <div class="ai-steps">
      <div v-for="(st, k) in steps" :key="k" class="ai-step" :class="{ active: stage === k, done: stage > k }">
        <span class="ai-ind">
          <svg v-if="stage > k" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <i v-else-if="stage === k" class="ai-spin" />
        </span>
        <span class="ai-txt"><b>{{ f.T(st.t) }}</b><small>{{ f.T(st.s) }}</small></span>
      </div>
    </div>
  </div></div></div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const li = computed(() => f.upload && f.upload.kind === 'linkedin')

const steps = computed(() => li.value
  ? [
      { t: ['Scanning your LinkedIn profile', 'Escaneando tu perfil de LinkedIn'], s: ['Reading your experience & skills', 'Leyendo tu experiencia y habilidades'] },
      { t: ['Creating your resume', 'Creando tu currículum'], s: ['Turning your profile into an ATS-ready resume', 'Convirtiendo tu perfil en un CV listo para ATS'] },
      { t: ['Scoring against recruiter criteria', 'Puntuando con criterios de reclutador'], s: ['Checking keywords, format & ATS compatibility', 'Revisando keywords, formato y compatibilidad ATS'] },
      { t: ['Preparing your results', 'Preparando tus resultados'], s: ['Almost there…', 'Ya casi está…'] }
    ]
  : [
      { t: ['Reading your resume', 'Leyendo tu currículum'], s: ['Extracting text, sections & structure', 'Extrayendo texto, secciones y estructura'] },
      { t: ['Scoring against recruiter criteria', 'Puntuando con criterios de reclutador'], s: ['Checking keywords, format & ATS compatibility', 'Revisando keywords, formato y compatibilidad ATS'] },
      { t: ['Generating personalized suggestions', 'Generando sugerencias personalizadas'], s: ['Finding areas to improve your chances', 'Buscando áreas para mejorar tus opciones'] },
      { t: ['Preparing your results', 'Preparando tus resultados'], s: ['Almost there…', 'Ya casi está…'] }
    ])

const stage = ref(0)
let cancelled = false
const timers = []
onMounted(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  for (let k = 1; k <= 4; k++) timers.push(setTimeout(() => { if (!cancelled) stage.value = k }, k * 1100))
  const minTime = sleep(4600)
  await Promise.race([f.aiPromise || Promise.resolve(), sleep(9000)])
  await minTime
  if (!cancelled) f.next()
})
onUnmounted(() => { cancelled = true; timers.forEach(clearTimeout) })
</script>
