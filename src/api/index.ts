import type { AircraftModel } from '@/models'
import {
  type ConstructorDraft,
  type ConstructorEntity,
  type DraftObjects,
} from '@/stores/modalStore'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'

export const useApi = () => {
  const modelsStore = useModelsStore()
  const { modelList, typesList, subtypesList } = storeToRefs(modelsStore)

  const addEntity = (entity: ConstructorEntity, draft: ConstructorDraft, modelID?: string) => {
    const editingModelIndex = modelList.value.findIndex((model) => model.id === modelID)

    switch (entity) {
      case 'type':
        typesList.value.push({
          id: crypto.randomUUID(),
          ...(draft as Omit<DraftObjects['type'], 'id'>),
        })
        break

      case 'subtype':
        subtypesList.value.push({
          id: crypto.randomUUID(),
          ...(draft as Omit<DraftObjects['subtype'], 'id'>),
        })
        break
      case 'climb':
        if (modelID) {
          modelList.value[editingModelIndex].climb.push({
            id: crypto.randomUUID(),
            ...(draft as Omit<DraftObjects['climb'], 'id'>),
          })
        }
        break
      case 'cruise':
        if (modelID) {
          modelList.value[editingModelIndex].cruise.push({
            id: crypto.randomUUID(),
            ...(draft as Omit<DraftObjects['cruise'], 'id'>),
          })
        }
        break
      case 'descent':
        if (modelID) {
          modelList.value[editingModelIndex].descent.push({
            id: crypto.randomUUID(),
            ...(draft as Omit<DraftObjects['descent'], 'id'>),
          })
        }
        break
      case 'hold':
        if (modelID) {
          modelList.value[editingModelIndex].hold.push({
            id: crypto.randomUUID(),
            ...(draft as Omit<DraftObjects['hold'], 'id'>),
          })
        }
        break
      case 'altCap':
        if (modelID) {
          modelList.value[editingModelIndex].altitudeCapability.push({
            id: crypto.randomUUID(),
            ...(draft as Omit<DraftObjects['altCap'], 'id'>),
          })
        }
        break
    }
  }

  const editEntity = (
    entity: ConstructorEntity,
    entityId: string,
    draft: ConstructorDraft,
    modelID?: string,
  ) => {
    const editingModelIndex = modelList.value.findIndex((model) => model.id === modelID)

    switch (entity) {
      case 'type': {
        const entityIndex = typesList.value.findIndex((type) => type.id === entityId)

        typesList.value[entityIndex] = {
          ...typesList.value[entityIndex],
          ...(draft as Omit<DraftObjects['type'], 'id'>),
        }
        break
      }
      case 'subtype':
        const entityIndex = subtypesList.value.findIndex((type) => type.id === entityId)

        subtypesList.value[entityIndex] = {
          ...subtypesList.value[entityIndex],
          ...(draft as Omit<DraftObjects['subtype'], 'id'>),
        }
        break
      case 'climb':
        if (modelID) {
          const editingEntityIndex = modelList.value[editingModelIndex][entity].findIndex(
            (ent) => ent.id === entityId,
          )
          modelList.value[editingModelIndex][entity][editingEntityIndex] = {
            ...modelList.value[editingModelIndex][entity][editingEntityIndex],
            ...(draft as Omit<DraftObjects['climb'], 'id'>),
          }
        }
        break
      case 'cruise':
        if (modelID) {
          const editingEntityIndex = modelList.value[editingModelIndex][entity].findIndex(
            (ent) => ent.id === entityId,
          )
          modelList.value[editingModelIndex][entity][editingEntityIndex] = {
            ...modelList.value[editingModelIndex][entity][editingEntityIndex],
            ...(draft as Omit<DraftObjects['cruise'], 'id'>),
          }
        }
        break
      case 'descent':
        if (modelID) {
          const editingEntityIndex = modelList.value[editingModelIndex][entity].findIndex(
            (ent) => ent.id === entityId,
          )
          modelList.value[editingModelIndex][entity][editingEntityIndex] = {
            ...modelList.value[editingModelIndex][entity][editingEntityIndex],
            ...(draft as Omit<DraftObjects['descent'], 'id'>),
          }
        }
        break
      case 'hold':
        if (modelID) {
          const editingEntityIndex = modelList.value[editingModelIndex][entity].findIndex(
            (ent) => ent.id === entityId,
          )
          modelList.value[editingModelIndex][entity][editingEntityIndex] = {
            ...modelList.value[editingModelIndex][entity][editingEntityIndex],
            ...(draft as Omit<DraftObjects['hold'], 'id'>),
          }
        }
        break
      case 'altCap':
        if (modelID) {
          const editingEntityIndex = modelList.value[
            editingModelIndex
          ].altitudeCapability.findIndex((ent) => ent.id === entityId)
          modelList.value[editingModelIndex].altitudeCapability[editingEntityIndex] = {
            ...modelList.value[editingModelIndex].altitudeCapability[editingEntityIndex],
            ...(draft as Omit<DraftObjects['altCap'], 'id'>),
          }
        }
        break
    }
  }

  const deleteEntity = (entity: ConstructorEntity, entityId: string, modelID?: string) => {
    const editingModelIndex = modelList.value.findIndex((model) => model.id === modelID)

    switch (entity) {
      case 'type':
        typesList.value = typesList.value.filter((type) => type.id !== entityId)
        break

      case 'subtype':
        subtypesList.value = subtypesList.value.filter((subtype) => subtype.id !== entityId)
        break
      case 'climb':
        if (modelID) {
          modelList.value[editingModelIndex].climb = modelList.value[
            editingModelIndex
          ].climb.filter((climb) => climb.id !== entityId)
        }
        break
      case 'cruise':
        if (modelID) {
          modelList.value[editingModelIndex].cruise = modelList.value[
            editingModelIndex
          ].cruise.filter((cruise) => cruise.id !== entityId)
        }
        break
      case 'descent':
        if (modelID) {
          modelList.value[editingModelIndex].descent = modelList.value[
            editingModelIndex
          ].descent.filter((descent) => descent.id !== entityId)
        }
        break
      case 'hold':
        if (modelID) {
          modelList.value[editingModelIndex].hold = modelList.value[editingModelIndex].hold.filter(
            (hold) => hold.id !== entityId,
          )
        }
        break
      case 'altCap':
        if (modelID) {
          modelList.value[editingModelIndex].altitudeCapability = modelList.value[
            editingModelIndex
          ].altitudeCapability.filter((altCap) => altCap.id !== entityId)
        }
        break
    }
  }

  const createAircraftModel = (modelData: Omit<AircraftModel, 'id'>) => {
    modelList.value.push({ id: crypto.randomUUID(), ...modelData })
  }

  const updateAircraftModelByID = (modelID: string, modelData: Omit<AircraftModel, 'id'>) => {
    const editedModelIndex = modelList.value.findIndex((model) => model.id === modelID)
    modelList.value[editedModelIndex] = { id: modelID, ...modelData }
  }

  return {
    addEntity,
    editEntity,
    deleteEntity,
    createAircraftModel,
    updateAircraftModelByID,
  }
}
