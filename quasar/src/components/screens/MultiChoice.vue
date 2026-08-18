<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ f.T(screen.title) }}</h1>
    <p class="subtitle qsub">{{ $t('selectAll') }}</p>
    <div class="options" :class="{ grid2: screen.grid2 }">
      <button
        v-for="(o, k) in screen.opts" :key="k"
        class="opt checkbox" :class="{ sel: picked.includes(o) }"
        @click="toggle(o)"
      >
        <span v-if="screen.icons !== false && o.i" class="duo" v-html="duo(o.i)" />
        <span class="lbl">{{ f.T(o.t) }}</span>
        <span class="mark" v-html="ic('check')" />
      </button>
    </div>
  </div></div>
  <FootContinue :label="contLabel" :disabled="!picked.length" @go="go" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'
import { ic, duo } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

const props = defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()

if (!f.answers[props.screen.id]) f.answers[props.screen.id] = []
const picked = computed(() => f.answers[props.screen.id])
// Sin contador: el botón dice siempre CONTINUE, haya o no selección
const contLabel = computed(() => f.T(['CONTINUE', 'Continuar']))

function toggle (o) {
  const a = picked.value
  a.includes(o) ? a.splice(a.indexOf(o), 1) : a.push(o)
}
function go () { if (picked.value.length) f.next() }
</script>
