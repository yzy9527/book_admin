<template>
  <div class="upload-container">
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="false"
      :limit="1"
      :before-remove="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-error="onError"
      :file-list="fileList"
      :on-exceed="onExcessd"
      :disabled="disabled"
      accept="application/epub+zip"
      class="image-uploade"
      show-file-list
      drag
    >
      <i class="el-icon-upload" />
      <div
        v-if="fileList.length === 0"
        class="el-upload__text"
      >
        请将电子书拖入或
        <em>点击上传</em>
      </div>
      <div
        v-else
        class="el-upload__text"
      >图书已上传</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '../../utils/auth'
export default {
  components: {

  },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // upload不会调用request中的方法
      action: `${process.env.VUE_APP_BASE_API}/book/upload`
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    beforeUpload(file) {
      this.$emit('beforeUpload', file)
    },
    onRemove(file) {
      this.$message({
        message: '电子书删除成功',
        type: 'success'
      })
      this.$emit('onRemove', file)
    },
    onSuccess(response, file) {
      const { code, msg, data } = response
      if (code === 0) {
        this.$message({
          message: msg,
          type: 'success'
        })
        this.$emit('onSuccess', data)
      } else {
        this.$message({
          message: msg && `上传失败：失败原因：${msg}` || '上传失败',
          type: 'error'
        })
        this.$emit('onError', file)
      }
    },
    onError(err) {
      const errMsg = (err.message && JSON.parse(err.message)) || '上传失败'
      this.$message({
        message: (errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || `上传失败`,
        type: 'error'
      })
      this.$emit('onError', err)
    },
    onExcessd() {
      this.$message({
        message: '每次只能上传一本电子书',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
</style>
