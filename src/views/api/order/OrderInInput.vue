<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="入库单据录入">
        <el-card class="box-card">
          <div slot="header" style="text-align: center">
            <span style="text-align: center">周转管材回收入库验收单</span>
          </div>
          <OrderInOutForm :order-type="orderType" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="当天单据浏览">
        <OrderInOutModifyForm ref="showToday" :modify-type="modifyType" :order-type="orderType" :today="true" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderInOutForm from './components/OrderInOutForm'
import OrderInOutModifyForm from './components/OrderInOutModify'
export default {
  name: 'OrderInInput',
  components: { OrderInOutForm, OrderInOutModifyForm },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      formData: {

      },
      orderType: 1,
      modifyType: 1,
      activeName: ''
    }
  },
  watch: {
    'activeName': function(val) {
      if (val > 0) {
        this.$refs.showToday.initOrderList()
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
