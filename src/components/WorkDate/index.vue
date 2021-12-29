<template>
  <div>
    <el-row :gutter="10">
      <el-col :offset="16" :span="4">
        <el-select v-model="year" size="mini" @change="updateValue">
          <el-option v-for="item in selectyear" :key="item" :value="item" :label="item" />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="month" size="mini" @change="updateValue">
          <el-option v-for="item in 12" :key="item" :value="item" :label="item" />
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentValue">
      <template v-slot:dateCell="{date}">
        <span>{{ date.getDate() }}</span>
        <span v-if="date.getDay()===6 || date.getDay()===0" class="rest">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: '',
      month: 0,
      selectyear: [],
      currentValue: new Date()
    }
  },

  created() {
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    this.selectyear = Array(11).fill(this.year).map((item, index) => (item - 5 + index))
    console.log(this.selectyear)
  },
  methods: {
    updateValue(val) {
      console.log(val)
      this.currentValue = new Date(this.year + '-' + this.month) - 0
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-calendar__header{
  display: none;
}
::v-deep .el-calendar-table tr td {
  border: none;
}
::v-deep .el-calendar__header {
   display: none
 }
 ::v-deep .el-calendar-table tr td {
  border: none;
}
.rest{
    background: #fa7c4d;
    display: inline-block;
    position: relative;
    top: -1px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
}
</style>
