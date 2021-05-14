<template>
  <div class="c-sidebar">
    <div class="c-sidebar__content">
      <img src="../../assets/images/logo/logo.png" class="rateme-logo" alt="Rate Me Logo">
      <div class="c-sidebar__profile">
        <img src="../../assets/images/avatar.png" class="c-sidebar__profile-img" alt="Profile Picture">
        <h4 class="c-sidebar__profile-name">{{ user.name }}</h4>
        <h6 class="c-sidebar__profile-email">{{ user.email }}</h6>
      </div>
      <hr class="c-sidebar__profile-divider" />
      <div class="c-c-sidebar__items">
        <div class="c-sidebar__items-link">
          <img src="../../assets/images/icons/dashboard/chart.png" alt="Dashboard Logo">
          <router-link :to="{ name: 'guest_dashboard' }">Dashboard</router-link>
        </div>
        <div class="c-sidebar__items-link">
          <img src="../../assets/images/icons/dashboard/switch_account.png" alt="Account Logo">
          <a class="">Account</a>
        </div>
        <div class="c-sidebar__items-link">
          <img src="../../assets/images/icons/dashboard/stats.png" alt="Events Logo">
          <router-link :to="{ name: 'guest_events' }">Events</router-link>
        </div>
        <div class="c-sidebar__items-link">
          <img src="../../assets/images/icons/dashboard/star-half.png" alt="Reviews Logo">
          <span @click="collapse">Reviews</span>
          <img v-if="dropdown" src="../../assets/images/icons/dashboard/arrow_up.png" @click="collapse" class="collapse-icon" alt="Collapse Icon">
          <img v-else src="../../assets/images/icons/dashboard/arrow_down.png" @click="collapse" class="collapse-icon" alt="Collapse Icon">
        </div>
        <ul class="c-sidebar__items-dropdown animated fillModeForwards" :class="{'c-sidebar__items-dropdown_list': dropdown }">
          <li><router-link :to="{ name: 'guest_add_review' }">Add Reviews</router-link></li>
          <li><a>Old Reviews</a></li>
          <li><a>My Reviews</a></li>
        </ul>
        <hr class="c-sidebar__profile-divider" />
        <div class="c-sidebar__profile-logout" @click="logout">
          <img src="../../assets/images/icons/dashboard/logout.png" alt="Logout Icon">
            <span>Log out</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/components/_sidebar.scss';
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    dropdown: false
  }),
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('unsetUser').then(() => {
        // this.$router.replace({name: 'login'})
        location.replace('/login')
      })
    },
    collapse () {
      this.dropdown = !this.dropdown
    }
  }
}
</script>
