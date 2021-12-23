<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form ref="form" :model="form" label-width="120px" :rules="rules" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="form.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="form.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUser">更新</el-button>
                <el-button type="primary" @click="$router.back()">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" lazy>
            <user-detail />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-detail />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoById, updateUserInfoById } from '@/api/user'
import userDetail from './components/user-detail.vue'
import jobDetail from './components/job-detail.vue'
export default {
  name: 'Detail',
  components: { userDetail, jobDetail },
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不安全', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getUserInfoById()
  },

  methods: {
    async getUserInfoById() {
      const res = await getUserInfoById(this.$route.params.id)
      this.form = res
      console.log(res)
    },
    async updateUser() {
      try {
        await this.$refs.form.validate()
        await updateUserInfoById(this.form)
      } catch (err) {
        console.dir(err)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
