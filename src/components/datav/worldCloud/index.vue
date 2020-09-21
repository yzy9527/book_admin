<template>
  <ve-wordcloud :settings="chartSettings" height="100%" :data="chartData" />
</template>

<script>

import commonDataMixin from '@/mixins/commonDataMixin'

// function getRows() {
//   return [{
//     'word': '上海',
//     'value': 100 * Math.random()
//   }, {
//     'word': '浙江',
//     'value': 100 * Math.random()
//   }, {
//     'word': '江苏',
//     'value': 100 * Math.random()
//   }, {
//     'word': '北京',
//     'value': 100 * Math.random()
//   }, {
//     'word': '新建',
//     'value': 100 * Math.random()
//   }, {
//     'word': '西藏',
//     'value': 100 * Math.random()
//   }]
// }

export default {
  mixins: [commonDataMixin],
  data() {
    return {
      chartData: {
        // columns: ['word', 'value'],
        // rows: getRows()
      },
      chartSettings: {
        color: ['rgba(97,216,0,.7)', 'rgba(204,178,26,.7)', 'rgba(245,166,35,.7)', 'rgba(156,13,113,.7)']
      }
    }
  },
  watch: {
    wordCloud() {
      const data = []
      this.wordCloud.forEach(item => {
        data.push({
          name: item.word,
          value: item.count
        })
      })
      this.chartData = {
        columns: ['name', 'value'],
        rows: data
      }
    }
  }

}
</script>

<style scoped>

</style>
