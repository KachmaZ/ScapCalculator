<template>
  <VContainer class="mx-a">
    <VToolbar color="primary" rounded class="text-white">
      <VToolbarTitle class="text-h5">Aircraft Models</VToolbarTitle>
      <VBtn icon="mdi-plus" :to="{ name: 'ModelsConstructor' }"></VBtn>
    </VToolbar>
    <ModelsTable />
  </VContainer>
</template>

<script setup lang="ts">
import ModelsTable from '@/components/ModelsTable.vue'
</script>
