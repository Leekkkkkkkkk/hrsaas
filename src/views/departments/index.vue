<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools />
        <!-- //树形组件 -->
        <el-tree :data="treeData" :default-expand-all="true">
          <!-- <tree-tools /> -->
          <tree-tools slot-scope="{data}" :obj="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
export default {
  components: { treeTools },
  data() {
    return {
      treeData: [
        {
          label: '张三',
          children: [
            {
              label: '张小三'
            },
            {
              label: '王小三'
            }
          ]
        },
        {
          label: '李四',
          children: [
            {
              label: '张小三'
            },
            {
              label: '王小三'
            }
          ]
        }
      ]
    }
  },

  created() {

  },

  methods: {
    handleNodeClick() {}
  }
}
</script>

<style scoped >

</style>
