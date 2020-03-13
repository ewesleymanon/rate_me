import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './router/middleware'
import store from './store'
import firebasePlugin from './firebase.js'

Vue.use(firebasePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
