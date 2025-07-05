<template>
  <AppHeader />
  <VMain>
    <slot />
  </VMain>
</template>

<script setup lang="ts">
import AppHeader from '@/layout/AppHeader.vue'
</script>

<style scoped></style>
