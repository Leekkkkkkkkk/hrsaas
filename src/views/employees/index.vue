<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :is-show-before="false">
        <template #after>
          <el-button size="small" type="primary" @click="$router.push('/employees/import')">导入</el-button>
          <el-button size="small" type="primary" @click="onClick">导出</el-button>
          <el-button size="small" icon="el-icon-plus" type="primary" @click="addEmployeesDialogVisible=true">新增员工</el-button>
        </template>
      </pageTools>
      <!-- 表格 -->
      <!-- 放置表格和分页 -->
      <el-card style="margin: 10px 0;">
        <el-table border :data="epmloyeesList">
          <el-table-column label="序号" sortable type="index" width="80" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="头像" sortable>
            <template slot-scope="{row}">
              <img style="width:100px;hight:100px" :src="row.staffPhoto" alt="" @click="qcCode(row.staffPhoto)">
            </template>
          </el-table-column>
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
            <template slot-scope="{row}">
              <el-button type="text" size="small" :disabled="isDisabled(point.userAdd)" @click="$router.push('employees/detail/'+ row.id)">查看</el-button>
              <el-button type="text" size="small" :disabled="isDisabled(point.userZz)">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="setShowRoleDialog(row.id)">角色</el-button>
              <el-button type="text" size="small" :disabled="isDisabled(point.userDel)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination :total="total" layout="prev, pager, next" :page-size="query.size" @current-change="handleCurrentChange" />
        </el-row>
      </el-card>
      <add-employees v-model="addEmployeesDialogVisible" @add-success="getEmployeesListData" />
    </div>
    <!-- 二维码显示弹层 -->
    <el-dialog
      title="提示"
      :visible.sync="qrCodeShow"
      width="30%"
    >
      <canvas ref="code" />
      <span slot="footer" class="dialog-footer" />
    </el-dialog>
    <assign-role v-model="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import { getEmployeesList } from '@/api/employees'
import employees from '@/api/constant/employees'
import addEmployees from './components/add-employees.vue'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'
const { hireType } = employees
import mixinsPoint from '@/mixins/point'
export default {
  components: { addEmployees, AssignRole },
  mixins: [mixinsPoint],
  data() {
    return {
      query: {
        page: 1,
        size: 20
      },
      epmloyeesList: [],
      total: 0,
      addEmployeesDialogVisible: false,
      qrCodeShow: false,
      showRoleDialog: false,
      userId: ''
    }
  },
  created() {
    this.getEmployeesListData()
  },
  methods: {
    async getEmployeesListData() {
      const res = await getEmployeesList(this.query)
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
    },
    async onClick() {
      const { rows } = await getEmployeesList({
        page: 1,
        size: this.total
      })
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(headers) // 拿到是['手机号','名字']
      const data = rows.map(item => {
        // [{}{}]
        return header.map(key => {
          if (key === '聘用形式') {
            const findItem = hireType.find(hireItem => hireItem.id === item[headers[key] - 0])
            return findItem ? findItem.value : '未知'
          }
          return item[headers[key]]
        })
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header, // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          multiHeader: [['手机号', '', '', '', '', '', '']],
          merges: ['A1:A2'],
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    qcCode(imgUrl) {
      if (!imgUrl) return this.$message.error('该用户头像为空')
      this.qrCodeShow = true
      this.$nextTick(_ => {
        QrCode.toCanvas(this.$refs.code, imgUrl)
      })
    },
    setShowRoleDialog(id) {
      this.showRoleDialog = true
      this.userId = id
    }
  }
}
</script>

<style scoped lang='less'>

</style>
