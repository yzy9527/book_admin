<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        class="filter-item"
        style="width:200px"
        clearable
        placeholder="书名"
        @clear="handleFilter"
        @keyup.enter.native="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="listQuery.author"
        class="filter-item"
        style="width:200px"
        clearable
        placeholder="作者"
        @clear="handleFilter"
        @keyup.enter.native="handleFilter"
        @blur="handleFilter"
      />
      <el-select v-model="listQuery.category" class="filter-item" clearable placeholder="分类" @change="handleFilter">
        <el-option
          v-for="item in categoryList"
          :key="item.value"
          :label="item.label + '('+item.num + ')'"
          :value="item.label"
        />
      </el-select>
      <el-button v-waves style="margin-left:10px" type="primary" class="filter-item" icon="el-icon-left" @click="handleFilter">查询</el-button>
      <el-button type="primary" style="margin-left:5px" class="filter-item" icon="el-icon-left" @click="handleCreate">新增</el-button>
      <el-checkbox v-model="showCover" class="filter-item" style="margin-left:5px" @click="changeShowCover">显示封面</el-checkbox>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width:100%"
        :default-sort="defaultSort"
        @sort-change="sortChange"
      >
        <el-table-column
          label="ID"
          prop="id"
          sortable
          align="center"
          width="80"
        />
        <el-table-column
          align="center"
          prop="title"
          width="150"
          label="书名"
        >
          <template slot-scope="{row:{titleWrapper}}">
            <span v-html="titleWrapper" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="author"
          width="150"
          label="作者"
        >
          <template slot-scope="{row:{authorWrapper}}">
            <span v-html="authorWrapper" />
          </template>
        </el-table-column>
        <el-table-column label="出版社" prop="publisher" align="center" width="120" />
        <el-table-column label="分类" prop="categoryText" align="center" width="150" />
        <el-table-column label="语言" prop="language" align="center" width="150" />
        <el-table-column v-if="showCover" label="封面" align="center" width="150">
          <template slot-scope="{row:{cover}}">
            <a :href="cover" targer="_blank">
              <img :src="cover" style="width:120px;height:180px">
            </a>
          </template>
        </el-table-column>
        <el-table-column label="文件名" prop="fileName" align="center" width="100" />
        <el-table-column label="文件路径" prop="filePath" align="center" width="100">
          <template slot-scope="{row}">
            {{ row.filePath || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="封面路径" prop="coverPath" align="center" width="100">
          <template slot-scope="{row}">
            {{ row.coverPath || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="解压路径" prop="unzipPath" align="center" width="100">
          <template slot-scope="{row}">
            {{ row.unzipPath || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="上传人" prop="createUser" align="center" width="100">
          <template slot-scope="{row}">
            {{ row.createUser || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="上传时间" prop="createDt" align="center" width="100">
          <template slot-scope="{row}">
            {{ row.createDt|timeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
            <el-button type="text" style="color:#f56c6c" icon="el-icon-delete" @click="handleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
        @pagination="refresh"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import waves from '@/directive/waves/waves'
import { getCategory, listBook, deleteBook } from '@/api/book'
import { parseTime } from '../../utils'

export default {
  components: {
    pagination
  },
  directives: {
    waves
  },
  filters: {
    timeFilter(time) {
      return time ? parseTime(time, '{y}-{m}-{d} {h}:{i}') : '无'
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 20
      },
      showCover: false,
      categoryList: [],
      tableKey: 0,
      listLoading: true,
      list: [],
      total: 0,
      defaultSort: {}
    }
  },
  created() {
    this.parseQuery()
  },
  mounted() {
    this.getCategoryList()
    this.getList()
  },
  beforeRouteUpdate(to, from, next) {
    // 当路由发生变化是，如果path相同，判断query是否相等，不相等更新数据列表
    if (to.path === from.path) {
      const newQuery = Object.assign({}, to.query)
      const oldQuery = Object.assign({}, from.query)
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        this.getList()
      }
    }
    next()
  },
  methods: {
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      let sort = '+id'
      const listQuery = {
        page: 1,
        pageSize: 20,
        sort
      }
      if (query) {
        query.page && (query.page = +query.page)
        query.pageSize && (query.pageSize = +query.pageSize)
        query.sort && (sort = query.sort)
      }
      const sortSymbol = sort[0] // + -
      const sortColumn = sort.slice(1, sort.length)// id
      this.defaultSort = {
        prop: sortColumn,
        order: sortSymbol === '+' ? 'ascending' : 'descending'
      }
      // 如果两个参数相同，后面会覆盖前面
      this.listQuery = { ...listQuery, ...query }
    },
    wrapperKeyword(k, v) {
      function highlight(value) {
        return `<span style="color:red">${value}</span>`
      }
      if (!this.listQuery[k]) {
        return v
      } else {
        return v.replace(new RegExp(this.listQuery[k], 'ig'), v => highlight(v))
      }
    },
    getList() {
      this.listLoading = true
      listBook(this.listQuery).then(res => {
        const { list, count } = res.data
        this.list = list
        this.total = count
        this.listLoading = false
        // 高亮关键字
        this.list.forEach(book => {
          book.titleWrapper = this.wrapperKeyword('title', book.title)
          book.authorWrapper = this.wrapperKeyword('author', book.author)
        })
      })
    },
    getCategoryList() {
      getCategory().then(res => {
        this.categoryList = res.data
      })
    },
    refresh() {
      this.$router.push({
        path: '/book/list',
        query: this.listQuery
      })
    },
    handleFilter() {
      // 刷新后重置到第一页
      this.listQuery.page = 1
      this.refresh()
      // this.getList()
    },
    handleCreate() {
      this.$router.push('/book/create')
    },
    handleUpdate(row) {
      this.$router.push(`/book/edit/${row.fileName}`)
    },
    changeShowCover(value) {
      this.showCover = value
    },
    sortChange(data) {
      const { prop, order } = data
      this.sortBy(prop, order)
    },
    sortBy(prop, order) {
      if (order === 'ascending') {
        this.listQuery.sort = `+${prop}`
      } else {
        this.listQuery.sort = `-${prop}`
      }
      this.handleFilter()
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该电子书，是否继续', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBook(row.fileName).then(res => {
          this.$notify({
            title: '成功',
            message: res.msg || '删除电子书成功',
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
