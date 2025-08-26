<template>
  <VDialog
    v-model="isOpened"
    scrollable
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <VCard width="600px" class="pa-4">
      <div
        template
        v-if="currentEntity"
        class="modal-constructor d-flex flex-column justify-between h-100"
        tabindex="-1"
        @keydown.enter="handleConfirm"
      >
        <VTabs v-model="tab" v-if="!editMode" align-tabs="center" class="mb-4">
          <VTab value="add">Add</VTab>
          <VTab v-if="!['type', 'subtype'].includes(currentEntity)" value="import">Import </VTab>
        </VTabs>
        <VTabsWindow v-model="tab">
          <VTabsWindowItem value="add">
            <h4 class="text-h4 text-center">{{ editMode ? 'Edit' : 'Add' }} {{ currentEntity }}</h4>
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
                  class="constructor__input"
                  type="text"
                  hide-details
                  v-model="currentDraftObject[key as keyof ConstructorDraft]"
                  density="compact"
                />
              </VCol>
            </VRow>
          </VTabsWindowItem>
          <VTabsWindowItem value="import">
            <h4 class="text-h4 text-center">Import {{ currentEntity }}</h4>
            <VFileInput /> </VTabsWindowItem
        ></VTabsWindow>
        <div class="d-flex justify-space-between mt-4">
          <VBtn color="red" @click="resetConstructor()">Cancel</VBtn>
          <VBtn color="primary" type="submit" @click="handleConfirm">Confirm</VBtn>
        </div>
      </div>
      <h4 v-else class="text-h4 text-center">No entity :(</h4>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
// eslint-disable @typescript-eslint/no-unused-vars
import { useConstructorStore } from '@/stores/constructorStore'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useApi } from '@/api'
import { useRoute } from 'vue-router'
import { useModelsStore } from '@/stores/modelsStore'
import type { ConstructorDraft, DraftObjects } from '@/models'
import { useConfirmStore } from '@/stores/confirmStore'

const { addEntity, editEntity } = useApi()
const { areYouSure } = useConfirmStore()
const modelID = useRoute().params.id

const constructorStore = useConstructorStore()
const { isOpened, currentEntity, currentEditingID, editMode } = storeToRefs(constructorStore)
const { draftObjects, resetConstructor } = constructorStore

const modelsStore = useModelsStore()
const { modelList, typesList, subtypesList } = storeToRefs(modelsStore)

const tab = ref('add')
const currentDraftObject = ref<ConstructorDraft>(<ConstructorDraft>{})

const handleConfirm = () => {
  if (tab.value === 'add') {
    if (!editMode.value) {
      areYouSure({
        onAgree: () => {
          addEntity(currentEntity.value, currentDraftObject.value, String(modelID))
          resetConstructor()
        },
        message: `Do you want to create new ${currentEntity.value}?`,
      })
    } else {
      areYouSure({
        onAgree: () => {
          editEntity(
            currentEntity.value,
            currentEditingID.value!,
            currentDraftObject.value,
            String(modelID),
          )
          resetConstructor()
        },
        message: 'Do you want to accept new params?',
      })
    }
  } else {
    alert('Import file!')
    resetConstructor()
  }
}

watch([currentEntity, currentEditingID], () => {
  if (currentEntity.value) {
    currentDraftObject.value = { ...draftObjects[currentEntity.value as keyof DraftObjects] }
  }

  if (editMode.value) {
    // Поиск редактируемого элемента
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

watch(isOpened, () => {
  if (isOpened.value === false) {
    resetConstructor()
  }
})
</script>

<style scoped></style>
