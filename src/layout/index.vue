<template>
  <div class="app-container" :class="{'hideSidebar':opened}">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import AppMain from './AppMain.vue'
import Navbar from './Navbar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  computed: {
    ...mapGetters(['opened'])
  }
}
</script>
