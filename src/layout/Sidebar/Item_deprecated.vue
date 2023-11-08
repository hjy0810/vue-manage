<template>
  <li>
    <i v-if="icon.includes('el-icon')" :class="icon" class="sub-el-icon" />
    <SvgIcon v-else :icon-class="icon" />
    <span slot="title">{{ title }}</span>
  </li>
</template>

<script>
// TODO menu-item 在收缩时无法正确显示，可通过组件的 render 函数直接返回vnode
// https://blog.csdn.net/Boneex/article/details/130806744
export default {
  name: 'Item',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
