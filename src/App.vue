<template>
  <VApp>
    <AppLayout>
      <RouterView />
    </AppLayout>
    <ModalContructor :entity="currentEntity" />
    <ModalConfirm />
  </VApp>
</template>
<script setup lang="ts">
import ModalConfirm from '@/components/ModalWindow/ModalConfirm.vue'
import ModalContructor from '@/components/ModalWindow/ModalConstructor.vue'
import { useLS } from '@/composables'
import { LS_KEYS } from '@/constants'
import AppLayout from '@/layout/AppLayout.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useConstructorStore } from '@/stores/constructorStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

const { getStringFromLS } = useLS()
const authStore = useAuthStore()
const { isAuthenticated, savedLogin, savedPassword } = storeToRefs(authStore)

const constructorStore = useConstructorStore()
const { currentEntity } = storeToRefs(constructorStore)

// Обработайте query string, если она существует
const path = window.location.search.split('?')[1]
if (path) {
  router.replace(path)
}

onMounted(() => {
  if (getStringFromLS(LS_KEYS.auth)) {
    isAuthenticated.value = true
    savedLogin.value = getStringFromLS(LS_KEYS.savedLogin) ?? ''
    savedPassword.value = getStringFromLS(LS_KEYS.savedPassword) ?? ''
  }
})
</script>

<style scoped lang="scss"></style>
