import router from './index'
import store from '../store'
import Cookies from 'js-cookie'

/**
 * Router middleware
 */

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (store.getters.token) {
      store.dispatch('setValidateToken')
        .then(res => {
          if (res) {
            store.dispatch('setUser')
            store.dispatch('setLayout')
            next()
          }
        })
        .catch(err => {
          console.log(err)
          Cookies.remove('token')
          next('login')
        })
    } else {
      if (!Cookies.get('token')) {
        next('login')
      } else {
        store.dispatch('setToken')
        store.dispatch('setUser')
        store.dispatch('setLayout')
        next()
      }
    }
  } else if (store.getters.token) {
    router.go(-1)
  } else {
    next()
  }
})
