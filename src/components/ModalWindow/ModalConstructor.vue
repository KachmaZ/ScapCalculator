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
            <h4 class="text-h4 text-center">
              {{ editMode ? 'Edit' : 'Add' }} {{ currentEntitySchema.title }}
            </h4>
            <VRow
              v-for="field in currentEntitySchema.fields"
              :key="field.draftKey"
              class="d-flex align-center"
            >
              <VCol cols="4">
                <b>{{ field.label }}:</b>
              </VCol>
              <VCol cols="8">
                <StringInput
                  v-if="field.inputType === 'string'"
                  class="constructor__input"
                  v-model="currentDraftObject[field.draftKey as keyof ConstructorDraft]"
                />
                <NumberInput
                  v-if="field.inputType === 'number'"
                  class="constructor__input"
                  v-model="currentDraftObject[field.draftKey as keyof ConstructorDraft]"
                />
                <CheckboxInput
                  v-if="field.inputType === 'checkbox'"
                  class="constructor__input"
                  v-model="currentDraftObject[field.draftKey as keyof ConstructorDraft]"
                />
              </VCol>
            </VRow>
          </VTabsWindowItem>
          <VTabsWindowItem value="import">
            <h4 class="text-h4 text-center">Import {{ currentEntity }}</h4>
            <VFileUpload
              multiple
              density="compact"
              variant="outlined"
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12"
              v-model="importedFiles"
            />
          </VTabsWindowItem>
        </VTabsWindow>
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
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useApi } from '@/api'
import { useRoute } from 'vue-router'
import { useModelsStore } from '@/stores/modelsStore'
import type { AircraftEntity, AircraftEntityName, ConstructorDraft } from '@/models'
import { useConfirmStore } from '@/stores/confirmStore'
import StringInput from '@/components/CustomInputs/StringInput.vue'
import NumberInput from '@/components/CustomInputs/NumberInput.vue'
import CheckboxInput from '@/components/CustomInputs/CheckboxInput.vue'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

interface DraftSchema {
  title: string
  fields: {
    label: string
    inputType: 'string' | 'number' | 'checkbox' | 'select' | 'date' | 'none'
    draftKey: string
    defaultValue: string | number | boolean
    options?: unknown[]
  }[]
}

const { addEntity, editEntity, importFiles } = useApi()
const { areYouSure } = useConfirmStore()
// const modelID = useRoute().params.id
const route = useRoute()

// реактивное значение, всегда соответствует текущему маршруту
const modelID = computed(() => route.params.id as string | undefined)

const constructorStore = useConstructorStore()
const { isOpened, currentEntity, currentEditingID, editMode, importedFiles } =
  storeToRefs(constructorStore)
const { resetConstructor } = constructorStore

const modelsStore = useModelsStore()
const { currentModel, typesList, subtypesList } = storeToRefs(modelsStore)

const tab = ref('add')
// const currentDraftObject = ref<ConstructorDraft>(<ConstructorDraft>{})
const currentDraftObject = ref<Record<string, unknown>>({})

const handleConfirm = () => {
  if (tab.value === 'add') {
    if (!editMode.value) {
      areYouSure({
        onAgree: () => {
          addEntity(
            currentEntity.value,
            currentDraftObject.value as ConstructorDraft,
            String(modelID.value),
          )
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
            currentDraftObject.value as ConstructorDraft,
            String(modelID.value),
          )
          resetConstructor()
        },
        message: 'Do you want to accept new params?',
      })
    }
  } else {
    areYouSure({
      onAgree: async () => {
        await importFiles(importedFiles.value)
        resetConstructor()
      },
      message: 'Do you want to import chosen files?',
    })
  }
}

const entityDraftSchema: Record<string, DraftSchema> = {
  type: {
    title: 'Type',
    fields: [
      {
        label: 'Name',
        inputType: 'string',
        draftKey: 'name',
        defaultValue: '',
      },
      {
        label: 'ICAO',
        inputType: 'string',
        draftKey: 'icao',
        defaultValue: '',
      },
      {
        label: 'IATA',
        inputType: 'string',
        draftKey: 'iata',
        defaultValue: '',
      },
    ],
  },

  subtype: {
    title: 'Subtype',
    fields: [
      {
        label: 'Name',
        inputType: 'string',
        draftKey: 'name',
        defaultValue: '',
      },
      {
        label: 'Type ICAO',
        inputType: 'string',
        draftKey: 'typeIcao',
        defaultValue: '',
      },
      {
        label: 'Engines',
        inputType: 'number',
        draftKey: 'engines',
        defaultValue: 0,
      },
    ],
  },

  climb: {
    title: 'Climb',
    fields: [
      {
        label: 'Name',
        inputType: 'string',
        draftKey: 'ModeName',
        defaultValue: '',
      },
      {
        label: 'Cost Index',
        inputType: 'number',
        draftKey: 'CostIndex',
        defaultValue: 0,
      },
      {
        label: 'Engine in operate',
        inputType: 'number',
        draftKey: 'EngineInOperate',
        defaultValue: 0,
      },
      {
        label: 'Emergency',
        inputType: 'checkbox',
        draftKey: 'ModeEmerg',
        defaultValue: false,
      },
      {
        label: 'SpecOps',
        inputType: 'checkbox',
        draftKey: 'SpecialOpsMode',
        defaultValue: false,
      },
      {
        label: 'ISA',
        inputType: 'checkbox',
        draftKey: 'ISA',
        defaultValue: false,
      },
      {
        label: 'Wind',
        inputType: 'checkbox',
        draftKey: 'Wind',
        defaultValue: false,
      },
      {
        label: 'Degradation factor',
        inputType: 'checkbox',
        draftKey: 'DegradationFactor',
        defaultValue: false,
      },
      {
        label: 'Mode Type',
        inputType: 'none',
        draftKey: 'ModeType',
        defaultValue: 'climb',
      },
    ],
  },
  cruise: {
    title: 'Cruise',
    fields: [
      {
        label: 'Name',
        inputType: 'string',
        draftKey: 'ModeName',
        defaultValue: '',
      },
      {
        label: 'Cost Index',
        inputType: 'number',
        draftKey: 'CostIndex',
        defaultValue: 0,
      },
      {
        label: 'Engine in operate',
        inputType: 'number',
        draftKey: 'EngineInOperate',
        defaultValue: 0,
      },
      {
        label: 'Emergency',
        inputType: 'checkbox',
        draftKey: 'ModeEmerg',
        defaultValue: false,
      },
      {
        label: 'SpecOps',
        inputType: 'checkbox',
        draftKey: 'SpecialOpsMode',
        defaultValue: false,
      },
      {
        label: 'Mach Calculation',
        inputType: 'checkbox',
        draftKey: 'MachCalculation',
        defaultValue: false,
      },
      {
        label: 'ISA',
        inputType: 'checkbox',
        draftKey: 'ISA',
        defaultValue: false,
      },
      {
        label: 'Wind',
        inputType: 'checkbox',
        draftKey: 'Wind',
        defaultValue: false,
      },
      {
        label: 'IAS',
        inputType: 'checkbox',
        draftKey: 'IAS',
        defaultValue: false,
      },
      {
        label: 'Degradation factor',
        inputType: 'checkbox',
        draftKey: 'DegradationFactor',
        defaultValue: false,
      },
      {
        label: 'Mode Type',
        inputType: 'none',
        draftKey: 'ModeType',
        defaultValue: 'cruise',
      },
    ],
  },
  descent: {
    title: 'Descent',
    fields: [
      {
        label: 'Name',
        inputType: 'string',
        draftKey: 'ModeName',
        defaultValue: '',
      },
      {
        label: 'Cost Index',
        inputType: 'number',
        draftKey: 'CostIndex',
        defaultValue: 0,
      },
      {
        label: 'Engine in operate',
        inputType: 'number',
        draftKey: 'EngineInOperate',
        defaultValue: 0,
      },
      {
        label: 'Emergency',
        inputType: 'checkbox',
        draftKey: 'ModeEmerg',
        defaultValue: false,
      },
      {
        label: 'SpecOps',
        inputType: 'checkbox',
        draftKey: 'SpecialOpsMode',
        defaultValue: false,
      },
      {
        label: 'ISA',
        inputType: 'checkbox',
        draftKey: 'ISA',
        defaultValue: false,
      },
      {
        label: 'Wind',
        inputType: 'checkbox',
        draftKey: 'Wind',
        defaultValue: false,
      },
      {
        label: 'Degradation factor',
        inputType: 'checkbox',
        draftKey: 'DegradationFactor',
        defaultValue: false,
      },
      {
        label: 'Mode Type',
        inputType: 'none',
        draftKey: 'ModeType',
        defaultValue: 'descent',
      },
    ],
  },
  hold: {
    title: 'Hold',
    fields: [
      {
        label: 'Name',
        inputType: 'string',
        draftKey: 'ModeName',
        defaultValue: '',
      },
      {
        label: 'Cost Index',
        inputType: 'number',
        draftKey: 'CostIndex',
        defaultValue: 0,
      },
      {
        label: 'Engine in operate',
        inputType: 'number',
        draftKey: 'EngineInOperate',
        defaultValue: 0,
      },
      {
        label: 'Emergency',
        inputType: 'checkbox',
        draftKey: 'ModeEmerg',
        defaultValue: false,
      },
      {
        label: 'SpecOps',
        inputType: 'checkbox',
        draftKey: 'SpecialOpsMode',
        defaultValue: false,
      },
      {
        label: 'Mach Calculation',
        inputType: 'checkbox',
        draftKey: 'MachCalculation',
        defaultValue: false,
      },
      {
        label: 'ISA',
        inputType: 'checkbox',
        draftKey: 'ISA',
        defaultValue: false,
      },
      {
        label: 'Wind',
        inputType: 'checkbox',
        draftKey: 'Wind',
        defaultValue: false,
      },
      {
        label: 'IAS',
        inputType: 'checkbox',
        draftKey: 'IAS',
        defaultValue: false,
      },
      {
        label: 'Degradation factor',
        inputType: 'checkbox',
        draftKey: 'DegradationFactor',
        defaultValue: false,
      },
      {
        label: 'Mode Type',
        inputType: 'none',
        draftKey: 'ModeType',
        defaultValue: 'hold',
      },
    ],
  },
  altitudeCapability: {
    title: 'Altitude Capability',
    fields: [
      {
        label: 'Name',
        inputType: 'string',
        draftKey: 'ModeName',
        defaultValue: '',
      },
      {
        label: 'Cruise Mode',
        inputType: 'string',
        draftKey: 'CruiseMode',
        defaultValue: 0,
      },
      {
        label: 'Engine in operate',
        inputType: 'number',
        draftKey: 'EngineInOperate',
        defaultValue: 0,
      },
      {
        label: 'Emergency',
        inputType: 'checkbox',
        draftKey: 'ModeEmerg',
        defaultValue: false,
      },
      {
        label: 'SpecOps',
        inputType: 'checkbox',
        draftKey: 'SpecialOpsMode',
        defaultValue: false,
      },
      {
        label: 'ISA',
        inputType: 'checkbox',
        draftKey: 'ISA',
        defaultValue: false,
      },
      {
        label: 'Mode Type',
        inputType: 'none',
        draftKey: 'ModeType',
        defaultValue: 'altitudeCapability',
      },
    ],
  },
}

const currentEntitySchema = computed(() => {
  return entityDraftSchema[currentEntity.value!]
})

const getDraftObjectFromSchema = () => {
  currentEntitySchema.value.fields.map((field) => {
    currentDraftObject.value[field.draftKey] = field.defaultValue
  })
}

watch([currentEntity, currentEditingID], () => {
  if (currentEntity.value) {
    getDraftObjectFromSchema()
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
      default:
        if (modelID.value && currentEntity.value) {
          const target = currentModel.value[currentEntity.value as AircraftEntityName].find(
            (entity: AircraftEntity) => entity.id === currentEditingID.value,
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
