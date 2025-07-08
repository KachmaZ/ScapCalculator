<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VTextField type="text" label="Search" prepend-inner-icon="mdi-magnify" v-model="search" />
  <VDataTableVirtual :items="items" :loading="isLoading" hover :headers :search="search"
    ><template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-center">
        <VBtn
          icon="mdi-pencil"
          size="24"
          variant="plain"
          @click="openEntityEditor('type', item.id)"
        >
          <VIcon size="16"></VIcon>
        </VBtn>

        <VBtn
          icon="mdi-delete-outline"
          size="24"
          variant="plain"
          @click="deleteEntity('type', item.id)"
        >
          <VIcon size="16"></VIcon>
        </VBtn></div></template
  ></VDataTableVirtual>
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
const { typesList: items } = storeToRefs(modelsStore)
const { getAircraftTypes } = modelsStore

const { deleteEntity } = useApi()
const isLoading = ref(true)

const headers = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'ICAO',
    key: 'ICAO',
  },
  {
    title: 'IATA',
    key: 'IATA',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]
const search = ref('')
onMounted(() => {
  setTimeout(() => {
    getAircraftTypes()
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped></style>
