<template>
  <div id="app">
    <component v-bind:is="layout"></component>
  </div>
</template>
<script>
import DefaultLayout from './components/layouts/default'
import GuestLayout from './components/layouts/guest'
import AdminLayout from './components/layouts/admin'
import { mapGetters } from 'vuex'

export default {
  components: {
    default: DefaultLayout,
    guest: GuestLayout,
    admin: AdminLayout
  },
  computed: {
    ...mapGetters({
      layout: 'layout'
    })
  }

}
</script>

<style lang="scss">
@import 'assets/scss/style.scss';

body {
  margin: 0;
}
#app {
  font-family: Raleway, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
