
<template>
  <el-form
    ref="postForm"
    :model="postForm"
    :rules="rules"
  >
    <sticky :class-name="'sub-navbar'">
      <el-button
        v-if="!isEdit"
        @click="showGuide"
      >显示帮助</el-button>
      <el-button
        v-loading="loading"
        type="success"
        style="margin-left: 10px;"
        @click="submitForm"
      >{{ isEdit ? '编辑电子书' : '新增电子书' }}</el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <waring />
        <el-col :span="24">
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <md-input
              v-model="postForm.title"
              :maxlength="100"
              name="name"
              required
            >书名</md-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="作者"
                :label-width="labelWidth"
                placeholder="作者"
                prop="author"
              >
                <el-input v-model="postForm.author" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="出版社"
                :label-width="labelWidth"
                placeholder="出版社"
                prop="publisher"
              >
                <el-input v-model="postForm.publisher" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="12">
            <el-col :span="12">
              <el-form-item
                label="语言"
                :label-width="labelWidth"
                placeholder="语言"
                prop="language"
              >
                <el-input v-model="postForm.language" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="根文件"
                :label-width="labelWidth"
                placeholder="根文件"
                prop="rootFile"
              >
                <el-input
                  v-model="postForm.rootFile"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="文件路径"
                :label-width="labelWidth"
                placeholder="文件路径"
                prop="filePath"
              >
                <el-input
                  v-model="postForm.filePath"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="解压路径"
                :label-width="labelWidth"
                placeholder="解压路径"
                prop="unzipPath"
              >
                <el-input
                  v-model="postForm.unzipPath"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="封面路径"
                :label-width="labelWidth"
                placeholder="封面路径"
                prop="coverPath"
              >
                <el-input
                  v-model="postForm.coverPath"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="文件名称"
                :label-width="labelWidth"
                placeholder="文件名称"
                prop="originalName"
              >
                <el-input
                  v-model="postForm.originalName"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item
                label="封面"
                :label-width="labelWidth"
                placeholder="封面"
                prop="cover"
              >
                <a
                  v-if="postForm.cover"
                  :href="postForm.cover"
                  target="_blank"
                >
                  <img
                    :src="postForm.cover"
                    class="preview-img"
                  ></a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item
                label="目录"
                :label-width="labelWidth"
                prop="contents"
              >
                <div
                  v-if="contentsTree&&contentsTree.length>0"
                  class="contents-wrapper"
                >
                  <el-tree
                    :data="contentsTree"
                    @node-click="onContentClick"
                  />
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import sticky from '@/components/Sticky'
import ebookUpload from '@/components/EbookUpload'
import Waring from './waring'
import MdInput from '@/components/MDinput'
import { createBook, getBook, updateBook } from '@/api/book'

// const defaultForm = {
//   title: '',
//   author: '',
//   publisher: '',
//   language: '',
//   rootFile: '',
//   cover: '',
//   url: '',
//   originalName: '',
//   fileName: '',
//   coverPath: '',
//   filePath: '',
//   unzipPath: ''
// }
// 映射
const fields = {
  title: '书名',
  author: '作者',
  publisher: '出版社',
  language: '语言'
}
export default {
  components: {
    sticky,
    Waring,
    ebookUpload,
    MdInput
  },
  props: {
    isEdit: Boolean
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      console.log('value', fields[rule.field], value)
      if (value.length === 0) {
        callback(new Error(fields[rule.field] + '必须填写'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      postForm: {
        title: '',
        author: '',
        publisher: '',
        language: ''
      },
      fileList: [],
      contentsTree: [],
      labelWidth: '120px',
      rules: {
        title: [{ validator: validateRequire }],
        author: [{ validator: validateRequire }],
        publisher: [{ validator: validateRequire }],
        language: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const fileName = this.$route.params.fileName
      this.getBookData(fileName)
    }
  },
  methods: {
    getBookData(fileName) {
      getBook(fileName).then(res => {
        this.setData(res.data)
      })
    },
    onContentClick(data) {
      if (data.text) {
        window.open(data.text)
      }
    },
    showGuide() {
      this.loading = true
    },
    submitForm() {
      const onSuccess = (res) => {
        const { msg } = res
        this.$notify({
          title: '操作成功',
          message: msg,
          duration: 2000
        })
        this.loading = false
      }
      // if (!this.loading) {
      this.loading = true
      this.$refs.postForm.validate((valid, fields) => {
        console.log('valid', valid, this.postForm)

        if (valid) {
          // 对postForm进行浅拷贝，防止修改postform对象修改影响页面展示，浅拷贝2种方法
          // const book = {...this.postForm}
          const book = Object.assign({}, this.postForm)
          // 删除不需要的字段
          // delete book.contents
          delete book.contentsTree
          if (!this.isEdit) {
            // 如果是新增
            createBook(book).then(res => {
              onSuccess(res)
              this.setDafault()
            }).catch(() => {
              // 防止连点问题，报错取消loading
              this.loading = false
            })
          } else {
            // 如果是编辑
            updateBook(book).then(res => {
              onSuccess(res)
            }).catch(() => {
              // 防止连点问题，报错取消loading
              this.loading = false
            })
          }
        } else {
          // 获取验证错误的信息
          const message = fields[Object.keys(fields)[0]][0].message
          this.$message({
            message,
            type: 'error'
          })
          this.loading = false
        }
      })
      // }
    },
    setData(data) {
      // 开始解构
      const {
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        url,
        originalName,
        contents,
        fileName,
        coverPath,
        filePath,
        unzipPath,
        contentsTree
      } = data
      this.postForm = {
        ...this.postForm,
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        url,
        originalName,
        contents,
        fileName,
        coverPath,
        filePath,
        unzipPath,
        contentsTree
      }
      this.contentsTree = contentsTree
      this.fileList = [{ name: originalName || fileName, url }]
    },
    setDafault() {
      // this.postForm = Object.assign({}, defaultForm)
      this.contentsTree = []
      this.fileList = []
      // 对该表单项进行重置，将其值重置为初始值并移除校验结果
      this.$refs.postForm.resetFields()
    },
    onUploadSuccess(data) {
      console.log('onUploadSuccess', data)
      this.setData(data)
    },
    onUploadRemove() {
      console.log('onUploadRemove')
      this.setDafault()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 40px 50px 30px;
  .preview-img {
    width: 200px;
    height: 270px;
  }
}
</style>
