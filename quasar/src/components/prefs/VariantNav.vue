<template>
  <nav class="vnav">
    <router-link to="/preferences" class="vn" :class="{ cur: cur === 0 }">A</router-link>
    <router-link v-for="i in 10" :key="i" :to="`/preferences/v${i}`" class="vn" :class="{ cur: cur === i }">v{{ i }}</router-link>
  </nav>
</template>

<script setup>
defineProps({ cur: { type: Number, default: 0 } })
</script>

<style scoped>
.vnav{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);display:flex;gap:4px;background:#fff;border:1px solid #E3E8F2;border-radius:999px;padding:5px 8px;box-shadow:0 8px 30px rgba(15,30,80,.18);z-index:999}
.vn{font-size:12.5px;font-weight:700;color:#5A6B8C;text-decoration:none;padding:5px 9px;border-radius:999px;line-height:1}
.vn:hover{background:#F0F4FB;color:#0A1F44}
.vn.cur{background:#007AFF;color:#fff}
@media(max-width:640px){.vnav{max-width:94vw;overflow-x:auto}}
</style>
