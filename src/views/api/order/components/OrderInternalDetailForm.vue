<template>
  <el-row :gutter="24">
    <el-col :span="8">
      <el-form-item label="" label-width="0px">
        <el-cascader
          v-model="value"
          :options="productList"
          style="width: 100%"
          clearable
          @change="handleChange"
        />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="" label-width="0px" prop="field124">
        <el-input v-model="formDataDetail.actualNum" type="number" placeholder="入库数量" @keyup.native="calculate" />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="" label-width="0px">
        <el-input v-model="formDataDetail.unitPrice" type="number" placeholder="单价" @keyup.native="calculate" />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="" label-width="0px">
        <el-input v-model="formDataDetail.totalFee" type="number" placeholder="金额" />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="" label-width="0px">
        <el-input v-model="formDataDetail.remark" placeholder="备注" style="width: 100%" />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'OrderInternalDetailForm',
  props: {
    productList: {
      type: Array,
      requirer: true
    },
    detailItem: {
      type: Object
    }
  },
  data() {
    return {
      formDataDetail: {
        orderId: 0,
        productCategoryId: 0,
        productId: 0,
        requestNum: 0,
        actualNum: 0,
        remark: '',
        extraRemark: '',
        unitPrice: 0.00,
        totalFee: 0.00,
        storeId: 0,
        orderType: 0,
        addSubject: 0,
        subtractSubject: 0,
        internalDate: '',
        operType: 0
      },
      value: []
    }
  },
  watch: {
    value: {
      handler: function(newValue, oldValue) {
        if (newValue.length <= 0) {
          this.initformDataDetail()
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.detailItem.id) {
      this.formDataDetail = this.detailItem
      var list = []
      list.push(this.formDataDetail.productCategoryId)
      list.push(this.formDataDetail.productId)
      this.value = list
    }
  },
  methods: {
    handleChange() {
      if (this.value.length > 1) {
        this.formDataDetail.productCategoryId = this.value[0]
        this.formDataDetail.productId = this.value[1]
      }
    },
    calculate() {
      this.formDataDetail.totalFee = (this.formDataDetail.actualNum * this.formDataDetail.unitPrice).toFixed(2)
    },
    initformDataDetail() {
      console.log('initformDataDetail')
      this.formDataDetail.productCategoryId = 0,
      this.formDataDetail.productId = 0,
      this.formDataDetail.requestNum = 0,
      this.formDataDetail.actualNum = 0,
      this.formDataDetail.remark = '',
      this.formDataDetail.extraRemark = '',
      this.formDataDetail.unitPrice = 0.00,
      this.formDataDetail.totalFee = 0.00,
      this.formDataDetail.storeId = 0,
      this.formDataDetail.orderType = 0,
      this.formDataDetail.addSubject = 0,
      this.formDataDetail.subtractSubject = 0,
      this.formDataDetail.internalDate = '',
      this.formDataDetail.operType = 0
    }
  }
}
</script>

<style scoped>

</style>
