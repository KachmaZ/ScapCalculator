import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfirmStore = defineStore('confirm', () => {
  const defaultMessage = 'Are you sure?'
  const isOpened = ref(false)
  const message = ref<string>(defaultMessage)
  const handleYes = ref(() => {})
  const handleNo = ref(() => {})

  const resetConfirm = () => {
    isOpened.value = false

    handleYes.value = () => {
      resetConfirm()
    }
    handleNo.value = () => {
      resetConfirm()
    }
  }

  type areYouSureArgs = {
    onAgree: () => void
    onDecline?: () => void
    message?: string
  }

  const areYouSure = (params: areYouSureArgs) => {
    handleYes.value = () => {
      params.onAgree()
      resetConfirm()
    }

    handleNo.value = () => {
      if (params.onDecline) {
        params.onDecline()
      }
      resetConfirm()
    }

    message.value = params.message ?? defaultMessage
    isOpened.value = true
  }
  return {
    isOpened,
    message,
    handleNo,
    handleYes,

    areYouSure,
  }
})
