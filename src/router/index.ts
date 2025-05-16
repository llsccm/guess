import { createWebHashHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModifyView from '../views/ModifyView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: HomeView },
  { path: '/modify', name: 'about', component: ModifyView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
