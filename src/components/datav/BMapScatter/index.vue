<template>
  <ve-bmap
    class="cs-map"
    :settings="chartSettings"
    :tooltip="chartTooltip"
    height="100%"
    :title="title"
    :tool-tip="{}"
    :series="chartSeries"
  />
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'

const convertData = function(data, geo) {
  const res = []
  data.forEach((item) => {
    const { name, value } = item
    const coord = geo[name]
    res.push({
      name,
      value: [...coord, value]
    })
  })
  return res
}

export default {
  name: 'BMap2',
  mixins: [commonDataMixin],

  data() {
    return {
      title: {
        text: '外卖销售数据大盘',
        subtext: '销售趋势统计',
        sublink: 'www.google.com',
        left: 'center'
      },
      chartTooltip: {},
      chartSettings: {
        key: 'jOvnLvmwAnvn94fc34gvk1YoOU77avsW',
        bmap: {
          center: [116.403613, 39.914245],
          zoom: 5,
          roam: false,
          mapStyle: {
            styleJson: [{
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'color': '#fdfdfd'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'label',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#999999'
              }
            }]
          }
        }
      },
      chartSeries: []
    }
  },
  watch: {
    mapData() {
      const { data, geo } = this.mapData
      console.log('this.mapData', this.mapData)
      this.chartSeries = [
        {
          name: '销售额', // tooltip显示的题目
          type: 'scatter', // 散点图
          coordinateSystem: 'bmap', // 坐标系统 ，采用百度
          data: convertData(data, geo),
          symbolSize: function(val) {
            return val[2] / 10 // 对点的大小进行定制，缩小10倍
          },
          encode: {
            value: 2 // 显示数组第二项
          },
          itemStyle: {
            color: 'purple'
          },
          label: {
            show: false,
            position: 'right',
            formatter: function(v) { // 显示自定义数据
              return `${v.data.name} - ${v.data.value[2]}`
            }
          },
          emphasis: { // 鼠标放到圆点 显示右侧label数据
            label: {
              show: true
            }
          }
        }, {
          name: 'Top 10',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: convertData(data.sort((a, b) => {
            return b.value - a.value
          }), geo).slice(0, 10),
          symbolSize: function(v) {
            return v[2] / 10
          },
          encode: {
            value: 2 // 显示数组第二项
          },
          label: {
            formatter: function(v) { // 显示自定义数据
              return `${v.data.name} - ${v.data.value[2]}`
            },
            position: 'right',
            show: true
          },
          hoverAnimation: true, // hover动画
          rippleEffect: {
            brushType: 'stroke' // 修改波纹样式
          },
          itemStyle: {
            color: 'purple',
            shadowColor: '#333',
            shadowBlur: 10 // 增加阴影
          }

        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .cs-map /deep/ .anchorBL{
    display: none;
  }
</style>
