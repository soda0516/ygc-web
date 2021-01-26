<template>
  <el-form
    ref="elForm"
    v-loading="loading"
    label-width="82px"
    label-position="right"
    style="padding-left: 5px;padding-right: 10px"
    size="small"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
  >
    <el-row>
      <el-col :span="7">
        <el-form-item label="交出单位">
          <el-input v-model="orderFormData.handOverCompany" placeholder="请录入交出单位" />
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="接收单位">
          <el-input v-model="orderFormData.receiptCompany" placeholder="请录入接收单位" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="增加科目">
          <el-select v-model="selectAddSubjectId" :disabled="addSubjectLoading" clearable value-key="id" placeholder="请选择" style="width: 100%;" @change="addSubjectChange">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="减少科目">
          <el-select v-model="selectSubtractSubjectId" clearable value-key="id" placeholder="请选择" style="width: 100%;" @change="subtractSubjectChange">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="6">
        <el-form-item label="调拨日期" label-position="left">
          <el-date-picker
            v-model="orderFormData.internalDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            :editable="false"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="交出人">
          <el-input v-model="orderFormData.handOverUser" placeholder="请录入交出人" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="接收人">
          <el-input v-model="orderFormData.receiptUser" placeholder="请录入接收人" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="操作类型">
          <el-select v-model="selectOperType" placeholder="请选择" style="width: 100%" @change="operTypeChange">
            <el-option
              v-for="item in operTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="单据备注">
          <el-input v-model="orderFormData.remark" placeholder="请录入备注" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="管材种类/规格型号：" label-width="150px" />
      </el-col>
      <el-col :span="4">
        <el-form-item label="调拨数量：" label-width="82px" />
      </el-col>
      <el-col :span="4">
        <el-form-item label="单价：" label-width="82px" />
      </el-col>
      <el-col :span="4">
        <el-form-item label="金额：" label-width="82px" />
      </el-col>
      <el-col :span="4">
        <el-form-item label="备注：" label-width="82px" />
      </el-col>
    </el-row>
    <OrderInternalDetailForm v-for="item in detailList" :key="item.id" :ref="item.detailRef" :detail-item="item" :product-list="productList" />
    <el-button type="primary" icon="el-icon-plus" circle @click="plusDetail" />
    <el-button type="danger" icon="el-icon-minus" circle @click="minusDetail" />
    <el-button type="danger" icon="el-icon-minus" :loading="submitButtonLoading" @click="submitOrder">提交订单</el-button>
  </el-form>
</template>

<script>
import OrderInternalDetailForm from './OrderInternalDetailForm'
export default {
  name: 'OrderInternalForm',
  components: { OrderInternalDetailForm },
  props: ['orderType', 'modifyOrderId', 'modify'],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      detailList: [
        {
          detailRef: 'detailRefEmpty0'
        },
        {
          detailRef: 'detailRefEmpty1'
        },
        {
          detailRef: 'detailRefEmpty2'
        },
        {
          detailRef: 'detailRefEmpty3'
        },
        {
          detailRef: 'detailRefEmpty4'
        },
        {
          detailRef: 'detailRefEmpty5'
        }
      ],
      orderFormData: {
        handOverCompany: '',
        receiptCompany: '',
        handOverUser: '',
        receiptUser: '',
        remark: '',
        storeId: 0,
        orderType: 3,
        operType: '',
        addSubject: '',
        subtractSubject: '',
        curatorId: 0,
        checkerId: 0,
        internalDate: ''
      },
      productList: [],
      selectOperType: '',
      operTypeList: [],
      submitButtonLoading: false,
      selectAddSubjectId: '',
      selectSubtractSubjectId: '',
      subjectList: [],
      orderTypeList: [],
      loading: false,
      addSubjectLoading: false
    }
  },
  watch: {
    selectAddSubjectId: {
      handler: function(newValue, oldValue) {
        if (!newValue) {
          this.orderFormData.addSubject = 0
        } else {
          this.orderFormData.addSubject = this.selectAddSubjectId
        }
      }
    },
    selectSubtractSubjectId: {
      handler: function(newValue, oldValue) {
        if (!newValue) {
          this.orderFormData.subtractSubject = 0
        } else {
          this.orderFormData.subtractSubject = this.selectSubtractSubjectId
        }
      }
    },
    selectOperType: {
      handler: function(newValue, oldValue) {
        if (!newValue) {
          this.orderFormData.operType = 0
        } else {
          this.orderFormData.operType = this.selectOperType
        }
      }
    }
  },
  created() {
    var that = this
    this.loading = true
    that.$axios.all([that.$getProductOptionList(), that.$getProductSubjectList(), that.$getOperTypeList()])
      .then(that.$axios.spread((res1, res2, res3) => {
        that.productList = res1.data
        that.subjectList = res2.data
        that.operTypeList = res3.data
      }))
      .finally(() => {
        // that.orderTypeList.shift()
        // that.orderTypeList.shift()
        that.operTypeList.shift()
        that.operTypeList.shift()
        that.loading = false
      })
  },
  methods: {
    addSubjectChange() {
      // 如果是小队间转移和外部转移，增加科目和减少科目智能选择一个
      if (this.orderFormData.operType === 4 || this.orderFormData.operType === 5) {
        if (this.selectAddSubjectId > 0) {
          this.selectSubtractSubjectId = ''
        }
      }
    },
    subtractSubjectChange() {
      // 如果是小队间转移和外部转移，增加科目和减少科目智能选择一个
      if (this.orderFormData.operType === 4 || this.orderFormData.operType === 5) {
        if (this.selectSubtractSubjectId > 0) {
          this.selectAddSubjectId = ''
        }
      }
    },
    plusDetail() {
      var index = this.detailList.length
      var refName = 'detailRefEmpty' + index
      var detail = { detailRef: refName }
      this.detailList.push(detail)
    },
    minusDetail() {
      if (this.detailList.length > 6) {
        this.detailList.pop()
      }
    },
    submitOrder() {
      var formDataDetailList = []
      for (let i = 0; i < this.detailList.length; i++) {
        var name = this.detailList[i].detailRef
        console.log(name)
        var detail = this.$refs[name][0].formDataDetail
        if (detail.productId) {
          formDataDetailList.push(this.$refs[name][0].formDataDetail)
        }
      }
      this.submitButtonLoading = true
      console.log(formDataDetailList)
      this.$request({
        url: '/order/orderInternal',
        method: 'post',
        params: {
          order: JSON.stringify(this.orderFormData),
          orderDetailList: JSON.stringify(formDataDetailList)
        }
      }).then(res => {
        console.log(res)
        console.log(this.modify)
      }).finally(() => {
        clearTimeout(this.timer) // 清除延迟执行
        this.timer = setTimeout(() => {
          // 设置延迟执行
          if (this.modify) {
            this.initFromModify(this.modifyOrderId)
          }
          this.submitButtonLoading = false
        }, 100)
      })
    },
    listOrder(id) {
      return this.$request.get('/order/orderInternal/' + id)
    },
    listOrderDetail(id) {
      return this.$request.get('/order/orderInternalDetail/list/order/' + id)
    },
    initFromModify(id) {
      this.loading = true
      this.submitButtonLoading = true
      this.$axios.all([this.listOrder(id), this.listOrderDetail(id)])
        .then(this.$axios.spread((order, orderDetail) => {
          this.loading = true
          this.submitButtonLoading = true
          var orderJson = order.data
          console.log('JSON.stringify(orderJson)')
          console.log(JSON.stringify(orderJson))
          this.orderFormData = orderJson
          this.detailList = orderDetail.data
          for (let i = 0; i < this.detailList.length; i++) {
            this.detailList[i].detailRef = 'detailRef' + this.detailList[i].id
          }
          this.loading = false
          this.submitButtonLoading = false
        }))
        .finally(() => {
          if (this.orderFormData.addSubject > 0) {
            this.selectAddSubjectId = this.orderFormData.addSubject
          } else {
            this.selectAddSubjectId = ''
          }
          if (this.orderFormData.subtractSubject > 0) {
            this.selectSubtractSubjectId = this.orderFormData.subtractSubject
          } else {
            this.selectSubtractSubjectId = ''
          }
          if (this.orderFormData.operType > 0) {
            this.selectOperType = this.orderFormData.operType
          } else {
            this.selectOperType = ''
          }
          if (this.orderFormData.operType === 6 || this.orderFormData.operType === 7) {
            this.selectAddSubjectId = 5
            this.addSubjectLoading = true
          } else {
            this.addSubjectLoading = false
          }
          this.submitButtonLoading = false
          this.loading = false
        })
    },
    operTypeChange() {
      if (this.selectOperType === 6 || this.selectOperType === 7) {
        this.selectAddSubjectId = 5
        this.selectSubtractSubjectId = ''
        this.addSubjectLoading = true
      } else {
        this.addSubjectLoading = false
        this.selectAddSubjectId = ''
        this.selectSubtractSubjectId = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
