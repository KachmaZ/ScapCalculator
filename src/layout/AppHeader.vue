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
    <VAppBarTitle>SCAP Calculator</VAppBarTitle>
  </VAppBar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
