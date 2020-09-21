function format(v) {
  // return (+v).toLocaleString() // 自动转为千分位，和本地语言相关，可能由于本地语言的差异，可能失效；v必须是数字
  // return v
  // d{1,3}匹配1或3个数字，优先匹配三个数字
  // ?=(\d{3})+$ 零宽度正预测先行断言 ,先判断后面表达式是否正确，再判断前面的
  // 123456789
  // 123的时候，对456 789 进行判断是否三个1组，否则进行下一个数字判断
  // 12345，对123判断 45 不成立三个
  // 12 345 成立
  const reg = /\d{1,3}(?=(\d{3})+$)/g

  return `${v}`.replace(reg, '$&,') // 获取正则匹配到的数字
}

function wrapperArray(o, k) {
  return o && o[k] ? o[k] : []
}

function wrapperNumber(o, k) {
  return o && o[k] ? format(o[k]) : 0
}

function wrapperOriginalNumber(o, k) {
  return o && o[k] ? o[k] : 0
}

function wrapperPercentage(o, k) {
  return o && o[k] ? `${o[k]}%` : '0%'
}

function wrapperMoney(o, k) {
  return o && o[k] ? `￥${format(o[k])}` : '￥0.00'
}

function wrapperObject(o, k) {
  if (o && k.indexOf('.') >= 0) {
    const keys = k.split('.')
    keys.forEach(key => {
      o = o[key]
    })
    return o
  } else {
    return o && o[k] ? o[k] : {}
  }
}

export default {
  inject: ['getReportData', 'getWordcloud', 'getMapData'],
  computed: {
    reportData() {
      return this.getReportData()
    },
    salesToday() {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesGrowthLastDay() {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth() {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesLastDay() {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    orderToday() {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay() {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend() {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    orderUser() {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    returnRate() {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    orderUserTrend() {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    orderUserTrendAxis() {
      return wrapperArray(this.reportData, 'orderUserTrendAxis')
    },

    userTodayNumber() {
      return wrapperOriginalNumber(this.reportData, 'userToday')
    },
    userToday() {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userLastMonth() {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    userGrowthLastDay() {
      return wrapperNumber(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth() {
      return wrapperNumber(this.reportData, 'userGrowthLastMonth')
    },
    // 销售额 --访问量
    orderFullYear() {
      return wrapperArray(this.reportData, 'orderFullYear')
    },
    orderFullYearAxis() {
      return wrapperArray(this.reportData, 'orderFullYearAxis')
    },
    orderRank() {
      return wrapperArray(this.reportData, 'orderRank')
    },
    userFullYear() {
      return wrapperArray(this.reportData, 'userFullYear')
    },
    userFullYearAxis() {
      return wrapperArray(this.reportData, 'userFullYearAxis')
    },
    userRank() {
      return wrapperArray(this.reportData, 'userRank')
    },
    // 关键词搜索
    wordCloud() {
      return this.getWordcloud()
    },
    category1() {
      return wrapperObject(this.reportData, 'category.data1')
    },
    category2() {
      return wrapperObject(this.reportData, 'category.data2')
    },
    mapData() {
      return this.getMapData()
    }

  },
  filters: {
    format(v) {
      return format(v)
    }
  }
}
