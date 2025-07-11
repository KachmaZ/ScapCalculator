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
  id: string
  info: AircraftInfo
  units: AircraftUnits
  altitudeCapability: AircraftAltCap[]
  climb: AircraftClimb[]
  cruise: AircraftCruise[]
  descent: AircraftDescent[]
  hold: AircraftHold[]
}

export interface AircraftModelType {
  id: string
  name: string
  ICAO: string
  IATA: string
}

export interface AircraftModelSubtype {
  id: string
  typeICAO: string
  name: string
  enginesCount: number
}
