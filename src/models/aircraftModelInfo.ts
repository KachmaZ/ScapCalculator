export interface AircraftInfo {
  AircraftSubTypeName: string
  AircraftTypeICAO: string
  AircraftTypeName: string
  EngineType: string
  FDPAFormatVersion: string
  FDPARevisionDate: string // DATE STRING
  FireCat: string
  Manufacturer: string
  MinimumRunwayLenght: string // ОПЕЧАТКА?
  ModelTitle: string
  ModelType: string
  NumberOfEngines: number
  PaxCapasity: string
  RevisionDate: string // DATE STRING
  Winglet: string
  biases: AircraftInfoBiases
  equipmentDefault: AircraftInfoEquipment
  option: AircraftInfoOption
  weightDefault: AircraftInfoWeight
}

export interface AircraftInfoBiases {
  BurnAllowLanding: number
  BurnAllowTakeOff: number
  ClimbWindDistBias: number
  DescentWindDistBias: number
  DistAllowLanding: number
  DistAllowTakeOff: number
  DragFactor: string
  'EngineAnti-iceBias': number
  GoAroundBurn: number
  LandingBurnBias: string
  LandingDistBias: string
  LandingTimeBias: string
  TakeOffBurnBias: string
  TakeOffDistBias: string
  TakeOffTimeBias: string
  TimeAllowLanding: number
  TimeAllowTakeOff: number
  'TotalAnti-iceBias': number
}

export interface AircraftInfoEquipment {
  AircraftTypePerformance: string
  EqipAircraftCategory: string
  Equip10a: string
  EquipADS10b: string
  EquipCOM: string
  EquipDAT: string
  EquipNAV: string
  EquipPBN: string
  EquipPER: string
  EquipRMK: string
  EquipRVR: string
  EquipTransponder: string
  FireCat: number
  MinimumRunwayLenght: number
  MinimumRunwayWidth: number
  PaxCapasity: number
}

export interface AircraftInfoOption {
  APUBurnPerHour: number
  DefaultAltcapMode: number
  DefaultClimbMode: number
  DefaultCruiseMode: number
  DefaultDescentMode: number
  DefaultHoldMode: number
  MaxAltitudeCruise: number
  MaxWeight: number
  MinWeight: number
  TaxiFuelPerMin: number
}

export interface AircraftInfoWeight {
  DOW: number
  FuelCapacity: number
  FuelCapacityVolume: number
  FuelDencity: number // float
  MLDW: number
  MRW: string
  MTOW: number
  MTW: number
  MZFW: number
}
