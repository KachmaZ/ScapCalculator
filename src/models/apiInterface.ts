import type { AircraftModel, ConstructorDraft, ConstructorEntity, SCCredentials } from '@/models'

export type APIComposable = () => APIComposableFunctions

interface APIComposableFunctions {
  authenticate: (credentials: SCCredentials) => Promise<void>
  addEntity: (entity: ConstructorEntity, draft: ConstructorDraft, modelID?: string) => Promise<void>
  editEntity: (
    entity: ConstructorEntity,
    entityId: string,
    draft: ConstructorDraft,
    modelID?: string,
  ) => Promise<void>
  deleteEntity: (entity: ConstructorEntity, entityId: string, modelID?: string) => Promise<void>
  createAircraftModel: (modelData: Omit<AircraftModel, 'id'>) => Promise<void>
  updateAircraftModelByID: (modelID: string, modelData: Omit<AircraftModel, 'id'>) => Promise<void>
}
