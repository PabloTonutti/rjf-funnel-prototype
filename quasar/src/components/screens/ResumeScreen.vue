<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <div class="up-card">
      <div class="uic" v-html="ic('file-text')" />
      <h2>{{ f.T(['Add your resume to improve your matches', 'Añade tu CV para mejorar tus coincidencias']) }}</h2>
      <p>{{ f.T(['Even a draft or outdated resume can significantly improve job recommendations for you', 'Incluso un borrador o un CV desactualizado puede mejorar mucho las recomendaciones de empleo para ti']) }}</p>
      <input ref="fileEl" type="file" accept=".pdf,.doc,.docx,.rtf,.txt" style="display:none" @change="onFile">
      <button class="btn btn-primary" @click="fileEl.click()">{{ f.T(['UPLOAD RESUME', 'Subir currículum']) }}</button>
    </div>
  </div></div>
  <Teleport to="#foot">
    <div class="finner">
      <button class="btn btn-secondary" @click="skip">{{ f.T(['CONTINUE WITHOUT RESUME', 'Continuar sin CV']) }}</button>
      <p class="footnote">{{ f.T(['You can add or create a resume later', 'Puedes añadir o crear un CV más tarde']) }}</p>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ic } from 'assets/graphics'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const fileEl = ref(null)

function onFile (e) {
  const file = e.target.files[0]
  if (!file) return
  f.upload = { kind: 'file', name: file.name, size: (file.size / 1024).toFixed(0) + ' KB', file }
  f.answers.P19 = 'uploaded'
  f.analyzeResume()
  f.next()
}
function skip () { f.upload = null; f.answers.P19 = 'skipped'; f.next() }
</script>
