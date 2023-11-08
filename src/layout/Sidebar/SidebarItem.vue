<template>
  <li v-if="!route.hidden">
    <el-menu-item v-if="menuRoute" :index="resolvePath(menuRoute.path)" :class="{'submenu-title-noDropdown':!isNest}">
      <Item :icon="menuRoute.meta && menuRoute.meta.icon" :title="menuRoute.meta && menuRoute.meta.title" />
    </el-menu-item>

    <el-submenu v-else :index="resolvePath(route.path)" popper-append-to-body>
      <template v-if="route.meta" slot="title">
        <Item :icon="route.meta.icon" :title="route.meta.title" />
      </template>
      <SidebarItem
        v-for="child in subMenuRoutes"
        :key="child.path"
        :route="child"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </li>
</template>

<script>
import path from 'path'
import Item from './Item.vue'
export default {
  name: 'SidebarItem',
  components: {
    Item
  },
  props: {
    route: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    menuRoute() {
      // 没有children 或者有children但是children中只有一项，认为是 menu-item
      const children = this.route.children
      if (!children) {
        return this.route
      }
      if (children && children.length === 1) {
        return children[0]
      }
      return false
    },
    subMenuRoutes() {
      // 有children而且children 中不止一项，认为是 sub-menu
      const isSubMenu = this.route.children && this.route.children.length >= 1
      if (isSubMenu) {
        return this.route.children
      } else {
        return []
      }
    }
  },
  methods: {
    resolvePath(routePath) {
      // 递归到最深一层的路由时，直接使用父级路由传递的 base-path
      if (this.menuRoute && this.subMenuRoutes.length === 0) {
        return path.resolve(this.basePath, '')
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
