import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import AddUsers from '@/pages/AddUsers.vue'
import AddGoods from '@/pages/AddGoods.vue'
import Results from '@/pages/Results.vue'

const routes = [        /// Навигация по компонентам Vue Router
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

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 0e2dec6 (Adding files to Master)
=======

>>>>>>> 351fdf1 (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
export default router
