<template>
  <div>
    <div id="main" />
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {

    }
  },

  created() {

  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        color: ['#67F9D8', '#FFE434'],
        title: {
          text: 'Basic Radar Chart'
        },
        legend: {
          data: ['小李', '小王']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '摸鱼', max: 100 },
            { name: '早退', max: 100 },
            { name: '迟到', max: 100 },
            { name: '加班', max: 100 },
            { name: '休息', max: 100 },
            { name: '工作', max: 100 }
          ],
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          }
        },
        series: [

          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [10, 50, 48, 60, 20, 60],
                name: '小李'
              },
              {
                value: [29, 50, 52, 60, 20, 20],
                name: '小王'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang='scss'>
#main{
  width: 600px;
  height: 500px;
}
</style>
