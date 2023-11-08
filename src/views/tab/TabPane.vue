<template>
  <el-table v-loading="loading" :data="list" border>
    <el-table-column type="index" label="Index" align="center" width="60" />
    <el-table-column prop="name" label="Name" width="80" align="center" />
    <el-table-column prop="job" label="Job" width="80" align="center" />
    <el-table-column prop="phone" label="Phone" align="center" width="120" />
    <el-table-column prop="gender" label="Gender" align="center" width="90" />
    <el-table-column prop="entryDate" label="Date" width="120" align="center" />
    <el-table-column prop="IDNumber" label="ID" align="center" />
    <el-table-column prop="address" label="Address" align="center" />
  </el-table>
</template>

<script>
import { fetchEmployeeList } from '@/api/employee'
export default {
  name: 'TabPane',
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        job: 0,
        limit: 5,
        page: 1
      },
      loading: true
    }
  },
  watch: {
    type() {
      this.fetchList()
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.loading = true
      this.listQuery.job = this.type
      fetchEmployeeList(this.listQuery).then((res) => {
        // console.log(res.data,234);
        this.list = res.data.list

        // simulate request time
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    }
  }
}
</script>
