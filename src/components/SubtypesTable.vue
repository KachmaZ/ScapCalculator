<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VDataTableVirtual :items="items" :loading="isLoading" hover :headers="headers">
    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-center">
        <VBtn
          icon="mdi-pencil"
          size="24"
          variant="plain"
          @click="openEntityEditor('subtype', item.id)"
        >
          <VIcon size="16"></VIcon>
        </VBtn>

        <VBtn
          icon="mdi-delete-outline"
          size="24"
          variant="plain"
          @click="deleteEntity('subtype', item.id)"
        >
          <VIcon size="16"></VIcon>
        </VBtn>
      </div>
    </template>
  </VDataTableVirtual>
</template>

<script setup lang="ts">
import { useApi } from '@/api'
import { useModalStore } from '@/stores/modalStore'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const modalStore = useModalStore()
const { openEntityEditor } = modalStore

const modelsStore = useModelsStore()
const { subtypesList: items } = storeToRefs(modelsStore)
const { getAircraftSubtypes } = modelsStore

const { deleteEntity } = useApi()
const isLoading = ref(true)

const headers = [
  {
    title: 'Type ICAO',
    key: 'typeICAO',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Engines',
    key: 'enginesCount',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]
onMounted(() => {
  setTimeout(() => {
    getAircraftSubtypes()
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped></style>
