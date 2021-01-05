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
  },
  {
    path: '/jingxuan',
    name: 'jingxuan',
    meta: { key: 1 },
    component: () => import('@/views/jingxuan.vue')
  },
  {
    path: '/guess',
    name: 'guess',
    meta: { key: 2 },
    component: () => import('@/views/guess.vue')
  },
  {
    path: '/ku',
    name: 'ku',
    meta: { key: 1 },
    component: () => import('@/views/ku.vue')
  },
  {
    path: '/wanben',
    name: 'wanben',
    meta: { key: 2 },
    component: () => import('@/views/wanben.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: { key: 2 },
    component: () => import('@/views/search.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { key: 3 },
    component: () => import('@/views/detail.vue')
  },
  {
    path: '/read/:id/:cid/:siteid',
    name: 'read',
    meta: { key: 4 },
    component: () => import('@/views/read.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
