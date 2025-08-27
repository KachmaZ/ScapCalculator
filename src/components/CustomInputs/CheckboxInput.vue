<template>
  <VCheckbox v-bind="{ ...props }" v-model="modelValue"></VCheckbox>
</template>

<script setup lang="ts">
import type { VCheckbox } from 'vuetify/components'

type CheckboxProps = InstanceType<(typeof VCheckbox)['$props']>
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICheckboxProps
  extends /* @vue-ignore */ Omit<CheckboxProps, 'modelValue' | 'onUpdate:modelValue'> {}
interface Props {
  label?: string
  hideDetails?: boolean
  color?: string
}
const props = withDefaults(defineProps<ICheckboxProps & Props>(), {
  label: '',
  hideDetails: true,
  color: 'primary',
})

const modelValue = defineModel()
</script>

<style scoped></style>
