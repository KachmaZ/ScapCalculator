<template>
  <VDialog
    v-model="isOpened"
    scrollable
    persistent
    max-width="300px"
    transition="dialog-transition"
  >
    <VCard class="pa-4">
      <h4 class="text-h4 text-center mb-4">{{ message }}</h4>
      <div class="d-flex justify-space-between">
        <VBtn width="100px" variant="flat" color="red" @click="handleNo">NO</VBtn>
        <VBtn width="100px" variant="flat" color="success" @click="handleYes">YES</VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirmStore'
import { storeToRefs } from 'pinia'

const confirmStore = useConfirmStore()
const { handleYes, handleNo, isOpened, message } = storeToRefs(confirmStore)
</script>

<style scoped></style>
