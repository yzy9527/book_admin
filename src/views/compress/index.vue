<template>
  <div class="container">
    <h4>canvas方式</h4>
    <el-row :gutter="10">
      <el-col :span="6">
        <span>最大宽度：</span>
        <el-input-number
          v-model="outputMaxW"
          :controls="false"
          :min="1"
          label="描述文字"
          style="width: 120px"
        />
      </el-col>
      <el-col :span="6">
        <span>最大高度：</span>
        <el-input-number
          v-model="outputMaxH"
          :controls="false"
          :min="1"
          label="描述文字"
          style="width: 120px"
        />
      </el-col>
      <el-col :span="6">
        <span>图片质量：</span>
        <el-input-number
          v-model="quality"
          :controls="false"
          :min="0"
          :max="1"
          style="width: 120px"
        />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px">
      <input ref="upload" type="file">
    </div>
    <img :src="url" alt="">
  </div>
</template>

<script>
export default {
  name: 'ImgCompress',
  data() {
    return {
      url: '',
      MAXSIZE: 1024 * 1024, // 文件上传大小限制
      acceptType: ['image/jpg', 'image/jpeg'],
      outputMaxW: 800, // 输出最大宽度
      outputMaxH: 800, // 输出最大高度
      quality: 0.9,
      file: null
    }
  },
  computed: {
    MAXSIZE_STR() {
      return this.MAXSIZE / 1024 + 'MB'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getFile(compressImage) {
      this.url = compressImage
    },
    init() {
      const upload = this.$refs.upload
      const fileChange = (e) => {
        [this.file] = e.target.files
        // console.log(e)
        if (!this.file) {
          return
        }
        const { type: fileType, size: fileSize } = this.file
        // 检查图片类型
        if (this.acceptType.indexOf(fileType) < 0) {
          this.$message({
            message: `不支持[${fileType}]文件类型`,
            type: 'warning'
          })
          return
        }
        // 检查文件大小
        if (fileSize > this.MAXSIZE) {
          this.$message({
            message: `文件超出${this.MAXSIZE_STR}!`,
            type: 'warning'
          })
          upload.value = ''
          return
        }
        this.convertImgToBase64(this.file)
      }
      upload.addEventListener('change', fileChange)
      this.$once('hook:beforeDestroy', () => {
        upload.removeEventListener('change', fileChange)
      })
    },
    convertImgToBase64(file) {
      let reader = new FileReader()
      // readAsDataURL 方法会读取指定的 Blob 或 File 对象
      reader.readAsDataURL(file)
      const readFile = (e) => {
        const base64Imgage = e.target.result
        // const base64Imgage = reader.result
        // console.log(base64Imgage)
        this.compress(base64Imgage)
        reader = null
      }
      reader.addEventListener('load', readFile)
      this.$once('hook:beforeDestroy', () => {
        reader.removeEventListener('load', readFile)
      })
    },
    compress(base64Imgage) {
      // console.log(base64Imgage)
      const image = new Image()

      const compressImg = () => {
        let w = this.outputMaxW
        let h = this.outputMaxH
        let ratio // 图片压缩比
        let needCompress = false // 是否需要压缩
        // console.log(image.naturalWidth, image.naturalHeight)
        if (w < image.naturalWidth) {
          needCompress = true
          ratio = image.naturalWidth / w
          h = image.naturalHeight / ratio
        }
        if (h < image.naturalHeight) {
          needCompress = true
          ratio = image.naturalHeight / h
          w = image.naturalWidth / ratio
        }
        // 不需要压缩
        if (!needCompress) {
          w = image.naturalWidth
          h = image.naturalHeight
        }
        console.log('ratio', ratio)
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', '__compress__')
        canvas.width = w
        canvas.height = h
        canvas.style.visibility = 'hidden'

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, w, h)// 清空矩形内所有内容
        ctx.drawImage(image, 0, 0, w, h)
        const compressImage = canvas.toDataURL('image/jpeg', this.quality)
        this.getFile(compressImage)

        // const _image = new Image()
        // _image.src = compressImage
        // document.body.appendChild(_image)
        canvas.remove()
        // console.log(`压缩比：${image.src.length / _image.src.length}`)
      }
      image.addEventListener('load', compressImg)
      this.$once('hook:beforeDestroy', () => {
        image.removeEventListener('load', compressImg)
      })
      image.src = base64Imgage
    },
    handleReset() {
      this.outputMaxW = 800
      this.outputMaxH = 800
      this.quality = 0.9
      this.url = ''
      this.file = null
      this.$refs.upload.value = ''
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  padding: 20px;
  .el-row{
    margin: 20px 0;
  }
}
</style>
