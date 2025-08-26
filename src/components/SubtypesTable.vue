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
import { useApi } from '@/api'
import AircraftEntityTable from '@/components/AircraftEntityTable.vue'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const { getEntities } = useApi()

const modelsStore = useModelsStore()
const { subtypesList: items } = storeToRefs(modelsStore)

const isLoading = ref(true)

const headers = [
  {
    title: 'Type ICAO',
    key: 'typeIcao',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Engines',
    key: 'engines',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const search = ref('')
onMounted(() => {
  getEntities('subtype').then(() => (isLoading.value = false))
})
</script>

<style scoped></style>
