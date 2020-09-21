<template>
  <div>
    <common-card
      title="累计订单量"
      :value="orderToday"
    >
      <template>
        <v-chart :options="getOptions()" />
      </template>
      <template #footer>
        <span>作日订单量</span>
        <span class="emphasis">{{ orderLastDay }}</span>
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
    // data数据动态生成
    getOptions() {
      return this.orderTrend.length > 0 ? {
        xAxis: {
          type: 'category',
          show: false,
          // 默认true距离两侧有2个像素边距,
          boundaryGap: false

        },
        yAxis: {
          show: false
        },
        // 只要是在画布上画图形，bar或line都称之为series
        series: [{
          type: 'line',
          data: this.orderTrend,
          areaStyle: {
            color: 'purple'
          },
          // 线条隐藏
          lineStyle: {
            width: 0
          },
          // 圆点隐藏
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }],
        // 所有图都画在gride中,充满div
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }

      } : null
    }
  }
}
</script>

