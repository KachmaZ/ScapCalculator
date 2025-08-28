import type { AircraftModel, ConstructorDraft, ConstructorEntity, SCCredentials } from '@/models'

export type APIComposable = () => APIComposableFunctions

interface APIComposableFunctions {
  authenticate: (credentials: SCCredentials) => Promise<void>

  getEntities: (entity: ConstructorEntity) => Promise<void>
  addEntity: (
    entity: ConstructorEntity,
    draft: ConstructorDraft,
    modelID?: string | number,
  ) => Promise<void>
  editEntity: (
    entity: ConstructorEntity,
    entityId: string | number,
    draft: ConstructorDraft,
    modelID?: string,
  ) => Promise<void>
  deleteEntity: (
    entity: ConstructorEntity,
    entityId: string | number,
    modelID?: string,
  ) => Promise<void>

  getAircraftModels: () => Promise<void>
  getAircraftModelByID: (modelID: string | number) => Promise<void>
  createAircraftModel: (modelData: Omit<AircraftModel, 'id'>) => Promise<void>
  updateAircraftModelByID: (
    modelID: string | number,
    modelData: Omit<AircraftModel, 'id'>,
  ) => Promise<void>
}
