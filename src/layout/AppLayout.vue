<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { shallowRef, watch, type Component } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from './BaseLayout.vue'

const route = useRoute()
const layout = shallowRef<Component | null>(null)

// Наблюдаем за изменением маршрута
watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        // Пробуем найти компонент из свойства meta и динамически импортировать его
        const component = meta.layout
        layout.value = component || BaseLayout
      } else {
        layout.value = BaseLayout
      }
    } catch (e) {
      console.error('Динамический шаблон не найден. Установлен шаблон по-умолчанию.', e)
      layout.value = BaseLayout
    }
  },
)
</script>

<style lang="scss" scoped></style>
