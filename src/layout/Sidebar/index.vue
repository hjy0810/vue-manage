<template>
  <el-scrollbar wrap-class="scrollbar-container">
    <el-menu
      mode="vertical"
      :collapse="opened"
      :default-active="activeMenu"
      :background-color="variable.menuBg"
      :text-color="variable.menuText"
      :active-text-color="variable.menuActiveText"
      :unique-opened="false"
      :router="true"
    >
      <SidebarItem v-for="route in accessRoutes" :key="route.path" :route="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import variable from '@/styles/variable.scss'
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(['accessRoutes', 'opened']),
    variable() {
      return variable
    },
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>

