<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VCard class="table-container">
    <VDataTableVirtual
      :headers="tableHeaders"
      :items="tableItems"
      :search="search"
      fixed-header
      hide-actions
      hover
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-center">
          <VBtn
            icon="mdi-pencil"
            size="24"
            variant="plain"
            @click="openEntityEditor(entity, item.id)"
          >
            <VIcon size="24"></VIcon>
          </VBtn>

          <VBtn
            icon="mdi-delete-outline"
            size="24"
            variant="plain"
            @click="
              areYouSure({
                onAgree: () => deleteEntity(entity, item.id, currentModelId),
                message: `Delete ${entity}. Are you sure?`,
              })
            "
          >
            <VIcon size="24"></VIcon>
          </VBtn></div
      ></template>
    </VDataTableVirtual>
  </VCard>
</template>

<script setup lang="ts">
import { useApi } from '@/api'
import type { ConstructorEntity } from '@/models'
import { useConfirmStore } from '@/stores/confirmStore'
import { useConstructorStore } from '@/stores/constructorStore'
import type { DataTableHeader } from 'vuetify'

defineProps<{
  entity: ConstructorEntity
  currentModelId?: string
  tableHeaders: DataTableHeader[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableItems: readonly any[]
  search: string
}>()
const { deleteEntity } = useApi()

const modalStore = useConstructorStore()
const { openEntityEditor } = modalStore

const confirmStore = useConfirmStore()
const { areYouSure } = confirmStore
</script>

<style scoped lang="scss">
.table-container {
  height: calc(100vh - 280px);
  padding: 0;
  display: flex;
  margin-top: 20px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
