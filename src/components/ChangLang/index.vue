<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="onChange">
      <el-option
        v-for="item in lang"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'ChangeLang',
  data() {
    return {
      lang: [
        { label: '中文', value: 'zh' },
        { label: '英文', value: 'en' }
      ],
      value: Cookies.get('lang')
    }
  },
  created() {
  },
  methods: {
    onChange(val) {
      this.$i18n.locale = val
      Cookies.set('lang', this.value)
    }
  }
}
</script>
<style scoped lang='less'>
</style>
