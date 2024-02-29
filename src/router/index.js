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
      path: '/notes',
      name: 'Notes',
      component: () => import('../views/Note/Notes.vue')
    },
    {
      path: '/note/create',
      name: 'CreateNote',
      component: () => import('../views/Note/CreateNote.vue')
    },
  ]
})

export default router;
