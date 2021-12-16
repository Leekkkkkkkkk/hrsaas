<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
    <el-col>
      <span>{{ obj.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ obj.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add-dept',obj)">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" @click.native="$emit('onEdit',obj)">查看部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" @click.native="onDel">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { getdepartments } from '@/api/organization'
export default {
  props: {
    obj: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    onDel() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await getdepartments(this.obj.id)
        this.$message('删除成功')
      }).catch()
    }
  }
}
</script>

<style scoped lang='scss'>
.el-row{
  width: 100%;
}
</style>
