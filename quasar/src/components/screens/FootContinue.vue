<template>
  <Teleport to="#foot">
    <div class="finner">
      <button id="cont" class="btn btn-primary" :disabled="disabled" v-html="inner" @click="$emit('go')" />
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { ic } from 'assets/graphics'

const props = defineProps({ label: { type: String, required: true }, disabled: Boolean })
defineEmits(['go'])
const inner = computed(() => `<span>${props.label}</span>` + ic('arrowright'))
</script>
