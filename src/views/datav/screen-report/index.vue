<template>
  <div class="home">
    <top-view />
    <sale-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>

import TopView from '@/components/datav/TopView/index'
import BottomView from '@/components/datav/BottomView/index'
import MapView from '@/components/datav/MapView/index'
import SaleView from '@/components/datav/SalesView/index'
import { wordcloud, screenData, mapScatter } from '@/api/datav'

export default {
  name: 'Home',
  components: {
    TopView,
    BottomView,
    MapView,
    SaleView
  },
  provide() {
    return {
      getReportData: this.getReportData,
      getWordcloud: this.getWordcloud,
      getMapData: this.getMapData
    }
  },
  data() {
    return {
      reportData: null,
      wordcloud: null,
      mapData: null
    }
  },
  mounted() {
    wordcloud().then(data => { this.wordcloud = data })
    screenData().then(data => { this.reportData = data })
    mapScatter().then(data => { this.mapData = data })
  },
  methods: {
    getReportData() {
      return this.reportData
    },
    getWordcloud() {
      return this.wordcloud
    },
    getMapData() {
      return this.mapData
    }
  }

}
</script>

<style>
  .home{
    width: 100%;
    padding: 20px;
    background: #eee;
    box-sizing: border-box;
  }
</style>
