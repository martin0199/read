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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
