<template>
  <div class="container">
    <el-link href="https://lbsyun.baidu.com/index.php?title=jspopularGL" target="_blank">百度地图官方文档</el-link>
    <div class="card-box">
      <BMapCard
        v-for="item in list"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import BMapCard from './components/BMapCard'
export default {
  name: 'Bmap',
  components: {
    BMapCard
  },
  data() {
    return {
      list: [{
        id: 1,
        name: '异步加载',
        url: 'https://qiniu.xiaoxilao.com/20200923133318.png',
        fileUrl: 'https://demo.xiaoxilao.com/project/vue/screen/bMap/indexSync.html'
      }, {
        id: 2,
        name: '3D地球',
        url: 'https://qiniu.xiaoxilao.com/20200923123329.png',
        fileUrl: 'https://demo.xiaoxilao.com/project/vue/screen/bMap/index-3d-earth.html'
      }, {
        id: 3,
        name: '轨迹地图',
        url: 'https://qiniu.xiaoxilao.com/20200923130532.png',
        fileUrl: 'https://demo.xiaoxilao.com/project/vue/screen/bMap/index-animation-track.html'
      }, {
        id: 4,
        name: '视图动画',
        url: 'https://qiniu.xiaoxilao.com/20200923131040.png',
        fileUrl: 'https://demo.xiaoxilao.com/project/vue/screen/bMap/index-animation.html'
      }, {
        id: 5,
        name: '飞线图',
        url: 'https://qiniu.xiaoxilao.com/20200923131225.png',
        fileUrl: 'https://demo.xiaoxilao.com/project/vue/screen/bMap/index-datav-line.html'
      }, {
        id: 6,
        name: '散点图',
        url: 'https://qiniu.xiaoxilao.com/20200923131446.png',
        fileUrl: 'https://demo.xiaoxilao.com/project/vue/screen/bMap/index-datav-point.html'
      }, {
        id: 7,
        name: '绘制图形',
        url: 'https://qiniu.xiaoxilao.com/20200923131622.png',
        fileUrl: 'https://demo.xiaoxilao.com/project/vue/screen/bMap/index-layer.html'
      }]
    }
  }

}
</script>

<style scoped lang="scss">
.container{
  padding: 20px;

  .el-link{
    margin: 20px 0;
  }

  .card-box{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
