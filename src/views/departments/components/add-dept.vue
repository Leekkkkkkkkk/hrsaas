<template>
  <el-dialog
    title="提示"
    :visible="value"
    width="50%"
    @close="onDialogClose"
  >
    <el-form ref="form" :rules="addDeptsRormRules" :model="addDeptsForm" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addDeptsForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="addDeptsForm.code" placeholder="请输入部门编码" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-input v-model="addDeptsForm.manager" placeholder="请输入部门负责人" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="addDeptsForm.introduce" placeholder="请输入部门介绍" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input',false)">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    const validDeptName = (rule, value, callback) => {
      if (!this.node.children) return callback()
      const flag = this.node.children.some(item => item.name === value)
      if (flag) {
        callback(new Error(`部门${value}已重复`))
      }
    }
    return {
      addDeptsForm: {
        name: '',
        manager: '',
        introduce: '',
        code: ''
      },
      addDeptsRormRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字', trigger: 'blur' },
          { validator: validDeptName, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'blur' },
          { min: 1, max: 10, message: '部门负责人长度在 1 到 10 个字', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 1, max: 50, message: '部门介绍长度在 1 到 50 个字', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 10, message: '部门编码长度在 1 到 10 个字', trigger: 'blur' }
        ]
      }
    }
  },

  created() {

  },

  methods: {
    onDialogClose() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
