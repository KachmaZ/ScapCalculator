<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VTextField type="text" label="Search" prepend-inner-icon="mdi-magnify" v-model="search" />
  <AircraftEntityTable
    entity="subtype"
    :table-headers="headers"
    :table-items="items"
    :search="search"
    density="compact"
  />
</template>

<script setup lang="ts">
import AircraftEntityTable from '@/components/AircraftEntityTable.vue'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const modelsStore = useModelsStore()
const { subtypesList: items } = storeToRefs(modelsStore)
const { getAircraftSubtypes } = modelsStore

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

const search = ref('')
onMounted(() => {
  setTimeout(() => {
    getAircraftSubtypes()
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped></style>
