<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VContainer class="mx-a">
    <VRow>
      <VCol cols="12">
        <VToolbar color="primary" rounded class="text-white">
          <VBtn icon="mdi-arrow-left" @click="() => router.push({ name: 'ModelsTable' })"></VBtn>
          <VToolbarTitle class="text-h5">General Information</VToolbarTitle>
          <VBtn
            icon="mdi-pencil"
            :to="{ name: 'ModelsEditor', params: { id: currentModel?.id } }"
          ></VBtn>
        </VToolbar>
      </VCol>
      <VCol cols="4"><ModelInfoCard title="Units" :info="generalInfo?.units" /></VCol>
      <VCol cols="4"> <ModelInfoCard title="Aircraft" :info="generalInfo?.aircraft" /></VCol>
      <VCol cols="4"><ModelInfoCard title="Model Data" :info="generalInfo?.modelData" /></VCol>
      <VCol cols="4"
        ><ModelInfoCard title="Model Default Weights" :info="generalInfo?.modelDefaultWeights"
      /></VCol>
      <VCol cols="4"><ModelInfoCard title="Model Params" :info="generalInfo?.modelParams" /></VCol>
      <VCol cols="4"
        ><ModelInfoCard title="Fuel Capacity" :info="generalInfo?.fuelCapacity"
      /></VCol>
    </VRow>
    <VDivider class="my-4"></VDivider>
    <VRow>
      <VCol cols="12">
        <VCard :loading="!!currentModel">
          <VRow>
            <VCol cols="11" class="bg-primary">
              <VTabs v-model="tab" bg-color="primary" align-tabs="center" height="48px">
                <VTab value="climb">Climb</VTab>
                <VTab value="cruise">Cruise</VTab>
                <VTab value="descent">Descent</VTab>
                <VTab value="hold">Hold</VTab>
                <VTab value="altitudeCapability">AltCap</VTab>
              </VTabs>
            </VCol>
            <VCol cols="1" class="bg-primary d-flex justify-center align-center">
              <VBtn
                icon="mdi-plus"
                variant="flat"
                color="primary"
                @click="openEntityConstructor(tab as ConstructorEntity)"
              ></VBtn
            ></VCol>
          </VRow>
          <VRow>
            <VCol cols="12" class="mb-0">
              <VTextField
                type="text"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                hide-details
                v-model="search"
              />
            </VCol>
          </VRow>
          <VCardText>
            <VTabsWindow v-model="tab">
              <VTabsWindowItem
                v-for="tableEntity in Object.keys(tablesHeaders) as Exclude<
                  ConstructorEntity,
                  'type' | 'subtype'
                >[]"
                :key="tableEntity!"
                :value="tableEntity!"
              >
                <AircraftEntityTable
                  :entity="tableEntity"
                  :current-model-id="String(currentModelID)"
                  :table-headers="tablesHeaders[tableEntity!]"
                  :table-items="
                    currentModel
                      ? currentModel[
                          tableEntity as keyof Omit<AircraftModel, 'id' | 'info' | 'units'>
                        ]
                      : []
                  "
                  :search="search"
                />
              </VTabsWindowItem>
            </VTabsWindow>
          </VCardText> </VCard
      ></VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import ModelInfoCard from '@/components/ModelInfoCard.vue'
import router from '@/router'
import type { AircraftModel, ConstructorEntity } from '@/models'
import { useModelsStore } from '@/stores/modelsStore'
import { useRoute } from 'vuetify/lib/composables/router.mjs'
import { useConstructorStore } from '@/stores/constructorStore'
import AircraftEntityTable from '@/components/AircraftEntityTable.vue'
import type { DataTableHeader } from 'vuetify'
import { useApi } from '@/api'
import { storeToRefs } from 'pinia'
import { useFormat } from '@/composables/useFormat'

const modelsStore = useModelsStore()
const { currentModel } = storeToRefs(modelsStore)
const { getAircraftModelByID } = useApi()

const modalStore = useConstructorStore()
const { openEntityConstructor } = modalStore

const tab = ref<ConstructorEntity>('climb')

const currentModelID = useRoute().value?.params.id

const search = ref('')
const { getProcessedValue } = useFormat()

const generalInfo = computed(() => {
  if (currentModel.value) {
    return {
      aircraft: currentModel.value.info
        ? {
            type: getProcessedValue(currentModel.value?.info.ModelType),
            subtype: getProcessedValue(currentModel.value?.info.AircraftSubTypeName),
            engine: getProcessedValue(currentModel.value?.info.EngineType),
          }
        : null,
      modelData: currentModel.value.info
        ? {
            name: getProcessedValue(currentModel.value?.info.ModelTitle),
            format: getProcessedValue(currentModel.value?.info.FDPAFormatVersion),
            revision: getProcessedValue(currentModel.value?.info.FDPARevision),
            revisionFDPA: getProcessedValue(currentModel.value?.info.FDPARevisionDate),
          }
        : null,
      modelDefaultWeights:
        currentModel.value.info && currentModel.value.info.weightDefault
          ? {
              DOW: getProcessedValue(currentModel.value?.info.weightDefault.DOW),
              MZFW: getProcessedValue(currentModel.value?.info.weightDefault.MZFW),
              MTW: getProcessedValue(currentModel.value?.info.weightDefault.MTW),
              MTOW: getProcessedValue(currentModel.value?.info.weightDefault.MTOW),
              MLDW: getProcessedValue(currentModel.value?.info.weightDefault.MLDW),
            }
          : null,
      units: currentModel.value.units
        ? {
            weight: getProcessedValue(currentModel.value?.units.weight),
            altitude: getProcessedValue(currentModel.value?.units.altitude),
            temperature: getProcessedValue(currentModel.value?.units.temperature),
            flightDistance: getProcessedValue(currentModel.value?.units.flightDistance),
            horisontalSpeed: getProcessedValue(currentModel.value?.units.horizontalSpeed),
            verticalSpeed: getProcessedValue(currentModel.value?.units.verticalSpeed),
            fuelFlowPerEngine: getProcessedValue(currentModel.value?.units.fuelFlowPerEngine),
            fuelFlow: getProcessedValue(currentModel.value?.units.fuelFlow),
            volume: getProcessedValue(currentModel.value?.units.volume),
          }
        : null,
      modelParams:
        currentModel.value.info && currentModel.value.info.option && currentModel.value?.info.biases
          ? {
              minWeight: getProcessedValue(currentModel.value?.info.option.MinWeight),
              maxWeight: getProcessedValue(currentModel.value?.info.option.MaxWeight),
              maxAltitude: getProcessedValue(currentModel.value?.info.option.MaxAltitudeCruise),
              climbBias: getProcessedValue(currentModel.value?.info.biases.ClimbWindDistBias),
              descentBias: getProcessedValue(currentModel.value?.info.biases.DescentWindDistBias),
              taxi: getProcessedValue(currentModel.value?.info.option.TaxiFuelPerMin),
              APU: getProcessedValue(currentModel.value?.info.option.APUBurnPerHour),
            }
          : null,
      fuelCapacity:
        currentModel.value.info && currentModel.value.info.weightDefault
          ? {
              volume: getProcessedValue(currentModel.value?.info.weightDefault.FuelCapacityVolume),
              dencity: getProcessedValue(currentModel.value?.info.weightDefault.FuelDencity),
              weight: getProcessedValue(currentModel.value?.info.weightDefault.FuelCapacity),
            }
          : null,
    }
  } else {
    return null
  }
})

const tablesHeaders: Record<
  Exclude<ConstructorEntity, null | 'type' | 'subtype'>,
  DataTableHeader[]
> = {
  climb: [
    { title: 'Name', key: 'ModeName' },
    { title: 'Cost Index', key: 'CostIndex' },
    { title: 'Engine in operate', key: 'EngineInOperate' },
    { title: 'Emergency', key: 'ModeEmerg' },
    { title: 'SpecOps', key: 'SpecialOpsMode' },
    { title: 'ISA', key: 'ISA' },
    { title: 'Wind', key: 'Wind' },
    { title: 'Degradation factor', key: 'DegradationFactor' },
    { title: 'Interpolation', key: 'ModeInterpolation' },
    { title: 'Actions', key: 'actions', sortable: false },
  ],
  cruise: [
    { title: 'Name', key: 'ModeName' },
    { title: 'Cost Index', key: 'CostIndex' },
    { title: 'Engine in operate', key: 'EngineInOperate' },
    { title: 'Emergency', key: 'ModeEmerg' },
    { title: 'SpecOps', key: 'SpecialOpsMode' },
    { title: 'Mach calculation', key: 'MachCalculation' },
    { title: 'ISA', key: 'ISA' },
    { title: 'Wind', key: 'Wind' },
    { title: 'IAS', key: 'IAS' },
    { title: 'Degradation factor', key: 'DegradationFactor' },
    { title: 'Interpolation', key: 'ModeInterpolation' },
    { title: 'Actions', key: 'actions', sortable: false },
  ],
  descent: [
    { title: 'Name', key: 'ModeName' },
    { title: 'Cost Index', key: 'CostIndex' },
    { title: 'Engine in operate', key: 'EngineInOperate' },
    { title: 'Emergency', key: 'ModeEmerg' },
    { title: 'SpecOps', key: 'SpecialOpsMode' },
    { title: 'ISA', key: 'ISA' },
    { title: 'Wind', key: 'Wind' },
    { title: 'Degradation factor', key: 'DegradationFactor' },
    { title: 'Interpolation', key: 'ModeInterpolation' },
    { title: 'Actions', key: 'actions', sortable: false },
  ],
  hold: [
    { title: 'Name', key: 'ModeName' },
    { title: 'Cost Index', key: 'CostIndex' },
    { title: 'Engine in operate', key: 'EngineInOperate' },
    { title: 'Emergency', key: 'ModeEmerg' },
    { title: 'SpecOps', key: 'SpecialOpsMode' },
    { title: 'Mach calculation', key: 'MachCalculation' },
    { title: 'ISA', key: 'ISA' },
    { title: 'Wind', key: 'Wind' },
    { title: 'IAS', key: 'ISA' },
    { title: 'Degradation factor', key: 'DegradationFactor' },
    { title: 'Actions', key: 'actions', sortable: false },
  ],
  altitudeCapability: [
    { title: 'Name', key: 'ModeName' },
    { title: 'Cruise Mode', key: 'CruiseMode' },
    { title: 'Engine in operate', key: 'EngineInOperate' },
    { title: 'Emergency', key: 'ModeEmerg' },
    { title: 'SpecOps', key: 'SpecialOpsMode' },
    { title: 'ISA', key: 'ISA' },
    { title: 'Interpolation', key: 'ModeInterpolation' },
    { title: 'Actions', key: 'actions', sortable: false },
  ],
}

watch(tab, () => {
  search.value = ''
})

onBeforeMount(async () => {
  if (!currentModelID) {
    router.back()
    return
  }
  await getAircraftModelByID(String(currentModelID))

  if (!currentModel.value) {
    router.back()
  }
})
</script>

<style scoped lang="scss">
.table-container {
  height: calc(100vh - 280px);
  padding: 0;
  display: flex;
  margin-top: 20px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
