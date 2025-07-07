<template>
  <VForm @submit.prevent="authenticate(credentials)">
    <VCard width="600px" variant="flat" class="d-flex flex-column align-center pa-4">
      <VCardTitle>Authentication</VCardTitle>
      <VTextField type="text" v-model="credentials.login" width="100%" autocomplete="username" />
      <VTextField
        type="password"
        v-model="credentials.password"
        width="100%"
        autocomplete="current-password"
      />
      <VBtn type="submit" color="primary" width="150px"> Confirm </VBtn>
    </VCard>
  </VForm>
</template>

<script setup lang="ts">
import { useApi } from '@/api'
import { ref } from 'vue'

const { authenticate } = useApi()

const credentials = ref({
  login: '',
  password: '',
})
</script>

<style scoped></style>
