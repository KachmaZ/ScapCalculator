<template>
  <div class="model_constuctor">
    <VRow
      ><VCol cols="12"
        ><VToolbar color="primary" rounded class="text-white">
          <VBtn icon="mdi-arrow-left" @click="handleBackClick"></VBtn>

          <VToolbarTitle v-if="!editorMode" class="text-h5">Add new model</VToolbarTitle>
          <VToolbarTitle v-else class="text-h5">Edit model</VToolbarTitle>

          <VBtn icon="mdi-content-save" @click="handleSaveClick"></VBtn> </VToolbar></VCol
    ></VRow>
    <VRow>
      <VCol cols="4"
        ><VCard min-height="300px" height="100%" variant="outlined" color="primary">
          <VCardTitle color="primary" class="text-center"> Aircraft </VCardTitle>
          <VDivider></VDivider>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Type:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.ModelType"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>SubType:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.AircraftTypeName"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Engine:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.EngineType"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
        </VCard>
      </VCol>

      <VCol cols="4"
        ><VCard min-height="300px" height="100%" variant="outlined" color="primary">
          <VCardTitle color="primary" class="text-center"> Model Data </VCardTitle>
          <VDivider></VDivider>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Name:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.ModelTitle"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Format:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.FDPAFormatVersion"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Revision:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                value="'???'"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
            <VRow class="px-4">
              <VCol cols="6" class="d-flex align-center">
                <b>Revision FDPA:</b>
              </VCol>
              <VCol cols="6" class="d-flex align-center">
                <VTextField
                  name="type"
                  v-model="draftModel.info.FDPARevisionDate"
                  single-line
                  hide-details
                  density="compact"
                ></VTextField>
              </VCol>
            </VRow>
          </VRow>
        </VCard>
      </VCol>

      <VCol cols="4">
        <VCard min-height="300px" height="100%" variant="outlined" color="primary">
          <VCardTitle color="primary" class="text-center"> Model Default Weights </VCardTitle>
          <VDivider></VDivider>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>DOW:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.DOW"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>MZDW:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.MZFW"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>MTW:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.MTW"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>MTOW:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.MTOW"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>MLDW:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.MLDW"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
        </VCard>
      </VCol>

      <VCol cols="4">
        <VCard min-height="300px" height="100%" variant="outlined" color="primary">
          <VCardTitle color="primary" class="text-center"> Units </VCardTitle>
          <VDivider></VDivider>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Weight:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.weight"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Altitude:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.altitude"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Temperature:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.temperature"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Distance:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.distance"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Speed:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.speed"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Vertical Speed:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.verticalSpeed"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Fuel Flow Per Engine:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.fuelFlow"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Fuel Flow:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.fuelFlow"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Volume:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.units.volume"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
        </VCard>
      </VCol>

      <VCol cols="4">
        <VCard min-height="300px" height="100%" variant="outlined" color="primary">
          <VCardTitle color="primary" class="text-center"> Model Params </VCardTitle>
          <VDivider></VDivider>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Min weight:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.option.MinWeight"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Max weight:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.option.MaxWeight"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Max Altitude:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.option.MaxAltitudeCruise"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Climb biases:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.biases.ClimbWindDistBias"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Descent biases:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.biases.DescentWindDistBias"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Taxi:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.option.TaxiFuelPerMin"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>APU:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.option.APUBurnPerHour"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
        </VCard>
      </VCol>

      <VCol cols="4"
        ><VCard min-height="300px" height="100%" variant="outlined" color="primary">
          <VCardTitle color="primary" class="text-center"> Fuel Capacity </VCardTitle>
          <VDivider></VDivider>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Volume:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.FuelCapacityVolume"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Dencity:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.FuelDencity"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow class="px-4">
            <VCol cols="6" class="d-flex align-center">
              <b>Weight:</b>
            </VCol>
            <VCol cols="6" class="d-flex align-center">
              <VTextField
                name="type"
                v-model="draftModel.info.weightDefault.FuelCapacity"
                single-line
                hide-details
                density="compact"
              ></VTextField>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
    <VRow></VRow>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/api'
import type { AircraftModel } from '@/models'
import router from '@/router'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { getAircraftModelByID, createAircraftModel, updateAircraftModelByID } = useApi()

const editorMode = ref(false)
const modelID = useRoute().params['id']

const modelStore = useModelsStore()
const { currentModel } = storeToRefs(modelStore)

const draftModel = ref<Omit<AircraftModel, 'id'>>({
  altitudeCapability: [],
  climb: [],
  cruise: [],
  descent: [],
  hold: [],
  info: {
    AircraftSubTypeName: '',
    AircraftTypeICAO: '',
    AircraftTypeName: '',
    EngineType: '',
    FDPAFormatVersion: '',
    // 'FDPARevision Date': '',
    FDPARevisionDate: '',
    FireCat: '',
    Manufacturer: '',
    MinimumRunwayLenght: '',
    ModelTitle: '',
    ModelType: '',
    NumberOfEngines: 0,
    PaxCapasity: '',
    RevisionDate: '',
    Winglet: '',
    biases: {
      BurnAllowLanding: 0,
      BurnAllowTakeOff: 0,
      ClimbWindDistBias: 0,
      DescentWindDistBias: 0,
      DistAllowLanding: 0,
      DistAllowTakeOff: 0,
      DragFactor: '',
      'EngineAnti-iceBias': 0,
      GoAroundBurn: 0,
      LandingBurnBias: '',
      LandingDistBias: '',
      LandingTimeBias: '',
      TakeOffBurnBias: '',
      TakeOffDistBias: '',
      TakeOffTimeBias: '',
      TimeAllowLanding: 0,
      TimeAllowTakeOff: 0,
      'TotalAnti-iceBias': 0,
    },
    equipmentDefault: {
      AircraftTypePerformance: '',
      EqipAircraftCategory: 'M',
      Equip10a: 'SDFHILORVWXYZ',
      EquipADS10b: 'B1',
      EquipCOM: '',
      EquipDAT: '',
      EquipNAV: '',
      EquipPBN: '',
      EquipPER: '',
      EquipRMK: '',
      EquipRVR: '',
      EquipTransponder: '',
      FireCat: 0,
      MinimumRunwayLenght: 0,
      MinimumRunwayWidth: 0,
      PaxCapasity: 0,
    },
    option: {
      APUBurnPerHour: 0,
      DefaultAltcapMode: 0,
      DefaultClimbMode: 0,
      DefaultCruiseMode: 0,
      DefaultDescentMode: 0,
      DefaultHoldMode: 0,
      MaxAltitudeCruise: 0,
      MaxWeight: 0,
      MinWeight: 0,
      TaxiFuelPerMin: 0,
    },
    weightDefault: {
      DOW: 0,
      FuelCapacity: 0,
      FuelCapacityVolume: 0,
      FuelDencity: 0,
      MLDW: 0,
      MRW: '',
      MTOW: 0,
      MTW: 0,
      MZFW: 0,
    },
  },
  units: {
    altitude: 'FT',
    distance: 'NM',
    fuelFlow: 'PerEngine',
    speed: 'KT',
    temperature: 'C°',
    time: 'MIN',
    verticalSpeed: 'FT/MIN',
    volume: 'L',
    weight: 'KG',
  },
})

const handleBackClick = () => {
  if (!editorMode.value) {
    router.push({ name: 'ModelsTable' })
  } else {
    router.push({ name: 'ModelsItem', params: { id: modelID } })
  }
}

const handleSaveClick = () => {
  if (!editorMode.value) {
    createAircraftModel(draftModel.value)
  } else {
    updateAircraftModelByID(String(modelID), draftModel.value)
  }

  handleBackClick()
}

onMounted(async () => {
  if (modelID && typeof modelID === 'string') {
    editorMode.value = true
    await getAircraftModelByID(modelID)
    draftModel.value = currentModel.value
  }
})
</script>

<style scoped></style>
