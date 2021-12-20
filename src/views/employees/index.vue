<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :is-show-before="false">
        <template #after>
          <el-button size="small" type="primary">导入</el-button>
          <el-button size="small" type="primary">导出</el-button>
          <el-button size="small" icon="el-icon-plus" type="primary" @click="addEmployeesDialogVisible=true">新增员工</el-button>
        </template>
      </pageTools>
      <!-- 表格 -->
      <!-- 放置表格和分页 -->
      <el-card style="margin: 10px 0;">
        <el-table border :data="epmloyeesList">
          <el-table-column label="序号" sortable type="index" width="80" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formmatType" />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable prop="enableState" />
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination :total="total" layout="prev, pager, next" :page-size="query.size" @current-change="handleCurrentChange" />
        </el-row>
      </el-card>
      <add-employees v-model="addEmployeesDialogVisible" />
    </div>
  </div>
</template>

<script>
import { getEmployeesList } from '@/api/employees'
import employees from '@/api/constant/employees'
import addEmployees from './components/add-employees.vue'
const { hireType } = employees
export default {
  components: { addEmployees },
  data() {
    return {
      query: {
        page: 1,
        size: 5
      },
      epmloyeesList: [],
      total: 0,
      addEmployeesDialogVisible: true
    }
  },

  created() {
    this.getEmployeesListData()
  },
  methods: {
    async getEmployeesListData() {
      const res = await getEmployeesList(this.query)
      console.log(res)
      this.epmloyeesList = res.rows
      this.total = res.total
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.getEmployeesListData()
    },
    formmatType(row, column, cellValue, index) {
      const findItem = hireType.find(item => item.id === cellValue)
      return findItem ? findItem.value : '聘用形式错误'
    }
  }
}
</script>

<style scoped lang='less'>

</style>
