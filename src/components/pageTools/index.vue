<template>
  <div>
    <el-card>
      <el-row type="flex">
        <el-col>
          <slot name="before">
            <el-tag v-if="isShowBefore">
              <i class="el-icon-warning" />
              {{ tip }}
            </el-tag>
          </slot>
        </el-col>
        <el-col class="right-col">
          <slot name="after" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String || Number,
      default: ''
    },
    isShowBefore: {
      type: Boolean,
      default: true
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
.right-col{
  display: flex;
  justify-content:flex-end ;
}
</style>
