<template>
  <VTextarea class="pa-0" v-bind="{ ...props }" v-model="modelValue"></VTextarea>
</template>

<script setup lang="ts">
import type { VTextarea } from 'vuetify/components'

type TextareaProps = InstanceType<(typeof VTextarea)['$props']>
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ITextareaProps
  extends /* @vue-ignore */ Omit<TextareaProps, 'modelValue' | 'onUpdate:modellValue'> {}
interface Props {
  label?: string
  variant?: 'outlined'
  density?: 'default' | 'comfortable' | 'compact'
  hideDetails?: boolean
  clearable?: boolean
  counter?: boolean | number
  rowHeight?: number
  rows?: number
  autoGrow?: boolean
  noResize?: boolean
}

const props = withDefaults(defineProps<Props & ITextareaProps>(), {
  label: '',
  rowHeight: 10,
  rows: 1,
  variant: 'outlined',
  density: 'compact',
  hideDetails: true,
  autoGrow: false,
  noResize: true,
})

const modelValue = defineModel()
</script>

<style scoped></style>
