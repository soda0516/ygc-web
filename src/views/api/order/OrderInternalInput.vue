<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="调拨单据录入">
        <el-card class="box-card">
          <div slot="header" style="text-align: center">
            <span style="text-align: center">保障大队内部管材转移单</span>
          </div>
          <OrderInternalForm :order-type="orderType" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="当天单据浏览">
        <OrderInternalModifyForm ref="showToday" :today="true"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderInternalForm from './components/OrderInternalForm'
import OrderInternalModifyForm from './components/OrderInternalModifyForm'
export default {
  name: 'OrderInInput',
  components: { OrderInternalForm, OrderInternalModifyForm },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      formData: {

      },
      orderType: 3,
      activeName: ''
    }
  },
  watch: {
    'activeName': function(val) {
      if (val > 0) {
        this.$refs.showToday.initOrderList()
      }
    }
  }
}
</script>

<style scoped>

</style>
