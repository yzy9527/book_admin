<template>
  <el-card
    :body-style="{ padding: '0px' }"
  >
    <img :src="item.url" class="image">
    <div style="padding: 14px;">
      <div class="bottom clearfix">
        <span>{{ item.name }}</span>
        <el-button type="text" class="button" @click="handleClick(item.fileUrl)">点击预览</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'BMapCard',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleClick(fileUrl) {
      window.open(fileUrl)
    }
  }
}
</script>

<style scoped lang="scss">
.el-card{
  width: 280px;
  margin: 10px 20px 10px 0;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
