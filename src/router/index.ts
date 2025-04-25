import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  //   history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [...routes],
})

export default router
