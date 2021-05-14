<template>
  <div class="l-main">
    <div class="p-login">
      <!-- <img src="../../assets/images/gallery/auth_bg.jpg" alt="Authentication Background"> -->
    </div>
    <div class="p-form">
      <div class="p-form__content">
        <router-link :to="{ name: 'top' }"><img src="../../assets/images/auth/logo.png" alt="" srcset=""></router-link>
        <h1 class="p-form__title">Sign Up</h1>
        <form action="#">
          <input type="text" name="Name" v-model="form.name" placeholder="Name">
          <small class="error__message" v-if="error.name">{{error.name}}</small>
          <input type="email" name="email" v-model="form.email" placeholder="Email">
          <small class="error__message" v-if="error.email">{{error.email}}</small>
          <input type="password" name="password" v-model="form.password" placeholder="Password">
          <small class="error__message" v-if="error.password">{{error.password}}</small>
          <input type="password" name="confirm_password" v-model="form.confirm_password" placeholder="Confirm Password">
          <small class="error__message" v-if="error.confirm_password">{{error.confirm_password}}</small>
          <p>Already have an account? <router-link :to="{name: 'login'}">Sign in</router-link></p>
          <div class="c-submit__btn u-center__block" :class="{ 'c-submit__btn--disabled' : loading }" :disabled="loading" @click.prevent="submit">
            <span v-show="loading"><img class="spinner spinner__submit" src="../../assets/images/icons/spinner.svg" alt="Spinner"></span>
            Submit
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { db, auth } from '../../firebase'
// import jd from 'jwt-decode'
import Cookies from 'js-cookie'

export default {
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    error: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    loading: false
  }),
  methods: {
    submit () {
      this.loading = true
      const valid = this.validation()
      if (valid) {
        auth
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            data.user
              .updateProfile({
                displayName: this.form.name
              })
              .then(() => {})
            alert('Registered!')
            this.addUserCollection(data.user.uid, data.user.ma)
            console.log(data)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.error.email = err.message
            this.loading = false
          })
      } else {
        this.loading = false
      }
    },
    async addUserCollection (uid, token) {
      console.log(this.form.name)
      try {
        const user = await db.collection('users').doc(uid).set({
          name: this.form.name,
          role: 'guest'
        })
        console.log(user)
        console.log('User added')
        // this.$router.push({ name: 'login'})
        Cookies.remove('token')
        await this.$store.dispatch('setToken', token)
        await this.$store.dispatch('setUser')
        this.$router.replace({ name: 'events' })
      } catch (err) {
        console.log(err)
      }
    },
    validation () {
      if (this.form.name === '') {
        this.error.name = 'Name field is required'
      } else {
        this.error.name = ''
      }
      if (this.form.email === '') {
        this.error.email = 'Email field is required'
      } else {
        this.error.email = ''
      }
      if (this.form.password === '') {
        this.error.password = 'Password field is required'
      } else {
        this.error.password = ''
      }
      if (this.form.confirm_password === '') {
        this.error.confirm_password = 'Confirm Password field is required'
      } else if (this.form.password !== this.form.confirm_password) {
        this.error.confirm_password = 'Confirm password doesn\'t match your Password.'
      } else {
        this.error.confirm_password = ''
      }
      if (this.error.name !== '' && this.error.email !== '' && this.error.password !== '' && this.error.confirm_password !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/project/_auth.scss';
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.error__message {
  display: block;
  text-align: left;
  font-size: 12px;
  color: red;
  margin-top: -20px;
  margin-bottom: 25px;
}
</style>
