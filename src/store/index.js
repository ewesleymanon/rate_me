import Vue from 'vue'
import Vuex from 'vuex'
import jd from 'jwt-decode/lib'
import Cookies from 'js-cookie'
import { db, auth } from '../firebase'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: null,
    token: Cookies.get('token'),
    layout: 'guest'
  },
  mutations: {
    SET_USER (state, data) {
      if (data) {
        state.user = jd(state.token)
      } else {
        console.log('User not set!')
      }
    },
    UNSET_USER (state) {
      state.user = null
      state.token = null
    },
    SET_TOKEN (state, data) {
      state.token = data
    },
    SET_LAYOUT (state, data) {
      state.layout = data
    }
  },
  actions: {
    setUser ({ commit, getters }) {
      if (getters.token) {
        commit('SET_USER', getters.token)
      } else {
        commit('SET_USER', null)
      }
    },
    unsetUser ({ commit }) {
      return new Promise((resolve, reject) => {
        Cookies.remove('token')
        auth.signOut().then(() => {
          resolve()
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
      // commit('UNSET_USER')
    },
    setToken ({ commit }, token) {
      try {
        const validateToken = Cookies.get('token')
        if (validateToken) {
          const decodedToken = jd(validateToken)
          if (decodedToken.email) {
            commit('SET_TOKEN', validateToken)
          } else {
            commit('SET_TOKEN', null)
            Cookies.remove('token')
          }
        } else {
          Cookies.set('token', token)
          commit('SET_TOKEN', token)
        }
      } catch (e) {
        console.log(e)
      }
    },
    setValidateToken ({ commit }) {
      /**
       * Checks if the token is valid
       */
      return new Promise((resolve, reject) => {
        const validateToken = Cookies.get('token')
        if (validateToken) {
          const decodedToken = jd(validateToken)

          if (decodedToken.email) {
            resolve(true)
          } else {
            console.log('Invalid')
            Cookies.remove('token')
            reject(new Error('Invalid Token'))
          }
        }
      })
    },
    setLayout ({ commit, getters }) {
      /**
       * This function checks the user's role
       * if admin -> sets the layout to admin
       * else sets to guest
       */
      const user = getters.user
      console.log(user)
      db
        .collection('users')
        .doc(user.user_id)
        .get()
        .then(snapshot => {
          if (!snapshot.exists) {
            console.log('User is not found')
          } else {
            const verifiedUser = snapshot.data()
            if (verifiedUser.role === 'admin') {
              commit('SET_LAYOUT', 'admin')
            } else if (verifiedUser.role === 'guest') {
              commit('SET_LAYOUT', 'guest')
            }
          }
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    token (state) {
      return state.token
    },
    layout (state) {
      return state.layout
    }
  }
})
