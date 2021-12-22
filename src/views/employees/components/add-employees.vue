<template>
  <div>
    <el-dialog
      title="提示"
      :visible="visible"
      width="50%"
      @close="onClose"
    >
      <el-form ref="from" label-width="120px" :rules="rules" :model="form">
        <el-form-item prop="username" label="姓名">
          <el-input v-model="form.username" style="width:80%" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input v-model="form.mobile" style="width:80%" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="timeOfEntry" label="入职时间">
          <el-date-picker v-model="form.timeOfEntry" style="width:80%" placeholder="请选择入职时间" />
        </el-form-item>
        <el-form-item prop="formOfEmployment" label="聘用形式">
          <el-select v-model="form.formOfEmployment" style="width:80%" placeholder="请选择">
            <el-option v-for="item in hireType " :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="workNumber" label="工号">
          <el-input v-model="form.workNumber" style="width:80%" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item prop="departmentName" label="部门">
          <el-input v-model="form.departmentName" style="width:80%" placeholder="请选择部门" @focus="onDepartmentFocus" />
          <el-tree v-if="isShowTree" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </el-form-item>
        <el-form-item prop="correctionTime" label="转正时间">
          <el-date-picker v-model="form.correctionTime" style="width:80%" placeholder="请选择转正时间" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('input',false)">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getdepartment } from '@/api/organization'
import { transListToTree } from '@/utils/index.js'
import employees from '@/api/constant/employees'
import { addEmployees } from '@/api/employees'
export default {
  model: {
    prop: 'visible'
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        correctionTime: '',
        timeOfEntry: '',
        departmentName: '',
        workNumber: '',
        formOfEmployment: '',
        mobile: '',
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }, {
            pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['change', 'blur'] }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '入职时间', trigger: 'blur' }
        ]
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isShowTree: false,
      hireType: employees.hireType
    }
  },

  created() {

  },

  methods: {
    async  onDepartmentFocus() {
      const res = await getdepartment()
      this.data = transListToTree(res.depts, '')
      this.isShowTree = true
    },
    handleNodeClick(data) {
      this.form.departmentName = data.name
      this.isShowTree = false
      console.log(data)
    },
    onClose() {
      this.$emit('input', false)
      this.$refs.from.resetFields()
      this.isShowTree = false
    },
    async onSave() {
      try {
        await this.$refs.from.validate()
        await addEmployees(this.form)
        this.$emit('input', false)
        this.$emit('add-success')
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
