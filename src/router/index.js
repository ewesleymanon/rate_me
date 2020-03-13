import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Import route modules
 */
import GuestRoutes from './guest'
// import AdminRoutes from './admin'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: GuestRoutes
})

export default router
