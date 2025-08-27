import type { SCBoolean } from './general'

export type AircraftEntityName = 'climb' | 'cruise' | 'descent' | 'hold' | 'altitudeCapability'

export type AircraftEntity =
  | AircraftAltCap
  | AircraftClimb
  | AircraftCruise
  | AircraftDescent
  | AircraftHold
export interface AircraftAltCap {
  id: string
  CruiseMode: string
  EngineInOperate: number
  ISA: SCBoolean
  ModeEmerg: SCBoolean
  ModeID: number
  ModeInterpolation: SCBoolean
  ModeName: string
  ModeType: 'ALtCap'
  SpecialOpsMode: SCBoolean
  CruiseCostIndex: number
}

export interface AircraftClimb {
  id: string
  CostIndex: number
  DegradationFactor: SCBoolean
  EngineInOperate: number
  ISA: SCBoolean
  ModeEmerg: SCBoolean
  ModeID: number
  ModeInterpolation: SCBoolean
  ModeName: string
  ModeType: 'Climb'
  SpecialOpsMode: SCBoolean
  Wind: SCBoolean
}

export interface AircraftCruise {
  id: string
  CostIndex: number
  DegradationFactor: SCBoolean
  EngineInOperate: number
  IAS: SCBoolean
  ISA: SCBoolean
  MachCalculation: SCBoolean
  ModeEmerg: SCBoolean
  ModeID: number
  ModeInterpolation: SCBoolean
  ModeName: string
  ModeType: 'Cruise'
  SpecialOpsMode: SCBoolean
  Wind: SCBoolean
}

export interface AircraftDescent {
  id: string
  CostIndex: number
  DegradationFactor: SCBoolean
  EngineInOperate: number
  ISA: SCBoolean
  ModeEmerg: SCBoolean
  ModeID: number
  ModeInterpolation: SCBoolean
  ModeName: string
  ModeType: 'Descent'
  SpecialOpsMode: SCBoolean
  Wind: SCBoolean
}

export interface AircraftHold {
  id: string
  CostIndex: number
  DegradationFactor: SCBoolean
  EngineInOperate: number
  IAS: SCBoolean
  ISA: SCBoolean
  MachCalculation: SCBoolean
  ModeEmerg: SCBoolean
  ModeID: number
  ModeInterpolation: SCBoolean
  ModeName: string
  ModeType: 'HOLD'
  SpecialOpsMode: SCBoolean
  Wind: SCBoolean
}

export interface AircraftUnits {
  altitude: string
  flightDistance: string
  verticalDistance: string
  horizontalSpeed: string
  temperature: string
  time: string
  verticalSpeed: string
  volume: string
  weight: string
  fuelFlow: string
  fuelFlowPerEngine: boolean
}
