import type { ConstructorEntity, DraftObjects } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpened = ref(false)
  const editMode = ref(false)
  const currentEntity = ref<ConstructorEntity>(null)
  const currentEditingID = ref<string | null>(null)

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
    type: { name: '', ICAO: '', IATA: '' },
    subtype: {
      typeICAO: '',
      name: '',
      enginesCount: 0,
    },
  }

  const setModal = (newState: boolean) => {
    isOpened.value = newState
  }

  const resetModal = () => {
    isOpened.value = false
    editMode.value = false
    currentEditingID.value = null
    currentEntity.value = null
  }

  const openEntityConstructor = (entity: ConstructorEntity) => {
    currentEntity.value = entity
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

    resetModal,
    openEntityConstructor,
    openEntityEditor,
  }
})
