<template>
  <div class="l-main">
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
