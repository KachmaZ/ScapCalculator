import { useLS } from '@/composables'
import { LS_KEYS } from '@/constants'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const { saveToLS, removeFromLS } = useLS()

  const isAuthenticated = ref(false)

  const logIn = () => {
    isAuthenticated.value = true
    saveToLS(LS_KEYS.auth, String(isAuthenticated.value))

    router.push({ name: 'Home' })
  }

  const logOut = () => {
    isAuthenticated.value = false
    removeFromLS(LS_KEYS.auth)

    router.push({ name: 'Login' })
  }

  return { isAuthenticated, logIn, logOut }
})
