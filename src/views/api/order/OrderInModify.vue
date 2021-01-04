<template>
  <div class="app-container">
    <OrderInOutModifyForm :modify-type="modifyType" :order-type="orderType"/>
  </div>
</template>

<script>
import OrderInOutModifyForm from './components/OrderInOutModify'
export default {
  name: 'OrderInModify',
  components: { OrderInOutModifyForm },
  data() {
    return {
      modifyType: 1,
      orderType: 1
    }
  }
}
</script>

<style scoped>

</style>
