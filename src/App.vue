<template>
  <VApp>
    <AppLayout>
      <RouterView />
    </AppLayout>
    <ModalCommon />
  </VApp>
</template>
<script setup lang="ts">
import ModalCommon from '@/components/ModalWindow/ModalCommon.vue'
import { useLS } from '@/composables'
import { LS_KEYS } from '@/constants'
import AppLayout from '@/layout/AppLayout.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

const { getStringFromLS } = useLS()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

// Обработайте query string, если она существует
const path = window.location.search.split('?')[1]
if (path) {
  router.replace(path)
}

onMounted(() => {
  if (getStringFromLS(LS_KEYS.auth)) {
    isAuthenticated.value = true
  }
})
</script>

<style scoped lang="scss"></style>
