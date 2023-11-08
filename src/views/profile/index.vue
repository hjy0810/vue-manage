<template>
  <div>
    <el-descriptions title="当前用户信息" :column="1" border>
      <el-descriptions-item label="name">
        <el-tag size="small">{{ name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="roles">{{ roles }}</el-descriptions-item>
      <el-descriptions-item label="introduction">{{
        introduction
      }}</el-descriptions-item>
      <el-descriptions-item label="avatar">
        <el-image :src="avatar" class="avatar-container">
          <div slot="error">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['roles', 'avatar', 'name', 'introduction'])
  }
}
</script>
<style lang="scss" scoped>
.avatar-container {
  width: 100px;
  height: 100px;
}
</style>
