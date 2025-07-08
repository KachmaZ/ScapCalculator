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
      <VCol cols="4"> <ModelInfoCard title="Aircraft" :info="generalInfo.aircraft" /></VCol>
      <VCol cols="4"><ModelInfoCard title="Model Data" :info="generalInfo.modelData" /></VCol>
      <VCol cols="4"
        ><ModelInfoCard title="Model Default Weights" :info="generalInfo.modelDefaultWeights"
      /></VCol>
      <VCol cols="4"><ModelInfoCard title="Units" :info="generalInfo.units" /></VCol>
      <VCol cols="4"><ModelInfoCard title="Model Params" :info="generalInfo.modelParams" /></VCol>
      <VCol cols="4"><ModelInfoCard title="Fuel Capacity" :info="generalInfo.fuelCapacity" /></VCol>
    </VRow>
    <VDivider class="my-4"></VDivider>
    <VRow>
      <VCol cols="12"
        ><VCard>
          <VRow>
            <VCol cols="11" class="bg-primary">
              <VTabs v-model="tab" bg-color="primary" align-tabs="center" height="48px">
                <VTab value="climb">Climb</VTab>
                <VTab value="cruise">Cruise</VTab>
                <VTab value="descent">Descent</VTab>
                <VTab value="hold">Hold</VTab>
                <VTab value="altCap">AltCap</VTab>
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
            <VCol cols="12">
              <VTextField
                type="text"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                v-model="search"
              />
            </VCol>
          </VRow>
          <VCardText>
            <VTabsWindow v-model="tab">
              <VTabsWindowItem value="climb">
                <VDataTableVirtual
                  :headers="tablesHeaders.climb"
                  :items="currentModel?.climb"
                  :search="search"
                  hide-actions
                  hover
                  class="elevation-1"
                >
                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2 justify-center">
                      <VBtn
                        icon="mdi-pencil"
                        size="24"
                        variant="plain"
                        @click="openEntityEditor('climb', item.id)"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn>

                      <VBtn
                        icon="mdi-delete-outline"
                        size="24"
                        variant="plain"
                        @click="deleteEntity('climb', item.id, String(currentModelID))"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn></div
                  ></template>
                </VDataTableVirtual>
              </VTabsWindowItem>

              <VTabsWindowItem value="cruise">
                <VDataTableVirtual
                  :headers="tablesHeaders.cruise"
                  :items="currentModel?.cruise"
                  :search="search"
                  hide-actions
                  hover
                  class="elevation-1"
                >
                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2 justify-center">
                      <VBtn
                        icon="mdi-pencil"
                        size="24"
                        variant="plain"
                        @click="openEntityEditor('cruise', item.id)"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn>

                      <VBtn
                        icon="mdi-delete-outline"
                        size="24"
                        variant="plain"
                        @click="deleteEntity('cruise', item.id, String(currentModelID))"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn></div
                  ></template>
                </VDataTableVirtual>
              </VTabsWindowItem>

              <VTabsWindowItem value="descent">
                <VDataTableVirtual
                  :headers="tablesHeaders.descent"
                  :items="currentModel?.descent"
                  :search="search"
                  hide-actions
                  hover
                  class="elevation-1"
                >
                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2 justify-center">
                      <VBtn
                        icon="mdi-pencil"
                        size="2Ravk4"
                        variant="plain"
                        @click="openEntityEditor('descent', item.id)"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn>

                      <VBtn
                        icon="mdi-delete-outline"
                        size="24"
                        variant="plain"
                        @click="deleteEntity('descent', item.id, String(currentModelID))"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn></div
                  ></template>
                </VDataTableVirtual>
              </VTabsWindowItem>
              <VTabsWindowItem value="hold">
                <VDataTableVirtual
                  :headers="tablesHeaders.hold"
                  :items="currentModel?.hold"
                  :search="search"
                  hide-actions
                  hover
                  class="elevation-1"
                >
                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2 justify-center">
                      <VBtn
                        icon="mdi-pencil"
                        size="24"
                        variant="plain"
                        @click="openEntityEditor('hold', item.id)"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn>

                      <VBtn
                        icon="mdi-delete-outline"
                        size="24"
                        variant="plain"
                        @click="deleteEntity('hold', item.id, String(currentModelID))"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn></div
                  ></template>
                </VDataTableVirtual>
              </VTabsWindowItem>
              <VTabsWindowItem value="altCap">
                <VDataTableVirtual
                  :headers="tablesHeaders.altCap"
                  :items="currentModel?.altitudeCapability"
                  :search="search"
                  hide-actions
                  hover
                  class="elevation-1"
                >
                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2 justify-center">
                      <VBtn
                        icon="mdi-pencil"
                        size="24"
                        variant="plain"
                        @click="openEntityEditor('altCap', item.id)"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn>

                      <VBtn
                        icon="mdi-delete-outline"
                        size="24"
                        variant="plain"
                        @click="deleteEntity('altCap', item.id, String(currentModelID))"
                      >
                        <VIcon size="16"></VIcon>
                      </VBtn></div
                  ></template>
                </VDataTableVirtual>
              </VTabsWindowItem>
            </VTabsWindow>
          </VCardText> </VCard
      ></VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ModelInfoCard from '@/components/ModelInfoCard.vue'
import router from '@/router'
import type { AircraftModel } from '@/models'
import { useModelsStore } from '@/stores/modelsStore'
import { useRoute } from 'vuetify/lib/composables/router.mjs'
import { useModalStore, type ConstructorEntity } from '@/stores/modalStore'
import { useApi } from '@/api'

const modelsStore = useModelsStore()
const { getAircraftModelByID } = modelsStore
const { deleteEntity } = useApi()

const modalStore = useModalStore()
const { openEntityConstructor, openEntityEditor } = modalStore

const tab = ref<ConstructorEntity>('climb')

const currentModelID = useRoute().value?.params.id
const currentModel = ref<AircraftModel | undefined>(undefined)

const search = ref('')

const generalInfo = computed(() => {
  return {
    aircraft: currentModel.value
      ? {
          type: currentModel.value?.info.ModelType,
          subtype: currentModel.value?.info.AircraftTypeName,
          engine: currentModel.value?.info.EngineType,
        }
      : null,
    modelData: currentModel.value
      ? {
          name: currentModel.value?.info.ModelTitle,
          format: currentModel.value?.info.FDPAFormatVersion,
          revision: '???',
          revisionFDPA: currentModel.value?.info.FDPARevisionDate,
        }
      : null,
    modelDefaultWeights: currentModel.value
      ? {
          DOW: currentModel.value?.info.weightDefault.DOW,
          MZFW: currentModel.value?.info.weightDefault.MZFW,
          MTW: currentModel.value?.info.weightDefault.MTW,
          MTOW: currentModel.value?.info.weightDefault.MTOW,
          MLDW: currentModel.value?.info.weightDefault.MLDW,
        }
      : null,
    units: currentModel.value
      ? {
          weight: currentModel.value?.units.weight,
          altitude: currentModel.value?.units.altitude,
          temperature: currentModel.value?.units.temperature,
          distance: currentModel.value?.units.distance,
          speed: currentModel.value?.units.speed,
          verticalSpeed: currentModel.value?.units.verticalSpeed,
          fuelFlowPerEngine: currentModel.value?.units.fuelFlow,
          fuelFlow: currentModel.value?.units.fuelFlow,
          volume: currentModel.value?.units.volume,
        }
      : null,
    modelParams: currentModel.value
      ? {
          minWeight: currentModel.value?.info.option.MinWeight,
          maxWeight: currentModel.value?.info.option.MaxWeight,
          maxAltitude: currentModel.value?.info.option.MaxAltitudeCruise,
          climbBias: currentModel.value?.info.biases.ClimbWindDistBias,
          descentBias: currentModel.value?.info.biases.DescentWindDistBias,
          taxi: currentModel.value?.info.option.TaxiFuelPerMin,
          APU: currentModel.value?.info.option.APUBurnPerHour,
        }
      : null,
    fuelCapacity: currentModel.value
      ? {
          volume: currentModel.value?.info.weightDefault.FuelCapacityVolume,
          dencity: currentModel.value?.info.weightDefault.FuelDencity,
          weight: currentModel.value?.info.weightDefault.FuelCapacity,
        }
      : null,
  }
})

const tablesHeaders = {
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
  altCap: [
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

onMounted(() => {
  if (!currentModelID) {
    router.back()
    return
  }
  setTimeout(() => {
    currentModel.value = getAircraftModelByID(String(currentModelID))
    if (!currentModel.value) {
      router.back()
    }
  }, 1000)
})
</script>

<style scoped></style>
