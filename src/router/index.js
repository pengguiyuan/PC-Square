import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexHome from '../views/IndexHome/IndexHome.vue'
import LoginIndex from '../views/LoginIndex/LoginIndex.vue'
import SwiperSet from '../views/swiper/SwiperSet.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginIndex
  },
  {
    path: '/index',
    name: 'index',
    component: IndexHome,
    children: [
      {
        path: '/swiperset',
        name: 'swiperset',
        component: SwiperSet
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
