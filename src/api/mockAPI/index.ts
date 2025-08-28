import type {
  AircraftModel,
  ConstructorDraft,
  ConstructorEntity,
  DraftObjects,
  SCCredentials,
  SCID,
} from '@/models'
import type { APIComposable } from '@/models/apiInterface'
import { useAuthStore } from '@/stores/authStore'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'

export const useMockApi: APIComposable = () => {
  const modelsStore = useModelsStore()
  const { modelList, typesList, subtypesList } = storeToRefs(modelsStore)
  const { setAircraftModels, setAircraftTypes, setAircraftSubtypes, setAircraftCurrentModel } =
    modelsStore

  const authStore = useAuthStore()
  const { logIn } = authStore

  const authenticate = async (credentials: SCCredentials) => {
    if (
      credentials.login === import.meta.env.VITE_ADMIN_LOGIN &&
      credentials.password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      logIn(credentials)
    }
  }

  const getEntities = async (entity: ConstructorEntity) => {
    switch (entity) {
      case 'type':
        setAircraftTypes([], true)
        break
      case 'subtype':
        setAircraftSubtypes([], true)
    }
  }

  const addEntity = async (entity: ConstructorEntity, draft: ConstructorDraft, modelID?: SCID) => {
    const editingModelIndex = modelList.value.findIndex((model) => String(model.id) === modelID)

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
      case 'altitudeCapability':
        if (modelID) {
          modelList.value[editingModelIndex].altitudeCapability.push({
            id: crypto.randomUUID(),
            ...(draft as Omit<DraftObjects['altitudeCapability'], 'id'>),
          })
        }
        break
    }
  }

  const editEntity = async (
    entity: ConstructorEntity,
    entityId: SCID,
    draft: ConstructorDraft,
    modelID?: SCID,
  ) => {
    const editingModelIndex = modelList.value.findIndex((model) => String(model.id) === modelID)

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
      case 'altitudeCapability':
        if (modelID) {
          const editingEntityIndex = modelList.value[
            editingModelIndex
          ].altitudeCapability.findIndex((ent) => ent.id === entityId)
          modelList.value[editingModelIndex].altitudeCapability[editingEntityIndex] = {
            ...modelList.value[editingModelIndex].altitudeCapability[editingEntityIndex],
            ...(draft as Omit<DraftObjects['altitudeCapability'], 'id'>),
          }
        }
        break
    }
  }

  const deleteEntity = async (entity: ConstructorEntity, entityId: SCID, modelID?: SCID) => {
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
      case 'altitudeCapability':
        if (modelID) {
          modelList.value[editingModelIndex].altitudeCapability = modelList.value[
            editingModelIndex
          ].altitudeCapability.filter((altitudeCapability) => altitudeCapability.id !== entityId)
        }
        break
    }
  }
  const getAircraftModels = async () => {
    setAircraftModels([], true)
  }

  const getAircraftModelByID = async (modelID: SCID) => {
    await getAircraftModels()

    setAircraftCurrentModel(
      modelList.value.find((model) => model.id === modelID) ?? <AircraftModel>{},
    )
  }

  const createAircraftModel = async (modelData: Omit<AircraftModel, 'id'>) => {
    modelList.value.push({ id: crypto.randomUUID(), ...modelData })
  }

  const updateAircraftModelByID = async (modelID: SCID, modelData: Omit<AircraftModel, 'id'>) => {
    const editedModelIndex = modelList.value.findIndex((model) => model.id === modelID)
    modelList.value[editedModelIndex] = { id: modelID, ...modelData }
  }

  const importFiles = async () => {}

  return {
    authenticate,

    getEntities,
    addEntity,
    editEntity,
    deleteEntity,

    getAircraftModels,
    getAircraftModelByID,
    createAircraftModel,
    updateAircraftModelByID,
    importFiles,
  }
}
