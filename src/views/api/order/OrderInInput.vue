<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="入库单据录入">
        <el-card class="box-card">
          <div slot="header" style="text-align: center">
            <span style="text-align: center">周转管材回收入库验收单</span>
          </div>
          <OrderInOutForm :order-type="orderType" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="当天单据浏览">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderInOutForm from './components/OrderInOutForm'
export default {
  name: 'OrderInInput',
  components: { OrderInOutForm },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      formData: {

      },
      orderType: 1
    }
  }
}
</script>

<style scoped>

</style>
