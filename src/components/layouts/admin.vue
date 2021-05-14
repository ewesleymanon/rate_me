<template>
  <div class="l-main">
    <h1>Admin</h1>
    <Sidebar/>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Sidebar from '../guest/sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>
<style lang="scss" scoped>
.main-content {
  margin-left: 175px;
}
</style>
