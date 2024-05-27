import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import UserView from '@/views/UserView.vue'
import NoteView from '@/views/NoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/:id',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/note/:folderId',
      name: 'note',
      component: NoteView
    }
  ]
})

export default router
