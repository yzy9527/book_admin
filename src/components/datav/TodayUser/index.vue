<template>
  <div>
    <common-card
      title="今日交易用户数"
      :value="orderUser"
    >
      <template>
        <v-chart :options="getOptions()" />
      </template>
      <template #footer>
        <span>退货率 {{ returnRate }} </span>
        <span class="emphasis" />
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions() {
      return {
        color: ['#3398DB'], // 修改柱状图颜色
        tooltip: {},
        series: [{
          name: '用户实时交易量',
          type: 'bar',
          data: this.orderUserTrend,
          // 默认true距离两侧有2个像素边距,
          boundarboundaryGapyGap: false,
          barWidth: '60%'// 实际宽度的60%

        }],
        xAxis: {
          type: 'category',
          // 显示的时间
          data: this.orderUserTrendAxis,
          show: false
        },
        yAxis: {
          // 隐藏y
          show: false
        },
        // 充满div
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    }
  }

}
</script>

<style scoped>

</style>
