<template>
  <VTextField type="text" label="Search" v-model="search" prepend-inner-icon="mdi-magnify" />
  <VDataTableVirtual :headers="headers" :items="items" hover :loading="isLoading" :search="search">
    <template v-slot:item="{ item }">
      <tr @click="handleRowClick(item.id)">
        <td>{{ item.info.ModelTitle }}</td>
        <td>{{ item.info.AircraftSubTypeName }}</td>
        <td>{{ item.info.EngineType }}</td>
        <td class="text-center">{{ item.info.ModelType }}</td>
        <td class="text-center">{{ item.info.FDPAFormatVersion }}</td>
        <td class="text-center">{{ item.info.FDPARevisionDate }}</td>
      </tr>
    </template>
  </VDataTableVirtual>
</template>

<script setup lang="ts">
import type { SCDataTableHeadersAlign } from '@/models'
import router from '@/router'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const handleRowClick = (modelID: string) => {
  router.push({ name: 'ModelsItem', params: { id: modelID } })
}
const headers = [
  { title: 'Model Name', key: 'info.ModelTitle', align: 'start' as SCDataTableHeadersAlign },
  {
    title: 'Aircraft SubType',
    key: 'info.AircraftSubTypeName',
    align: 'start' as SCDataTableHeadersAlign,
  },
  { title: 'Engine Type', key: 'info.EngineType', align: 'start' as SCDataTableHeadersAlign },
  { title: 'Model Type', key: 'info.ModelType', align: 'center' as SCDataTableHeadersAlign },
  {
    title: 'Format version',
    key: 'info.FDPARevisionDate',
    align: 'center' as SCDataTableHeadersAlign,
  },
  {
    title: 'FDPA revision date',
    key: 'fdpaRevisionDate',
    align: 'center' as SCDataTableHeadersAlign,
  },
]

const search = ref('')
const modelsStore = useModelsStore()
const { getAircraftModels } = modelsStore
const { modelList: items } = storeToRefs(modelsStore)

const isLoading = ref(true)

onMounted(async () => {
  setTimeout(() => {
    getAircraftModels()
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped></style>
