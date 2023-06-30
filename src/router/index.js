import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import AddUsers from '@/pages/AddUsers.vue'
import AddGoods from '@/pages/AddGoods.vue'
import Results from '@/pages/Results.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/addfriends',
    name: 'friends',
    component: AddUsers
  },
  {
    path: '/addgoods',
    name: 'goods',
    component: AddGoods
  },
  {
    path: '/results',
    name: 'results',
    component: Results
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
