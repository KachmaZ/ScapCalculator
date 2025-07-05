import type { AircraftModelType, AircraftModel, AircraftModelSubtype } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// MOCK!
import MOCK_MODEL from '@/mocks/data_model.json'

export const useModelsStore = defineStore('models', () => {
  const modelList = ref<AircraftModel[]>([])
  const typesList = ref<AircraftModelType[]>([])
  const subtypesList = ref<AircraftModelSubtype[]>([])

  const getAircraftModels = () => {
    // Запрос списка моделей. Значению modelList.value нужно присвоить массив объектов
    if (modelList.value.length === 0) {
      modelList.value = [MOCK_MODEL as AircraftModel]
    }
  }

  const getAircraftTypes = () => {
    // Запрос списка типов. Значению typeList.value нужно присвоить массив объектов
    typesList.value = [
      { id: '1', name: 'Boeing 737-800W', ICAO: 'Boeing 737-800W', IATA: 'Boeing 737-800W' },
    ]
  }

  const getAircraftSubtypes = () => {
    // Запрос списка моделей. Значению subtypeslList.value нужно присвоить массив объектов
    subtypesList.value = [
      { id: '1', typeICAO: 'B73H', name: 'Boeing 737-800W', enginesCount: 2 },
      { id: '2', typeICAO: 'B738', name: 'Boeing 737-800', enginesCount: 2 },
      { id: '3', typeICAO: 'B733', name: 'Boeing 737-300', enginesCount: 2 },
    ]
  }

  const getAircraftModelByID = (modelID: string): AircraftModel | undefined => {
    // Запрос ОДНОЙ модели по айдишнику. По идее, должно работать, если работает получение списка. Можно заменить на запрос.
    // Нужно вернуть объект
    getAircraftModels()
    return modelList.value.find((item) => item.id === modelID)
  }

  const createAircraftModel = (modelData: Omit<AircraftModel, 'id'>) => {
    modelList.value.push({ id: crypto.randomUUID(), ...modelData })
  }

  const updateAircraftModelByID = (modelID: string, modelData: Omit<AircraftModel, 'id'>) => {
    const editedModelIndex = modelList.value.findIndex((model) => model.id === modelID)
    modelList.value[editedModelIndex] = { id: modelID, ...modelData }
  }

  return {
    modelList,
    typesList,
    subtypesList,

    getAircraftModels,
    getAircraftTypes,
    getAircraftSubtypes,
    getAircraftModelByID,
    createAircraftModel,
    updateAircraftModelByID,
  }
})
