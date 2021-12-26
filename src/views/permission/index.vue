<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools :is-show-before="false">
        <template v-slot:after>
          <el-button type="primary" size="small" @click="showAdd('0',1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table row-key="id" :data="Permission" style="margin: 10px 0;">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button type="text" @click="showAdd(row.id,2)">添加</el-button>
            <el-button type="text" @click="showEdit(row)">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加权限 -->
    <el-dialog title="权限点" :visible.sync="showDialog" @close="close">
      <!-- 表单 -->
      <el-form ref="perForm" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="addPermission">确定</el-button>
          <el-button size="small" @click="close">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermission, addPermission, editPermission } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      Permission: [],
      showDialog: false,
      formData: {
        name: '', // 权限点名称
        code: '', // 权限标识
        description: '', // 权限描述
        enVisible: '0', // 权限启用状态
        type: '',
        pid: ''
      }
    }
  },

  created() {
    this.loadGetPermission()
  },

  methods: {
    async loadGetPermission() {
      const res = await getPermission()
      this.Permission = transListToTree(res, '0')
    },
    showAdd(pid, type) {
      this.showDialog = true
      this.formData.pid = pid
      this.formData.type = type
    },
    async addPermission() {
      if (this.formData.id) {
        console.log('编辑')
        await editPermission(this.formData)
      } else {
        await addPermission(this.formData)
        this.$message.success('添加成功')
      }
      this.close()
      this.loadGetPermission()
    },
    showEdit(row) {
      this.showDialog = true
      this.formData = { ...row }
    },
    close() {
      this.formData = {}
      this.showDialog = false
    }
  }
}
</script>

<style scoped lang='less'>

</style>
