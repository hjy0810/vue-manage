<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="tableQuery.name"
        placeholder="Name"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="tableQuery.job"
        placeholder="Job"
        clearable
        style="width: 90px"
      >
        <el-option
          v-for="(item, index) in jobList"
          :key="item"
          :label="item"
          :value="index"
        />
      </el-select>
      <el-select
        v-model="tableQuery.gender"
        placeholder="Gender"
        clearable
        style="width: 130px"
      >
        <el-option
          v-for="(item, index) in genderList"
          :key="item"
          :label="item"
          :value="index"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="tableData"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" label="Index" align="center" width="60" />
      <el-table-column prop="name" label="Name" width="80" align="center" />
      <el-table-column prop="job" label="Job" align="center" width="90" />
      <el-table-column prop="phone" label="Phone" align="center" width="120" />
      <el-table-column prop="gender" label="Gender" align="center" width="90" />
      <el-table-column
        prop="entryDate"
        label="Date"
        width="120"
        align="center"
      />
      <el-table-column prop="IDNumber" label="ID" align="center" />
      <el-table-column prop="address" label="Address" align="center" />
      <el-table-column
        label="Actions"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            Edit
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      class="pagination"
      :total="total"
      :limit.sync="tableQuery.limit"
      :page.sync="tableQuery.page"
      @pagination="getList"
    />

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form
        ref="form"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="100px"
        class="form-item"
      >
        <el-form-item label="姓名" prop="name" required style="width: 300px">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="职位" prop="job" required class="form-item">
          <el-select v-model="formData.job" placeholder="请选择职位">
            <el-option label="UI设计师" value="UI设计师" />
            <el-option label="前端开发" value="前端开发" />
            <el-option label="后端开发" value="后端开发" />
            <el-option label="产品经理" value="产品经理" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="phone"
          style="width: 300px"
          required
          class="form-item"
        >
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="姓别" prop="gender">
          <el-select v-model="formData.gender" placeholder="请选择性别">
            <el-option label="女" value="女" />
            <el-option label="男" value="男" />
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate" class="form-item">
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker
                v-model="formData.entryDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号" prop="IDNumber" class="form-item">
          <el-input v-model="formData.IDNumber" />
        </el-form-item>
        <el-form-item label="住址" prop="Address" class="form-item">
          <el-input v-model="formData.address" type="textarea" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchEmployeeList,
  updateEmployee,
  deleteEmployee,
  createEmployee
} from '@/api/employee'
import Pagination from '@/components/Pagination'
import { validPhone, validID } from '@/utils/validate'
export default {
  components: {
    Pagination
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    }
    const checkID = (rule, value, callback) => {
      if (validID(value)) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    }
    return {
      genderList: ['女', '男'],
      jobList: ['UI设计师', '前端开发', '后端开发', '产品经理'],
      listLoading: true,
      downloadLoading: false,
      tableData: [],
      multipleSelection: [],
      tableQuery: {
        page: 1,
        limit: 10,
        name: '',
        gender: '',
        job: ''
      },
      total: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      formData: {
        id: '',
        name: '',
        gender: '',
        job: '',
        phone: '',
        entryDate: '',
        IDNumber: ''
      },
      rules: {
        phone: [
          {
            required: true,
            validator: checkPhone,
            message: '请填写正确的手机号',
            trigger: 'blur'
          }
        ],
        IDNumber: [
          {
            required: true,
            validator: checkID,
            message: '请填写正确的ID',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getList(this.tableQuery)
  },
  methods: {
    // filter
    handleFilter() {
      this.tableQuery.page = 1
      this.getList(this.tableQuery)
    },
    handleCreate() {
      this.resetFormData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    resetFormData() {
      this.formData = {
        id: '',
        name: '',
        gender: '',
        job: '',
        phone: '',
        entryDate: new Date(),
        IDNumber: ''
      }
    },
    // table
    getList() {
      this.listLoading = true
      fetchEmployeeList(this.tableQuery).then((res) => {
        this.total = res.data.total
        const list = res.data.list
        // format tableData
        for (const item of list) {
          for (const [key, val] of Object.entries(item)) {
            key === 'gender' ? (item[key] = this.genderList[val]) : null
            key === 'job' ? (item[key] = this.jobList[val]) : null // mock 0-3
          }
        }
        this.tableData = list

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.formData = Object.assign({}, row)
      this.dialogStatus = 'edit'
    },
    handleDelete(row, index) {
      console.log(row, index, 2234)
      const id = row.id
      deleteEmployee(id).then(() => {
        const index = this.tableData.findIndex((item) => item.id === id)
        this.tableData.splice(index, 1)
        this.$notify({
          title: 'Success',
          message: 'delete Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },

    // dialog
    updateData() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const temp = Object.assign({}, this.formData)
          updateEmployee(temp).then(() => {
            const index = this.tableData.findIndex(
              (item) => item.id === temp.id
            )
            this.tableData.splice(index, 1, temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    createData() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          createEmployee(this.formData).then(() => {
            this.formData.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.tableData.unshift(this.formData)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Create Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-container {
  margin-bottom: 30px;
}
.pagination {
  margin-top: 40px;
  margin-bottom: 20px;
}
.form-item {
  width: 400px;
}
</style>
