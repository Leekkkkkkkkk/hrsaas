<template>
  <el-dialog
    :title="addDeptsForm.id ? '编辑部门' : '新增部门'"
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
        <el-select v-model="addDeptsForm.manager" placeholder="请选择部门负责人" @focus="getDeptsManager">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="addDeptsForm.introduce" placeholder="请输入部门介绍" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input',false)">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getEmployeesListSimple } from '@/api/employees'
import { getdepartment, addDepartments, getDepartmentsById, editDepartmentsById } from '@/api/organization'
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
    // 校验部门名称是否重复
    const validDeptName = async(rule, value, callback) => {
      let flag = false
      const res = await getdepartment()
      this.node.children = res.depts
      if (this.addDeptsForm.id) {
        const newArr = res.depts.filter(item => item.pid === this.node.pid && item.id !== this.node.id)
        flag = newArr.some(item => item.name === value)
      } else {
        if (!this.node.children) return callback()
        flag = this.node.children.some(item => item.name === value)
      }
      if (flag) {
        callback(new Error(`部门${value}已重复`))
      } else {
        callback()
      }
    }
    const validDepCode = async(rule, value, callback) => {
      // 校验部门编码是否重复
      const res = await getdepartment()
      let flag = false
      if (this.addDeptsForm.id) {
        const newArr = res.depts.filter(item => item.code !== this.node.code)
        flag = newArr.some(item => item.code === value)
      } else {
        flag = res.depts.some(item => item.code === value)
      }
      if (flag) return callback(new Error(`部门${value}已重复`))
      callback()
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
          { required: true, message: '请输入部门负责人', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 1, max: 50, message: '部门介绍长度在 1 到 50 个字', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 10, message: '部门编码长度在 1 到 10 个字', trigger: 'blur' },
          { validator: validDepCode }
        ]
      },
      options: []
    }
  },

  created() {

  },

  methods: {
    onDialogClose() {
      this.$emit('input', false)
      this.$refs.form.resetFields()
      this.addDeptsForm = {
        name: '',
        manager: '',
        introduce: '',
        code: ''
      }
    },
    async getDeptsManager() {
      const res = await getEmployeesListSimple()
      console.log(res)
      this.options = res
    },
    async onSave() {
      try {
        await this.$refs.form.validate()
        if (this.addDeptsForm.id) {
          await editDepartmentsById(this.addDeptsForm)
          this.$message.success('修改成功')
          this.$emit('edit-success')
        } else {
          this.addDeptsForm.pid = this.node.id
          await addDepartments(this.addDeptsForm)
          this.$message.success('添加成功')
          this.$emit('add-success')
        }
        this.onDialogClose()
      } catch (error) {
        console.dir(error)
      }
    },
    async getDeptsInfo(id) {
      console.log('发送请求', id)
      const res = await getDepartmentsById(id)
      this.addDeptsForm = res
      console.log(res)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
