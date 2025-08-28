import type {
  AircraftModel,
  ConstructorDraft,
  ConstructorEntity,
  SCCredentials,
  SCID,
} from '@/models'

export type APIComposable = () => APIComposableFunctions

interface APIComposableFunctions {
  authenticate: (credentials: SCCredentials) => Promise<void>

  getEntities: (entity: ConstructorEntity) => Promise<void>
  addEntity: (entity: ConstructorEntity, draft: ConstructorDraft, modelID?: SCID) => Promise<void>
  editEntity: (
    entity: ConstructorEntity,
    entityId: SCID,
    draft: ConstructorDraft,
    modelID?: SCID,
  ) => Promise<void>
  deleteEntity: (entity: ConstructorEntity, entityId: SCID, modelID?: SCID) => Promise<void>

  getAircraftModels: () => Promise<void>
  getAircraftModelByID: (modelID: SCID) => Promise<void>
  createAircraftModel: (modelData: Omit<AircraftModel, 'id'>) => Promise<void>
  updateAircraftModelByID: (modelID: SCID, modelData: Omit<AircraftModel, 'id'>) => Promise<void>
  importFiles: (files: unknown[]) => Promise<void>
}
