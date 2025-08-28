import type { ConstructorEntity, DraftObjects } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConstructorStore = defineStore('modal', () => {
  const isOpened = ref(false)
  const editMode = ref(false)
  const currentEntity = ref<ConstructorEntity>(null)
  const currentEditingID = ref<number | string | null>(null)
  const importedFiles = ref([])

  const draftObjects: DraftObjects = {
    altitudeCapability: {
      CruiseMode: '',
      EngineInOperate: 0,
      ISA: 'NO',
      ModeEmerg: 'NO',
      ModeID: 0,
      ModeInterpolation: 'NO',
      ModeName: '',
      ModeType: 'ALtCap',
      SpecialOpsMode: 'NO',
      CruiseCostIndex: 0,
    },
    climb: {
      CostIndex: 0,
      DegradationFactor: 'NO',
      EngineInOperate: 0,
      ISA: 'NO',
      ModeEmerg: 'NO',
      ModeID: 0,
      ModeInterpolation: 'NO',
      ModeName: '',
      ModeType: 'Climb',
      SpecialOpsMode: 'NO',
      Wind: 'NO',
    },
    cruise: {
      CostIndex: 0,
      DegradationFactor: 'NO',
      EngineInOperate: 0,
      IAS: 'NO',
      ISA: 'NO',
      MachCalculation: 'NO',
      ModeEmerg: 'NO',
      ModeID: 0,
      ModeInterpolation: 'NO',
      ModeName: '',
      ModeType: 'Cruise',
      SpecialOpsMode: 'NO',
      Wind: 'NO',
    },
    descent: {
      CostIndex: 0,
      DegradationFactor: 'NO',
      EngineInOperate: 0,
      ISA: 'NO',
      ModeEmerg: 'NO',
      ModeID: 0,
      ModeInterpolation: 'NO',
      ModeName: '',
      ModeType: 'Descent',
      SpecialOpsMode: 'NO',
      Wind: 'NO',
    },
    hold: {
      CostIndex: 0,
      DegradationFactor: 'NO',
      EngineInOperate: 0,
      IAS: 'NO',
      ISA: 'NO',
      MachCalculation: 'NO',
      ModeEmerg: 'NO',
      ModeID: 0,
      ModeInterpolation: 'NO',
      ModeName: '',
      ModeType: 'HOLD',
      SpecialOpsMode: 'NO',
      Wind: 'NO',
    },
    type: { name: '', icao: '', iata: '' },
    subtype: {
      name: '',
      typeIcao: '',
      engines: 0,
    },
  }

  const setModal = (newState: boolean) => {
    isOpened.value = newState
  }

  const resetConstructor = async () => {
    isOpened.value = false
    editMode.value = false

    currentEditingID.value = null
    currentEntity.value = null
    importedFiles.value = []
  }

  const openEntityConstructor = (entity: ConstructorEntity) => {
    currentEntity.value = entity
    editMode.value = false

    setModal(true)
  }

  const openEntityEditor = (entity: ConstructorEntity, id: string) => {
    currentEntity.value = entity
    currentEditingID.value = id
    editMode.value = true
    setModal(true)
  }

  return {
    isOpened,
    editMode,
    currentEntity,
    draftObjects,
    currentEditingID,
    importedFiles,

    resetConstructor,
    openEntityConstructor,
    openEntityEditor,
  }
})
