<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import { importEmployees } from '@/api/employees'
export default {
  components: {
    UploadExcel
  },
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    async onSuccess({ header, results }) {
      console.log(header)
      console.log(results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const newArr = results.map(item => {
        const obj = {}
        Object.keys(userRelations).forEach(key => {
          if (key === '入职日期' || key === '转正日期') {
            obj[userRelations[key]] = this.formatDate(item[key], '/')
          } else {
            obj[userRelations[key]] = item[key]
          }
        })
        return obj
      })
      console.log(newArr)
      await importEmployees(newArr)
    },
    formatDate(numb, format) {
      const time = new Date(numb * 24 * 3600000)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
