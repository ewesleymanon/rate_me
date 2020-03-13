/**
 * These are the routes for Guest User
 * Also includes the default routes e.g Login, Register
 */

import Login from '../components/auth/login.vue'
import Register from '../components/auth/register.vue'
import Top from '../components/top.vue'
import GuestDashboard from '../components/guest/dashboard.vue'
import GuestEvents from '../components/guest/events.vue'
import GuestPresenters from '../components/guest/presenters.vue'
import GuestAddReview from '../components/guest/review/add.vue'

export default [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'top',
    component: Top,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/guest/dashboard',
    name: 'guest_dashboard',
    component: GuestDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/guest/events',
    name: 'guest_events',
    component: GuestEvents,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/guest/presenters',
    name: 'guest_presenters',
    component: GuestPresenters,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/guest/add/review',
    name: 'guest_add_review',
    component: GuestAddReview,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
