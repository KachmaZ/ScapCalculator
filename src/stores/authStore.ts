import { useLS } from '@/composables'
import { LS_KEYS } from '@/constants'
import type { SCCredentials } from '@/models'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const { saveToLS, removeFromLS } = useLS()

  const isAuthenticated = ref(false)
  const savedLogin = ref('')
  const savedPassword = ref('')

  const logIn = ({ login, password }: SCCredentials) => {
    isAuthenticated.value = true
    saveToLS(LS_KEYS.auth, String(isAuthenticated.value))
    saveToLS(LS_KEYS.savedLogin, String(login))
    saveToLS(LS_KEYS.savedPassword, String(password))

    router.push({ name: 'Home' })
  }

  const logOut = () => {
    isAuthenticated.value = false
    savedLogin.value = ''
    savedPassword.value = ''

    removeFromLS(LS_KEYS.auth)
    removeFromLS(LS_KEYS.savedLogin)
    removeFromLS(LS_KEYS.savedPassword)

    router.push({ name: 'Login' })
  }

  return { isAuthenticated, savedLogin, savedPassword, logIn, logOut }
})
