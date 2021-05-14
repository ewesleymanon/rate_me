<template>
  <div class="l-main">
    <div class="p-login">
      <img src="../../assets/images/gallery/auth_bg.jpg" alt="Authentication Background">
    </div>
    <div class="p-form">
      <div class="p-form__content">
        <router-link :to="{ name: 'top' }"><img src="../../assets/images/auth/logo.png" alt="" srcset=""></router-link>
        <h1 class="p-form__title">Sign In</h1>
        <form action="#" @submit.prevent="submit">
          <input type="email" name="email" v-model="form.email" placeholder="Email">
          <input type="password" name="password" v-model="form.password" placeholder="Password">
          <p>Don't have an account yet? <router-link :to="{name: 'register'}">Sign up</router-link></p>
          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from '../../firebase'
import Cookies from 'js-cookie'

export default {
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async submit () {
      try {
        const user = await auth.signInWithEmailAndPassword(this.form.email, this.form.password)
        Cookies.remove('token')
        await this.$store.dispatch('setToken', user.user.ma)
        await this.$store.dispatch('setUser')
        this.$router.replace({ name: 'events' })
        alert('Success')
        console.log(user)
      } catch {
        alert('Invalid Credentials')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/project/_auth.scss';
</style>
