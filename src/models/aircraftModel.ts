import type {
  AircraftAltCap,
  AircraftClimb,
  AircraftCruise,
  AircraftDescent,
  AircraftHold,
  AircraftUnits,
} from './aircraftModelEntities'
import type { AircraftInfo } from './aircraftModelInfo'

export interface AircraftModel {
  id: string | number
  info: AircraftInfo
  units: AircraftUnits
  altitudeCapability: AircraftAltCap[]
  climb: AircraftClimb[]
  cruise: AircraftCruise[]
  descent: AircraftDescent[]
  hold: AircraftHold[]
}

export interface AircraftModelType {
  id: string | number
  name: string
  icao: string
  iata: string
}

export interface AircraftModelSubtype {
  id: string | number
  name: string
  engines: number
  typeIcao: string
}
