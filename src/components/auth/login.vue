<template>
  <div class="l-main">
    <div class="p-login">
      <!-- <img src="../../assets/images/gallery/auth_bg.jpg" alt="Authentication Background"> -->
    </div>
    <div class="p-form">
      <div class="p-form__content">
        <router-link :to="{ name: 'top' }"><img src="../../assets/images/auth/logo.png" alt="" srcset=""></router-link>
        <h1 class="p-form__title">Sign In</h1>
        <form action="#">
          <div class="error" v-show="error">{{error}}</div>
          <input type="email" name="email" v-model="form.email" placeholder="Email">
          <input type="password" name="password" v-model="form.password" placeholder="Password" v-on:keyup.enter="submit">
          <p>Don't have an account yet? <router-link :to="{name: 'register'}">Sign up</router-link></p>
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
import { auth } from '../../firebase'
import Cookies from 'js-cookie'

export default {
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    loading: false,
    error: null
  }),
  methods: {
    async submit () {
      try {
        this.loading = true
        const user = await auth
          .signInWithEmailAndPassword(this.form.email, this.form.password)
        Cookies.remove('token')
        await this.$store.dispatch('setToken', user.user.ma)
        await this.$store.dispatch('setUser')
        this.$router.replace({ name: 'guest_dashboard' })
        this.loading = false
      } catch (error) {
        this.loading = false
        if (this.form.email === '' && this.form.password === '') {
          this.error = 'All fields are required.'
        } else {
          this.error = error
        }
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

.error {
  background: #FF9494;
  color: #000000;
  width: 100%;
  text-align: left;
  padding: 15px;
  margin-bottom: 15px;
  vertical-align: middle;
  border-left: 10px solid #402829;
  border-top: 0;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
