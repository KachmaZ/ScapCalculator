import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

export default function isAuthenticated() {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  if (!isAuthenticated.value) {
    return { name: 'Login' }
  }
  return true
}
