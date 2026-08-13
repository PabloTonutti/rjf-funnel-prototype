<template>
  <div class="wrap"><div class="screen"><div class="loader-wrap">
    <h1 style="text-align:center">{{ f.T(screen.title) }}</h1>
    <div class="ring-box">
      <svg width="150" height="150">
        <circle cx="75" cy="75" r="66" fill="none" stroke="var(--jw-line)" stroke-width="10"/>
        <circle
          cx="75" cy="75" r="66" fill="none" stroke="var(--jw-blue)" stroke-width="10" stroke-linecap="round"
          :stroke-dasharray="C" :stroke-dashoffset="C * (1 - p / 100)" style="transition:stroke-dashoffset .25s linear"
        />
      </svg>
      <div class="ring-pct">{{ p }}%</div>
    </div>
    <div class="load-card">
      <div v-for="(c, k) in checks" :key="k" class="load-row" :class="{ done: p >= (k + 1) * 19 }">
        <span class="mk" v-html="ic('check')" /><span>{{ f.T(c) }}</span>
        <span class="load-dot" />
      </div>
    </div>
    <div class="review-rot">
      <b>{{ review[0] }}</b> {{ f.T(['wrote a review', 'escribió una reseña']) }} &nbsp;<span class="stars">★★★★★</span><br>&ldquo;{{ f.T(review[1]) }}&rdquo;
    </div>
  </div></div></div>

  <Teleport to="body">
    <div v-if="microQ" class="micro-q">
      <div class="micro-card">
        <div class="tag">{{ f.T(['To move forward, specify', 'Para avanzar, especifica']) }}</div>
        <h2>{{ f.T(microQ.q) }}</h2>
        <div class="btn-row">
          <button class="btn btn-secondary" @click="answerMicro('No')">{{ $t('no') }}</button>
          <button class="btn btn-primary" @click="answerMicro('Yes')">{{ $t('yes') }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ic } from 'assets/graphics'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

const C = 2 * Math.PI * 66
const checks = [
  ['Categories & Salary', 'Categorías y Salario'], ['Experience', 'Experiencia'],
  ['Work Preferences', 'Preferencias de trabajo'], ['Location & Remote', 'Ubicación y Remoto'],
  ['Target roles & timeline', 'Puestos objetivo y plazo']
]
// Reviews REALES de Trustpilot (trustpilot.com/review/jobwinner.ai · 4.7 "Excellent")
const reviews = [
  ['Conall Bradley', ["I've landed 3 interviews for roles I'm actually excited about. The Skills Match is basically a cheat sheet for beating the ATS.", "I've landed 3 interviews for roles I'm actually excited about. The Skills Match is basically a cheat sheet for beating the ATS."]],
  ['Disha', ['It tailors your CV and cover letter to each role and shows how well you match with a fit score. Helped me apply with more confidence.', 'It tailors your CV and cover letter to each role and shows how well you match with a fit score. Helped me apply with more confidence.']],
  ['Lavallée Alexandre', ['Helped me organize my entire interview preparation process. A systematic approach rather than winging it — this tool delivers.', 'Helped me organize my entire interview preparation process. A systematic approach rather than winging it — this tool delivers.']],
  ['Montse Lorente', ['Easy to use, intuitive. I would recommend it to anyone looking for a job who wants to accelerate their search.', 'Easy to use, intuitive. I would recommend it to anyone looking for a job who wants to accelerate their search.']]
]
const microQs = [
  { at: 45, key: 'P48a', q: ['Open to learn new skills if the role requires it?', '¿Abierto a aprender nuevas skills si el rol lo requiere?'] },
  { at: 78, key: 'P48b', q: ['Do you have a laptop to work remotely?', '¿Tienes un portátil para trabajar en remoto?'] }
]

const p = ref(0)
const ri = ref(0)
const microQ = ref(null)
const asked = new Set()
const review = computed(() => reviews[ri.value % reviews.length])

let loadT = null, revT = null
onMounted(() => {
  revT = setInterval(() => { ri.value++ }, 3000)
  loadT = setInterval(() => {
    if (microQ.value) return
    p.value = Math.min(100, p.value + 2)
    const mq = microQs.find(m => p.value >= m.at && !asked.has(m.key))
    if (mq) { asked.add(mq.key); microQ.value = mq; return }
    if (p.value >= 100) {
      clearInterval(loadT); clearInterval(revT)
      setTimeout(() => f.next(), 600)
    }
  }, 110)
})
onUnmounted(() => { clearInterval(loadT); clearInterval(revT) })

function answerMicro (v) {
  f.answers[microQ.value.key] = v
  microQ.value = null
}
</script>
