<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VTextField type="text" label="Search" prepend-inner-icon="mdi-magnify" v-model="search" />
  <AircraftEntityTable
    entity="type"
    :table-headers="headers"
    :table-items="items"
    :search="search"
  />
</template>

<script setup lang="ts">
import AircraftEntityTable from '@/components/AircraftEntityTable.vue'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const modelsStore = useModelsStore()
const { typesList: items } = storeToRefs(modelsStore)
const { getAircraftTypes } = modelsStore
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
