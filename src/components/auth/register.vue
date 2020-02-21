<template>
  <div class="l-main">
    <div class="p-login">
      <img src="../../assets/images/gallery/auth_bg.jpg" alt="Authentication Background">
    </div>
    <div class="p-form">
      <div class="p-form__content">
        <router-link :to="{ name: 'top' }"><img src="../../assets/images/auth/logo.png" alt="" srcset=""></router-link>
        <h1 class="p-form__title">Sign Up</h1>
        <form action="#" @submit.prevent="submit">
          <input type="text" name="Name" v-model="form.name" placeholder="Name">
          <input type="email" name="email" v-model="form.email" placeholder="Email">
          <input type="password" name="password" v-model="form.password" placeholder="Password">
          <input type="password" name="confirm_password" v-model="form.confirm_password" placeholder="Confirm Password">
          <p>Already have an account? <router-link :to="{name: 'login'}">Sign in</router-link></p>
          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  })
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/project/_auth.scss';
</style>
