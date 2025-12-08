import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexView from '@/views/IndexView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/study-modules',
      name:'/study-modules',
      component: HomeView,
    },
    {
      path:'/user/:id',
      name:'user-detail',
      component: UserDetailView,
    },
  ],
})

export default router
