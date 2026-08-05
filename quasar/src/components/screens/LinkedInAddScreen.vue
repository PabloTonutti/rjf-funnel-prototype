<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <p class="subtitle qsub">{{ f.T(screen.sub) }}</p>
    <div class="up-card" style="text-align:left;background:#fff;border-color:var(--jw-line)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <span style="width:34px;height:34px;flex:none" v-html="duo('liD')" />
        <b style="font-family:var(--pjs);font-size:16px">{{ f.T(['Paste your profile URL', 'Pega la URL de tu perfil']) }}</b>
      </div>
      <div class="li-input-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        <input type="text" v-model="url" placeholder="linkedin.com/in/username" autocomplete="off">
      </div>
      <p v-if="err" class="footnote" style="color:var(--jw-terracotta);text-align:left;margin:0 0 10px">
        {{ f.T(['Enter a valid LinkedIn profile URL', 'Introduce una URL válida de perfil de LinkedIn']) }}
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
const url = ref('')
const err = ref(false)

function add () {
  const u = url.value.trim()
  if (!/linkedin\.com\/in\/[A-Za-z0-9\-_%]+/.test(u)) { err.value = true; return }
  // Real Renidly import goes through a backend proxy in production —
  // the API key must never ship in client code.
  f.upload = { kind: 'linkedin', name: u.replace(/^https?:\/\/(www\.)?/, '') }
  f.answers.P19 = 'linkedin'
  f.analyzeResume()
  f.next()
}
function skip () { f.upload = null; f.next() }
</script>
