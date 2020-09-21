<template>
  <common-card
    title="累计用户数"
    :value="userToday"
  >
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">{{ userGrowthLastDay }}%</span>
        <div class="increase" />
        <span class="month">月同比</span>
        <span class="emphasis">{{ userGrowthLastMonth }}%</span>
        <div class="decrease" />
      </div>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions() {
      return {
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        series: [{
          name: '上月平台用户数',
          type: 'bar',
          stack: '总量', // 合并两个bar属性
          data: [this.userLastMonth],
          barWidth: 10, // 一个barWidth就可以了e
          itemStyle: { // 修改bar的颜色
            color: '#45c946'
          }
        }, {
          name: '今日平台用户数',
          type: 'bar',
          stack: '总量',
          data: [this.userTodayNumber],
          itemStyle: {
            color: '#eee'
          }
        }, {
          // 自定义图形
          type: 'custom',
          stack: '总量', // 合并在一起
          data: [this.userLastMonth], // 三角数值要和bar1保持一致

          renderItem: (params, api) => {
            const value = api.value(0) // 拿到200数值
            console.log(value)
            // 计算200的坐标，将数据和坐标进行关联
            const endPoint = api.coord([value, 0])
            console.log(endPoint) // [131.20000000000002, 25]  y轴居中所以为25

            return {
              type: 'group',
              children: [{
                type: 'path',
                // 坐标系
                position: endPoint,
                shape: {
                  // svg
                  d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                  x: -5,
                  y: -20,
                  width: 10,
                  height: 10,
                  // 将svg图标填充满width和height
                  layout: 'cover'
                },
                style: {
                  // 填充色
                  fill: '#45c946'
                }
              }, {
                type: 'path',
                // 坐标系
                position: endPoint,
                shape: {
                  // svg
                  d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                  x: -5,
                  y: 10,
                  width: 10,
                  height: 10,
                  layout: 'cover'
                },
                style: {
                  // 填充色
                  fill: '#45c946'
                }
              }]

            }
          }
        }]
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .total-users-footer {
    display: flex;
    align-items: center;

    .month {
      margin-left: 10px;
    }
  }
</style>

