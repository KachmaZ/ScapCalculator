import type { AircraftModelType, AircraftModel, AircraftModelSubtype } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// MOCK!
import MOCK_MODEL from '@/mocks/data_model.json'

export const useModelsStore = defineStore('models', () => {
  const modelList = ref<AircraftModel[]>([])
  const currentModel = ref<AircraftModel>(<AircraftModel>{})
  const typesList = ref<AircraftModelType[]>([])
  const subtypesList = ref<AircraftModelSubtype[]>([])
  const enginesList = ref<{ id: number; name: string }[]>([])

  const setAircraftModels = (newModels: AircraftModel[], mockMode?: boolean) => {
    if (mockMode) {
      modelList.value = [MOCK_MODEL as AircraftModel]

      return
    }

    // Присваивание списка моделей. Значению modelList.value нужно присвоить массив объектов
    if (modelList.value.length === 0) {
      modelList.value = [...newModels]
    }
  }

  const setAircraftTypes = (newTypes: AircraftModelType[], mockMode?: boolean) => {
    if (mockMode) {
      typesList.value = [
        { id: 1, name: 'Boeing 737-800W', icao: 'Boeing 737-800W', iata: 'Boeing 737-800W' },
      ]
      return
    }

    // Присваивание списка типов. Значению typeList.value нужно присвоить массив объектов
    typesList.value = [...newTypes]
  }

  const setAircraftSubtypes = (newSubtypes: AircraftModelSubtype[], mockMode?: boolean) => {
    if (mockMode) {
      subtypesList.value = [
        { id: 1, typeIcao: 'B73H', name: 'Boeing 737-800W', engines: 2 },
        { id: 2, typeIcao: 'B738', name: 'Boeing 737-800', engines: 2 },
        { id: 3, typeIcao: 'B733', name: 'Boeing 737-300', engines: 2 },
      ]
      return
    }

    // Присваивание списка моделей. Значению subtypeslList.value нужно присвоить массив объектов
    subtypesList.value = [...newSubtypes]
  }

  const setAircraftCurrentModel = (newCurrentModel: AircraftModel) => {
    if (newCurrentModel) {
      currentModel.value = { ...newCurrentModel }
    }
  }

  const setAircraftEngines = (newEngines: { id: number; name: string }[]) => {
    if (newEngines) {
      enginesList.value = [...newEngines]
    }
  }

  return {
    modelList,
    currentModel,
    typesList,
    subtypesList,
    enginesList,

    setAircraftModels,
    setAircraftTypes,
    setAircraftSubtypes,
    setAircraftCurrentModel,
    setAircraftEngines,
  }
})
