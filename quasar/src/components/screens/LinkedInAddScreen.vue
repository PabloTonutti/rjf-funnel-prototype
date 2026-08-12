<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <p class="subtitle qsub">{{ f.T(screen.sub) }}</p>
    <div class="up-card" style="text-align:left;background:#fff;border-color:var(--jw-line)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <span style="width:34px;height:34px;flex:none" v-html="duo('liD')" />
        <b style="font-family:var(--pjs);font-size:16px">{{ f.T(['Paste your handle or profile URL', 'Pega tu handle o la URL de tu perfil']) }}</b>
      </div>
      <div class="li-input-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        <input type="text" v-model="handle" placeholder="@your-handle · linkedin.com/in/username" autocomplete="off">
      </div>
      <p v-if="err" class="footnote" style="color:var(--jw-terracotta);text-align:left;margin:0 0 10px">
        {{ f.T(['Enter your LinkedIn handle or profile URL', 'Introduce tu handle o la URL de tu perfil de LinkedIn']) }}
      </p>
      <button class="btn btn-primary" @click="add">{{ f.T(['ADD LINKEDIN PROFILE', 'Añadir perfil de LinkedIn']) }}</button>
    </div>
  </div></div>
  <Teleport to="#foot">
    <div class="finner">
      <button class="btn btn-secondary" @click="skip">{{ f.T(['CONTINUE WITHOUT LINKEDIN', 'Continuar sin LinkedIn']) }}</button>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { duo } from 'assets/graphics'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const handle = ref('')
const err = ref(false)

// El perfil se lee de verdad vía el worker (/li-profile → Renidly) dentro de analyzeResume.
// Extrae el handle de CUALQUIER variante: URL completa (con o sin https/www/subdominio de país,
// con query o barra final), "linkedin.com/in/foo", "@foo" o "foo" a secas.
function extractHandle (raw) {
  const u = (raw || '').trim()
  const m = u.match(/linkedin\.com\/in\/([^/?#\s]+)/i)
  if (m) return decodeURIComponent(m[1])
  return u.replace(/^@/, '').replace(/[/?#].*$/, '').trim()
}
function add () {
  const u = handle.value.trim()
  if (u.length < 3) { err.value = true; return }
  const h = extractHandle(u)
  if (!h || h.length < 2) { err.value = true; return }
  f.upload = { kind: 'linkedin', name: '@' + h, handle: h }
  f.answers.P19 = 'linkedin'
  f.analyzeResume()
  f.next()
}
function skip () { f.upload = null; f.next() }
</script>
