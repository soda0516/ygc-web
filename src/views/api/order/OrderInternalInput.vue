<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="调拨单据录入">
        <el-card class="box-card">
          <div slot="header" style="text-align: center">
            <span style="text-align: center">保障大队内部管材转移单</span>
          </div>
          <OrderInternalForm :order-type="orderType" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="当天单据浏览">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderInternalForm from './components/OrderInternalForm'
export default {
  name: 'OrderInInput',
  components: { OrderInternalForm },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      formData: {

      },
      orderType: 3
    }
  }
}
</script>

<style scoped>

</style>
