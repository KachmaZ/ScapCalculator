<template>
  <VNumberInput v-bind="{ ...props }" v-model="modelValue" />
</template>

<script setup lang="ts">
import type { VNumberInput } from 'vuetify/components'

type NumberInputProps = InstanceType<(typeof VNumberInput)['$props']>
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface INumberInputProps
  extends /* @vue-ignore */ Omit<NumberInputProps, 'modelValue' | 'onUpdate:modelValue'> {}
interface Props {
  label?: string
  variant?: string
  controlVariant?: string
  hideDetails?: boolean
  color?: string
  density?: string
  // precision?: number
}
const props = withDefaults(defineProps<INumberInputProps & Props>(), {
  label: '',
  variant: 'outlined',
  density: 'compact',
  controlVariant: 'hidden',
  hideDetails: true,
  color: 'primary',
  // precision: 4,
})
const modelValue = defineModel()
</script>

<style scoped></style>
