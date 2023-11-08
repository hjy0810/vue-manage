<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in levelList" :key="item.path">
      <span v-if="item.path === $route.path || item.redirect === $route.path" class="text">{{ item.meta.title }}</span>
      <a v-else class="hyper" @click.prevent="handleClick(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      levelList: []
    }
  },
  watch: {
    $route: {
      handler() {
        // if (route.path.startsWith('/redirect/')) {
        //   return
        // }
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      // dashboard 固定
      if (!first.path.startsWith('/dashboard')) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    },
    handleClick(to) {
      // 如果即将要去的路由或者重定向到的路由就是当前路由，不会执行路由跳转
      if (to.path === this.$route.path || to.redirect === this.$route.path) {
        this.jump = false
        return false
      }
      this.jump = true
      this.$router.push(to.path)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 40px;
}
.text{
  text-decoration: none;
  color:#333;
}
.hyper{
  color:rgb(100, 177, 202);
}
</style>
