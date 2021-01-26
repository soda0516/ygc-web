<template>
  <div class="app-container">
    <OrderInOutModifyForm :modify-type="modifyType" :order-type="orderType" :today="false"/>
  </div>
</template>

<script>
import OrderInOutModifyForm from './components/OrderInOutModify'
export default {
  name: 'OrderOutModify',
  components: { OrderInOutModifyForm },
  data() {
    return {
      modifyType: 2,
      orderType: 2
    }
  }
}
</script>

<style scoped>

</style>
