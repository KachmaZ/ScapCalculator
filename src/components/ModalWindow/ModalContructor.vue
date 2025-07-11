<template>
  <div class="modal-constructor d-flex flex-column justify-between h-100">
    <template v-if="entity">
      <VTabs v-model="tab" v-if="!editMode" align-tabs="center" class="mb-4">
        <VTab value="add">Add</VTab>
        <VTab value="import">Import </VTab>
      </VTabs>
      <VTabsWindow v-model="tab">
        <VTabsWindowItem value="add">
          <h4 class="text-h4 text-center">{{ editMode ? 'Edit' : 'Add' }} {{ entity }}</h4>
          <VRow
            v-for="key in Object.keys(currentDraftObject)"
            :key="key"
            class="d-flex align-center"
          >
            <VCol cols="4">
              <b>{{ key }}:</b>
            </VCol>
            <VCol cols="8">
              <VTextField
                type="text"
                hide-details
                v-model="currentDraftObject[key as keyof ConstructorDraft]"
              />
            </VCol>
          </VRow>
        </VTabsWindowItem>
        <VTabsWindowItem value="import">
          <h4 class="text-h4 text-center">Import {{ entity }}</h4>
          <VFileInput /> </VTabsWindowItem
      ></VTabsWindow>
      <div class="d-flex justify-center mt-4">
        <VBtn color="primary" @click="handleConfirm">Confirm</VBtn>
      </div>
    </template>
    <h4 v-else class="text-h4 text-center">No entity :(</h4>
  </div>
</template>

<script setup lang="ts">
// eslint-disable @typescript-eslint/no-unused-vars
import { useModalStore } from '@/stores/modalStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useApi } from '@/api'
import { useRoute } from 'vue-router'
import { useModelsStore } from '@/stores/modelsStore'
import type { ConstructorDraft, DraftObjects } from '@/models'

const props = defineProps<{
  entity: string | null
}>()

const { addEntity, editEntity } = useApi()
const modelID = useRoute().params.id

const modalStore = useModalStore()
const { currentEntity, currentEditingID, editMode } = storeToRefs(modalStore)
const { draftObjects, resetModal } = modalStore

const modelsStore = useModelsStore()
const { modelList, typesList, subtypesList } = storeToRefs(modelsStore)

const tab = ref('add')
const currentDraftObject = ref<ConstructorDraft>(<ConstructorDraft>{})

const handleConfirm = () => {
  if (tab.value === 'add') {
    if (!editMode.value) {
      addEntity(currentEntity.value, currentDraftObject.value, String(modelID))
    } else {
      editEntity(
        currentEntity.value,
        currentEditingID.value!,
        currentDraftObject.value,
        String(modelID),
      )
    }
  } else {
    alert('Import file!')
  }
  resetModal()
}

onMounted(() => {
  if (props.entity) {
    currentDraftObject.value = draftObjects[props.entity as keyof DraftObjects]
  }

  if (editMode.value) {
    switch (currentEntity.value) {
      case 'type': {
        const target = typesList.value.find((type) => type.id === currentEditingID.value)
        if (target) {
          const { id: _, ...editObject } = target
          currentDraftObject.value = { ...currentDraftObject.value, ...editObject }
        }
        break
      }
      case 'subtype': {
        const target = subtypesList.value.find((type) => type.id === currentEditingID.value)
        if (target) {
          const { id: _, ...editObject } = target
          currentDraftObject.value = { ...currentDraftObject.value, ...editObject }
        }
        break
      }
      case 'altitudeCapability': {
        if (modelID && currentEntity.value) {
          const modelIndex = modelList.value.findIndex((model) => model.id === modelID)

          const target = modelList.value[modelIndex].altitudeCapability.find(
            (entity) => entity.id === currentEditingID.value,
          )
          if (target) {
            const { id: _, ...editObject } = target

            currentDraftObject.value = {
              ...currentDraftObject.value,
              ...editObject,
            }
          }
        }
        break
      }
      default:
        if (modelID && currentEntity.value) {
          const modelIndex = modelList.value.findIndex((model) => model.id === modelID)
          const target = modelList.value[modelIndex][currentEntity.value].find(
            (entity) => entity.id === currentEditingID.value,
          )
          if (target) {
            const { id: _, ...editObject } = target

            currentDraftObject.value = {
              ...currentDraftObject.value,
              ...editObject,
            }
          }
        }
        break
    }
  }
})
</script>

<style scoped></style>
