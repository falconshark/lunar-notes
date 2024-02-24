import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/note/create',
      name: 'CreateNote',
      component: () => import('../views/note/CreateNote.vue')
    },
  ]
})

export default router;
