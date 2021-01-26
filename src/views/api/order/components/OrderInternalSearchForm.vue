<template>
  <el-form
    ref="elForm"
    label-width="82px"
    label-position="right"
    size="small"
  >
    <el-row>
      <el-col :span="6">
        <el-form-item label="起始时间">
          <el-date-picker
            v-model="searchData.startDate"
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
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="searchData.endDate"
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
        <el-form-item label="单据类型">
          <el-select v-model="searchData.orderType" clearable value-key="id" placeholder="请选择" style="width: 100%;" >
            <el-option
              v-for="item in orderTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="交出/接受（单位/人）" label-width="160px">
          <el-input v-model="searchData.wellName" placeholder="请输入交出/接受（单位/人）" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="增加科目">
          <el-select v-model="searchData.addSubject" clearable value-key="id" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="减少类型" >
          <el-select v-model="searchData.subtractSubject" value-key="id" clearable placeholder="请选择" style="width: 100%;">
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
        <el-form-item label="操作类型">
          <el-select v-model="searchData.operType" value-key="id" clearable placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in operTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="管材规格">
          <el-cascader
            v-model="productValue"
            :options="productList"
            :props="props"
            collapse-tags
            style="width: 100%"
            clearable
            @change="productChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="" label-width="10px">
          <el-button size="small" type="success" style="width: 100%">重置</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="" label-width="10px">
          <el-button size="small" type="primary" style="width: 100%" @click="search">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'OrderInternalSearchForm',
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
      productList: [],
      searchData: {
        startDate: '',
        endDate: '',
        addSubject: '',
        subtractSubject: '',
        searchWords: '',
        orderType: '',
        operType: '',
        productDetailIds: []
      },
      productValue: [],
      dataTitle: '',
      subjectTitle: '',
      submitButtonLoading: false,
      timer: {},
      loading: false,
      multiple: true,
      props: { multiple: true },
      orderTypeList: [],
      subjectList: [],
      operTypeList: []
    }
  },
  mounted() {
    console.log(this.orderType)
    this.$request.all([this.$getProductOptionList(), this.$getProductSubjectList(), this.$getOrderTypeList(), this.$getOperTypeList()])
      .then(this.$request.spread((res1, res2, res3, res4) => {
        this.productList = res1.data.data
        this.subjectList = res2.data.data
        this.orderTypeList = res3.data.data
        this.orderTypeList.shift()
        this.orderTypeList.shift()
        this.operTypeList = res4.data.data
        this.operTypeList.shift()
        this.operTypeList.shift()
      }))
    // this.orderFormData.orderType = this.orderType
  },
  methods: {
    // initSubjectList() {
    //   return this.$request.get('/product/productSubject/list/subject')
    // },
    // initOrderTypeReturn() {
    //   return this.$request.get('/order/commons/orderType/list')
    // },
    // initProductOption() {
    //   return this.$request.get('/product/productCategory/list/detail')
    // },
    // initOperType() {
    //   return this.$request.get('/order/commons/operType/list')
    // },
    productChange() {
      this.searchData.productDetailIds = []
      for (let i = 0; i < this.productValue.length; i++) {
        var value = this.productValue[i]
        if (value.length > 1) {
          this.searchData.productDetailIds.push(value[1])
        }
      }
    },
    search() {
      this.$emit('initPage', 1)
      this.$emit('init')
    }
  }
}
</script>

<style scoped>

</style>
