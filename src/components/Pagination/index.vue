<template>
  <div v-if="total>0">
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-sizes="[10,20, 40, 60, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to.js'
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      scrollTo(0, 800)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      scrollTo(0, 800)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
