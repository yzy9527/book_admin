<template>
  <div class="top-view">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <total-sales />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-orders />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <today-user />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-users />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TotalSales from '@/components/datav/TotalSales'
import TotalUsers from '@/components/datav/TotalUsers'
import TodayUser from '@/components/datav/TodayUser'
import TotalOrders from '@/components/datav/TotalOrders'

export default {
  components: {
    TotalSales,
    TotalUsers,
    TodayUser,
    TotalOrders
  }
}
</script>

<style scoped>

</style>
