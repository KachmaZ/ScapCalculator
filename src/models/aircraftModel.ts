import type {
  AircraftAltCap,
  AircraftClimb,
  AircraftCruise,
  AircraftDescent,
  AircraftHold,
  AircraftUnits,
} from './aircraftModelEntities'
import type { AircraftInfo } from './aircraftModelInfo'
import type { SCID } from './general'

export interface AircraftModel {
  id: SCID
  info: AircraftInfo
  units: AircraftUnits
  altitudeCapability: AircraftAltCap[]
  climb: AircraftClimb[]
  cruise: AircraftCruise[]
  descent: AircraftDescent[]
  hold: AircraftHold[]
}

export interface AircraftModelType {
  id: SCID
  name: string
  icao: string
  iata: string
}

export interface AircraftModelSubtype {
  id: SCID
  name: string
  engines: number
  typeIcao: string
}
