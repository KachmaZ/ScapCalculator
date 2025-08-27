<template>
  <VDateInput v-bind="{ ...props }" v-model="modelValue" :display-format="displayFormatFunc" />
</template>

<script setup lang="ts">
import { useDate } from 'vuetify'
import { VDateInput } from 'vuetify/labs/components'
import type { VDateInput as VDateInputType } from 'vuetify/labs/components'
import type { Density } from 'vuetify/lib/composables/density.mjs'

type DateInputProps = InstanceType<(typeof VDateInputType)['$props']>
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IDateInputProps
  extends /* @vue-ignore */ Omit<DateInputProps, 'modelValue' | 'onUpdate:modelValue'> {}
interface Props {
  label?: string
  variant?:
    | 'outlined'
    | 'filled'
    | 'plain'
    | 'underlined'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'
  density?: Density
  hideDetails?: boolean
  color?: string
}
const adapter = useDate()
// const modelValue = defineModel()
// const model = shallowRef(adapter.parseISO(modelValue.value))

const displayFormatFunc = (date: string) => {
  return `${adapter.getYear(date)}-${adapter.getMonth(date)}-${adapter.getDate(date)}`
}

const props = withDefaults(defineProps<IDateInputProps & Props>(), {
  label: '',
  variant: 'outlined',
  density: 'compact',
  hideDetails: true,
  color: 'primary',
})

const modelValue = defineModel()
</script>

<style scoped></style>
