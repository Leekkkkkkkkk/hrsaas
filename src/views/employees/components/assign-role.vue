<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="close" @open="onOpen">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
      <!-- 选项 -->
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="onSave">确定</el-button>
        <el-button size="small" @click="close">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRolesList } from '@/api/roles'
import { getUserInfoById } from '@/api/user'
import { saveEmployeeAssignRole } from '@/api/employees'
export default {
  model: {
    prop: 'showRoleDialog'
  },
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roles: [],
      checkList: []
    }
  },
  methods: {
    async loadRoles() {
      const { rows } = await getRolesList()
      this.roles = rows
    },
    async loadUserInfoById() {
      const { roleIds } = await getUserInfoById(this.userId)
      this.checkList = roleIds
    },
    async onOpen() {
      await this.loadRoles()
      this.loadUserInfoById()
    },
    async onSave() {
      if (!this.checkList.length) return this.$message.error('角色不允许为空')
      await saveEmployeeAssignRole({
        id: this.userId,
        roleIds: this.checkList
      })
      this.$message.success('更新成功')
      this.close()
    },
    close() {
      this.$emit('input', false)
    }
  }
}
</script>
