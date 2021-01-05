import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/bookcase'
  },
  {
    path: '/bookcase',
    name: 'bookcase',
    meta: { key: 1 },
    component: () => import('@/views/bookcase.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { key: 2 },
    component: () => import('@/views/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
