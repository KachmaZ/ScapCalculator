<template>
  <VCombobox v-bind="{ ...props }" v-model="modelValue" />
</template>

<script setup lang="ts">
import type { VCombobox } from 'vuetify/components'

type ComboboxProps = InstanceType<(typeof VCombobox)['$props']>
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IComboboxProps
  extends /* @vue-ignore */ Omit<ComboboxProps, 'modelValue' | 'onUpdate:modelValue'> {}
interface Props {
  label?: string
  density?: string
  variant?: string
  hideDetails?: boolean
  hideNoData?: boolean
}

const props = withDefaults(defineProps<IComboboxProps & Props>(), {
  label: '',
  density: 'compact',
  variant: 'outlined',
  hideDetails: true,
  hideNoData: true,
})

const modelValue = defineModel()
</script>

<style scoped></style>
