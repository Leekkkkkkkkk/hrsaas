<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools :obj="compInfo" :is-root="true" />
        <!-- //树形组件 -->
        <el-tree :data="treeData" :props="defaultProps" :default-expand-all="true">
          <!-- <tree-tools /> -->
          <tree-tools slot-scope="{data}" :obj="data" @add-dept="onAdd" />
        </el-tree>
      </el-card>
      <add-dept v-model="dialogVisible" :node="node" />
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getdepartment } from '@/api/organization.js'
import { transListToTree } from '@/utils/index.js'
import AddDept from './components/add-dept.vue'
export default {
  components: { treeTools, AddDept },
  data() {
    return {
      treeData: [],
      compInfo: { name: '黑客帝国', manager: '负责人' },
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false,
      node: {}
    }
  },

  created() {
    this.getDepartmentInfo()
  },

  methods: {
    handleNodeClick() {},
    async getDepartmentInfo() {
      const res = await getdepartment()
      console.log(res)
      this.treeData = transListToTree(res.depts, '')
    },
    onAdd(obj) {
      this.dialogVisible = true
      this.node = obj
    }
  }
}
</script>

<style scoped >

</style>
