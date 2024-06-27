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
    {
      path: '/note/:notebook/:date/:filename',
      name: 'Note',
      component: () => import('../views/Note/Note.vue')
    },
    {
      path: '/notebooks',
      name: 'NoteBooks',
      component: () => import('../views/Notebook/Notebooks.vue')
    },
  ]
})

export default router;
