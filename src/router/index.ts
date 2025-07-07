import { createRouter, createWebHistory } from 'vue-router'
import { middlewarePipeline } from './middlewares/index'
import HeaderLayout from '@/layout/HeaderLayout.vue'
import LoginView from '@/views/LoginView.vue'
import isAuthenticated from './middlewares/isAuthenticated'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/MainView.vue'),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/models',
      name: 'ModelsTable',
      component: () => import('@/views/AircraftModelsView.vue'),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: '/models_constructor',
      name: 'ModelsConstructor',
      component: () => import('@/views/ModelConstructorView.vue'),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: '/models_constructor/:id',
      name: 'ModelsEditor',
      component: () => import('@/views/ModelConstructorView.vue'),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: '/models/:id',
      name: 'ModelsItem',
      component: () => import('@/views/AircraftModelItemView.vue'),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: '/types',
      name: 'TypesTable',
      component: () => import('@/views/AircraftTypesView.vue'),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: () => import('@/views/CalculatorView.vue'),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
  ],
})

middlewarePipeline(router)

export default router
