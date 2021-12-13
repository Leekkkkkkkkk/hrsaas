<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
    <el-col>
      <span>{{ obj.label }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ obj.label }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },

  created() {

  },

  methods: {

  }
}
</script>

<style scoped lang='scss'>
.el-row{
  width: 100%;
}
</style>
