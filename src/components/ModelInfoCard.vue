<template>
  <VCard min-height="300px" height="100%" variant="outlined" color="primary" :loading="!info">
    <VCardTitle color="primary" class="text-center"> {{ title }} </VCardTitle>
    <VDivider></VDivider>
    <VTable>
      <tbody>
        <tr v-for="(value, key) in info" :key="key">
          <td>
            <b>{{ key }}:</b>
          </td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  info: Record<string, string | number | boolean> | null | undefined
}>()
</script>

<style scoped></style>
