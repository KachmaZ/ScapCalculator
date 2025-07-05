<template>
  <VApp>
    <AppLayout>
      <RouterView />
    </AppLayout>
    <ModalCommon />
  </VApp>
</template>
<script setup lang="ts">
import ModalCommon from '@/components/ModalWindow/ModalCommon.vue'
import AppLayout from '@/layout/AppLayout.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss"></style>
