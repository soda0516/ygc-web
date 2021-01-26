<template>
  <el-form
    ref="elForm"
    v-loading="loading"
    :model="formData"
    label-width="82px"
    label-position="right"
    style="padding-left: 5px;padding-right: 10px"
    size="small"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
  >
    <el-row>
      <el-col :span="5">
        <el-form-item label="采油大区">
          <el-select v-model="selectRegionId" value-key="id" placeholder="请选择" style="width: 100%;" @change="regionChange">
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="中心站">
          <el-select
            v-model="selectCenterId"
            value-key="id"
            placeholder="请选择"
            style="width: 100%;"
            clearable
            @change="centerChange"
          >
            <el-option
              v-for="item in centerList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="小站">
          <el-select v-model="selectStationId" no-data-text="请选择" value-key="id" clearable placeholder="请选择" style="width: 100%;" @change="stationChange">
            <el-option
              v-for="item in stationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item label="井号名称">
          <el-input v-model="orderFormData.wellName" placeholder="请输入井号名称" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="dataTitle" label-position="left">
          <el-date-picker
            v-model="orderFormData.orderDate"
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
      <el-col :span="6">
        <el-form-item label="作业项目">
          <el-input v-model="orderFormData.operItem" placeholder="请输入作业项目" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item :label="subjectTitle">
          <el-select v-model="orderFormData.subjectType" value-key="id" placeholder="请选择" style="width: 100%;" :disabled="orderType === 1">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="单据备注">
          <el-input v-model="orderFormData.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <el-form-item label="管材种类/规格型号：" label-width="150px" />
      </el-col>
      <el-col :span="3">
        <el-form-item label="井场数量：" label-width="82px" />
      </el-col>
      <el-col :span="3">
        <el-form-item label="入库数量：" label-width="82px" />
      </el-col>
      <el-col :span="3">
        <el-form-item label="单价：" label-width="82px" />
      </el-col>
      <el-col :span="3">
        <el-form-item label="金额：" label-width="82px" />
      </el-col>
      <el-col :span="3">
        <el-form-item label="备注：" label-width="82px" />
      </el-col>
    </el-row>
    <OrderInOutFormDetail v-for="item in detailList" :key="item.id" :ref="item.detailRef" :detail-item="item" :product-list="productList" />
    <el-button type="primary" icon="el-icon-plus" circle @click="plusDetail" />
    <el-button type="danger" icon="el-icon-minus" circle @click="minusDetail" />
    <el-button type="danger" icon="el-icon-minus" :loading="submitButtonLoading" @click="submitOrder">提交订单</el-button>
  </el-form>
</template>

<script>
import OrderInOutFormDetail from './OrderInOutFormDetail'
export default {
  name: 'OrderInOutForm',
  components: { OrderInOutFormDetail },
  props: ['orderType', 'modifyOrderId', 'modify'],
  data() {
    return {
      formData: {},
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
        wellName: '',
        wellId: '',
        regionId: '',
        centerId: '',
        stationId: '',
        subjectType: '',
        operItem: '',
        remark: '',
        storeId: 0,
        orderType: 0,
        curatorId: 0,
        checkerId: 0,
        orderDate: ''
      },
      productList: [],
      selectRegionId: '',
      selectCenterId: '',
      selectStationId: '',
      regionList: [],
      centerList: [],
      stationList: [],
      subjectList: [],
      dataTitle: '',
      subjectTitle: '',
      submitButtonLoading: false,
      timer: {},
      loading: false
    }
  },
  watch: {
    selectRegionId: {
      handler: function(newValue, oldValue) {
        if (!newValue) {
          this.orderFormData.regionId = 0
        }
      }
    },
    selectCenterId: {
      handler: function(newValue, oldValue) {
        if (!newValue) {
          this.orderFormData.centerId = 0
          this.selectStationId = ''
        }
      }
    },
    selectStationId: {
      handler: function(newValue, oldValue) {
        if (!newValue) {
          this.orderFormData.stationId = 0
        }
      }
    }
  },
  created() {
    this.loading = true
    this.$axios.all([this.$getProductOptionList(), this.$getAreaRegionList(), this.$getProductSubjectList()])
      .then(this.$axios.spread((res1, res2, res3) => {
        console.log(res1)
        console.log(res2)
        console.log(res3)
        this.productList = res1.data
        this.regionList = res2.data
        this.subjectList = res3.data
      }))
      .finally(() => {
        this.orderFormData.orderType = this.orderType
        if (this.orderType === 1) {
          this.dataTitle = '回收日期'
          this.subjectTitle = '增加科目'
          this.orderFormData.subjectType = 1
        } else if (this.orderType === 2) {
          this.dataTitle = '出库日期'
          this.subjectTitle = '减少科目'
          this.subjectList.shift()
          this.subjectList.pop()
          this.subjectList.pop()
        }
        this.loading = false
      })
  },
  mounted() {
  },
  methods: {
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
    regionChange(value) {
      this.selectCenterId = ''
      this.selectStationId = ''
      this.orderFormData.regionId = value
      this.$getAreaCenterListById(value)
        .then((res) => {
          console.log(res)
          this.centerList = res.data
        })
    },
    centerChange(value) {
      this.selectStationId = ''
      this.orderFormData.centerId = value
      this.$getAreaStationListById(value)
        .then((res) => {
          this.stationList = res.data.data
        })
    },
    stationChange(value) {
      this.orderFormData.stationId = value
    },
    setSelectedArea(regionId, centerId, stationId) {
      for (let i = 0; i < this.regionList.length; i++) {
        if (this.regionList[i].id === regionId) {
          this.selectedRegion = this.regionList[i]
        }
      }
      for (let i = 0; i < this.centerList.length; i++) {
        if (this.centerList[i].id === centerId) {
          this.selectedCenter = this.centerList[i]
        }
      }
      for (let i = 0; i < this.stationList.length; i++) {
        if (this.stationList[i].id === stationId) {
          this.selectedStation = this.stationList[i]
        }
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
      var url = ''
      if (this.orderType === 1) {
        url = '/order/orderIn'
      } else if (this.orderType === 2) {
        url = '/order/orderOut'
      }
      this.submitButtonLoading = true
      console.log(JSON.stringify(this.orderFormData))
      this.$request({
        url: url,
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
        }, 500)
      })
    },
    listOrder(id) {
      if (this.orderType === 1) {
        return this.$request.get('/order/orderIn/' + id)
      } else if (this.orderType === 2) {
        return this.$request.get('/order/orderOut/' + id)
      }
    },
    listOrderDetail(id) {
      if (this.orderType === 1) {
        return this.$request.get('/order/orderInDetail/list/' + id)
      } else if (this.orderType === 2) {
        return this.$request.get('/order/orderOutDetail/list/' + id)
      }
    },
    initFromModify(id) {
      var that = this
      this.loading = true
      this.submitButtonLoading = true
      this.$axios.all([this.listOrder(id), this.listOrderDetail(id)])
        .then(this.$axios.spread((order, orderDetail) => {
          this.loading = true
          this.submitButtonLoading = true
          var orderJson = order.data
          console.log('orderDetail')
          console.log(orderDetail)
          that.$axios.all([this.$getAreaRegionList(), this.$getAreaCenterListById(orderJson.regionId), this.$getAreaStationListById(orderJson.centerId)])
            .then(this.$axios.spread((regionList, centerList, stationList) => {
              that.regionList = regionList.data
              that.centerList = centerList.data
              that.stationList = stationList.data
              // that.setSelectedArea(orderJson.regionId, orderJson.centerId, orderJson.stationId)
            }))
            .finally(() => {
              this.orderFormData = orderJson
              if (this.orderFormData.regionId > 0) {
                this.selectRegionId = this.orderFormData.regionId
              } else {
                this.selectRegionId = ''
              }
              if (this.orderFormData.centerId > 0) {
                this.selectCenterId = this.orderFormData.centerId
              } else {
                this.selectCenterId = ''
              }
              if (this.orderFormData.stationId > 0) {
                this.selectStationId = this.orderFormData.stationId
              } else {
                this.selectStationId = ''
              }
              this.detailList = orderDetail.data
              for (let i = 0; i < this.detailList.length; i++) {
                this.detailList[i].detailRef = 'detailRef' + this.detailList[i].id
              }
              this.loading = false
              this.submitButtonLoading = false
            })
        }))
        .finally(() => {
          this.submitButtonLoading = false
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
