<template>
  <div class="navbar-container">

    <hamburger class="hamburger-container" :is-active="opened" @toggleClick="toggleSideBar" />

    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-tooltip content="全屏" class="right-menu-item" placement="bottom">
        <Screenfull />
      </el-tooltip>

      <el-dropdown trigger="click" class="right-menu-item">
        <div>
          <img :src="avatar" class="avatar">
          <i v-if="opened" class="el-icon-caret-bottom el-icon--right" />
          <i v-else class="el-icon-caret-top el-icon--right" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item icon="el-icon-s-home">Dashboard</el-dropdown-item>
          </router-link>
          <router-link to="/profile/index">
            <el-dropdown-item icon="el-icon-user">User-Info</el-dropdown-item>
          </router-link>
          <el-dropdown-item icon="el-icon-unlock" @click.native="logout">Log Out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  components: { Breadcrumb, Screenfull, Hamburger },
  computed: {
    ...mapGetters(['avatar', 'opened'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$notify({
        type: 'success',
        title: '退出成功',
        message: '请重新登陆'
      })
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variable';
.navbar-container {
  height: $navbarHeight;
  box-sizing: border-box;
  position: relative;
  padding: 10px 10px;
  border-bottom: 1px solid #bbb;
  box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.1);
  .hamburger-container {
    line-height: 38px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container{
    float: left;
  }
  .right-menu{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    float: right;
    height: 40px;
    margin-right: 10px;
    .right-menu-item{
      padding: 0 10px;
      cursor: pointer;
    }
    .avatar{
      width: 40px;
      height: 40px;
      border-radius: 20%;
      user-select: none;
    }
  }
}
</style>
