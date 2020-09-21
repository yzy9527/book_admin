import request from '@/utils/datav-request'

// 报表/大屏数据
export function screenData() {
  return request({
    url: '/report/data.json',
    methods: 'get'
  })
}

// 报表地图散点数据
export function mapScatter() {
  return request({
    url: '/report/scatter.json',
    methods: 'get'
  })
}

// 报表词云数据
export function wordcloud() {
  return request({
    url: '/report/wordcloud.json',
    methods: 'get'
  })
}

// 数据大屏地图数据
export function map() {
  return request({
    url: '/report/map',
    methods: 'get'
  })
}
