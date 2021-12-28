<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button icon="el-icon-plus" type="primary" size="mini" @click="addRoleVisible=true">新增角色</el-button>
            <el-table
              style="width: 100%;margin:15px 0"
              border
              :data="rolesDate"
            >
              <el-table-column
                type="index"
                label="序号"
                width="80"
              />
              <el-table-column
                prop="name"
                label="角色名"
                sortable
              />
              <el-table-column
                prop="description"
                label="描述"
                sortable
              />
              <el-table-column
                label="操作"
              >
                <template slot-scope="{row}">
                  <el-button type="text" @click="showRights(row.id)">分配权限</el-button>
                  <el-button type="text" @click="edit(row)">修改</el-button>
                  <el-button type="text" :disabled="isDisabled(point.rolesDel)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="queryData.page"
              :page-sizes="[2, 4, 8, 10]"
              :page-size="queryData.pagesieze"
              layout="total, sizes, prev, pager, next"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-row :gutter="20">
              <el-col :span="12" :offset="3">
                <div class="grid-content bg-purple">
                  <el-form ref="form" label-width="80px">
                    <el-form-item label="企业名称">
                      <el-input v-model="company.name" disabled />
                    </el-form-item>
                    <el-form-item label="公司地址">
                      <el-input v-model="company.companyAddress" disabled />
                    </el-form-item>
                    <el-form-item label="公司电话">
                      <el-input v-model="company.companyPhone" disabled />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="company.mailbox" disabled />
                    </el-form-item>
                    <el-form-item label="备注">
                      <el-input v-model="company.remarks" disabled />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          title="新增角色"
          :visible.sync="addRoleVisible"
          width="50%"
          @close="addDialogClose"
        >
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="活动名称" prop="description">
              <el-input v-model="form.description" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addRoleVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSave">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 权限 -->
        <el-dialog
          title="提示"
          :visible.sync="setRightsDialogVisible"
          width="50%"
          @close="defaultCheckedKeys=[]"
        >
          <el-tree ref="terrNode" node-key="id" check-strictly :default-checked-keys="defaultCheckedKeys" :data="treedata" :props="{label:'name'}" default-expand-all show-checkbox icon-class="  " />
          <span slot="footer" class="dialog-footer">
            <el-button @click="setRightsDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSaveRights">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCompanyInfo } from '@/api/company'
import { getRolesList, addRoles, editRole, getRolesInfo, setRoles } from '@/api/roles'
import { getPermission } from '@/api/permission'
import { transListToTree } from '@/utils'
import mixinsPoint from '@/mixins/point'
console.log(mixinsPoint)
export default {
  name: 'Setting',
  mixins: [mixinsPoint],
  data() {
    return {
      activeName: 'first',
      company: {},
      rolesDate: [],
      queryData: {
        page: 1,
        pagesieze: 5
      },
      total: 0,
      addRoleVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'change' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      setRightsDialogVisible: false,
      treedata: [],
      defaultCheckedKeys: [],
      rolesId: ''
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getCompanyInfo()
    this.loadRolesList()
  },

  methods: {
    async getCompanyInfo() {
      const res = await getCompanyInfo(this.companyId)
      console.log(res)
      this.company = res
    },
    // 获取数据
    async loadRolesList() {
      const res = await getRolesList(this.queryData)
      this.rolesDate = res.rows
      this.total = res.total
      console.log(res)
    },
    handleSizeChange(val) {
      this.queryData.pagesieze = val
      this.loadRolesList()
    },
    handleCurrentChange(val) {
      this.queryData.page = val
      this.loadRolesList()
    },
    // 添加编辑
    async onSave() {
      try {
        if (this.form.id) {
          await editRole(this.form)
          this.$message.success('更新成功')
        } else {
          await this.$refs.form.validate()
          await addRoles(this.form)
          this.$message.success('添加成功')
        }
        this.addRoleVisible = false
        this.loadRolesList()
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑
    edit(ite) {
      console.log(ite)
      this.form = { ...ite }
      // this.form = ite
      this.addRoleVisible = true
    },
    // 清空表单
    addDialogClose() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    // 添加权限
    async showRights(id) {
      this.setRightsDialogVisible = true
      const res = await getPermission()
      this.treedata = transListToTree(res, '0')
      const result = await getRolesInfo(id)
      this.defaultCheckedKeys = result.permIds
      this.rolesId = id
    },
    async onSaveRights() {
      const keys = this.$refs.terrNode.getCheckedKeys()
      if (!keys.length) return this.$message.error('请选择权限')
      console.log(keys)
      console.log(this.rolesId)
      await setRoles({ id: this.rolesId, permIds: keys })
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-tabs__item{
  width: 140px;
  text-align: center;
  font-size: 16px;
}
</style>
