<template>
  <VNavigationDrawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <VList :lines="false" density="compact" nav :items="items">
      <VListItem
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        :to="{ name: item.routeName }"
        >{{ item.title }}</VListItem
      >
    </VList>
  </VNavigationDrawer>
  <VAppBar color="primary">
    <VAppBarNavIcon icon="mdi-menu" @click.stop="drawer = !drawer"></VAppBarNavIcon>
    <VAppBarTitle @click="router.push({ name: 'Home' })" class="cursor-pointer"
      >SCAP Calculator</VAppBarTitle
    >
    <VBtn icon="mdi-logout" @click="logOut()" />
  </VAppBar>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

const authStore = useAuthStore()
const { logOut } = authStore

const drawer = ref(false)

const items = [
  {
    title: 'Aircraft Models',
    routeName: 'ModelsTable',
  },
  {
    title: 'Aircraft Types',
    routeName: 'TypesTable',
  },
  {
    title: 'Calculator',
    routeName: 'Calculator',
  },
]
</script>

<style scoped></style>
