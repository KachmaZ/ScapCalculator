import type {
  AircraftAltCap,
  AircraftClimb,
  AircraftCruise,
  AircraftDescent,
  AircraftEntityName,
  AircraftHold,
  AircraftModelSubtype,
  AircraftModelType,
} from '@/models'

export interface DraftObjects {
  altitudeCapability: Omit<AircraftAltCap, 'id'>
  climb: Omit<AircraftClimb, 'id'>
  cruise: Omit<AircraftCruise, 'id'>
  descent: Omit<AircraftDescent, 'id'>
  hold: Omit<AircraftHold, 'id'>
  type: Omit<AircraftModelType, 'id'>
  subtype: Omit<AircraftModelSubtype, 'id'>
}

export type ConstructorEntity = null | 'type' | 'subtype' | 'engine' | AircraftEntityName
export type ConstructorDraft = DraftObjects[keyof DraftObjects]
