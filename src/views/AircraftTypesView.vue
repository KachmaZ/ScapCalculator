<template>
  <VContainer class="mx-a">
    <VRow>
      <VCol cols="12" class="pb-0">
        <VToolbar color="primary" rounded class="text-white">
          <VToolbarTitle class="text-h5">Aircraft Types</VToolbarTitle>
          <VBtn icon="mdi-plus" @click="openEntityConstructor(tab as ConstructorEntity)"></VBtn>
        </VToolbar>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" class="pt-0">
        <VCard variant="outlined" color="primary">
          <VTabs v-model="tab" color="primary" dark slider-color="primary" align-tabs="center">
            <VTab value="type"> Aircraft Types </VTab>
            <VTab value="subtype"> Aircraft Subtypes </VTab>
          </VTabs>
          <VTabsWindow v-model="tab">
            <VTabsWindowItem value="type">
              <TypesTable />
            </VTabsWindowItem>
            <VTabsWindowItem value="subtype">
              <SubtypesTable />
            </VTabsWindowItem>
          </VTabsWindow>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import SubtypesTable from '@/components/SubtypesTable.vue'
import TypesTable from '@/components/TypesTable.vue'
import type { ConstructorEntity } from '@/models'
import { useConstructorStore } from '@/stores/constructorStore'
import { ref } from 'vue'
const constructorStore = useConstructorStore()
const { openEntityConstructor } = constructorStore

const tab = ref('type')
</script>
