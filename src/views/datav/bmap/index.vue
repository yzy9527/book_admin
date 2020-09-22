<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <span>3D地球</span>
          <el-button type="text" class="button">点击预览</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Bmap',
  data() {
    return {
      list: [{

      }],
      currentDate: new Date()
    }
  }
}
</script>

<style scoped>

.el-card{
  width: 280px;
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
  object-fit: contain;
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
