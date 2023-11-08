<template>
  <div>
    <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) of tabMapOptions"
        :key="item.label"
        :label="item.label"
        :name="index + ''"
      >
        <keep-alive>
          <TabPane :type="Number(activeTab)" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './TabPane.vue'
export default {
  name: 'Tab',
  components: { TabPane },
  data() {
    return {
      // mock job data is 0-3
      tabMapOptions: [
        { label: 'UI设计师' },
        { label: '前端开发' },
        { label: '后端开发' },
        { label: '产品经理' }
      ],
      activeTab: '0' // 绑定值，string，选中选项卡的 name
    }
  },
  methods: {
    handleClick(tab) {
      this.activeTab = tab.index
    }
  }
}
</script>
<style scoped></style>
