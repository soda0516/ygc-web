<template>
  <div class="app-container">
    <OrderInternalModifyForm :today="false"/>
  </div>
</template>

<script>
import OrderInternalModifyForm from './components/OrderInternalModifyForm'
export default {
  name: 'OrderInternalModify',
  components: { OrderInternalModifyForm },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
