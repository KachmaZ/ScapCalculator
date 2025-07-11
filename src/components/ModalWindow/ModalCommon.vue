<template>
  <div class="modal__wrapper" v-if="isOpened" @click.self="handleOuterClick">
    <VCard width="600px" max-height="600px" class="pa-4 overflow-scroll"
      ><ModalContructor :entity="currentEntity" />
    </VCard>
  </div>
</template>

<script setup lang="ts">
import ModalContructor from '@/components/ModalWindow/ModalContructor.vue'
import { useModalStore } from '@/stores/modalStore'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore()
const { isOpened, currentEntity } = storeToRefs(modalStore)
const { resetModal } = modalStore

const handleOuterClick = () => {
  resetModal()
}
</script>

<style scoped lang="scss">
.modal {
  &__wrapper {
    position: fixed;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.722);
  }
}
</style>
