<template>
  <el-form
    ref="elForm"
    :model="formData"
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
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="采油大区">
          <el-select v-model="searchData.selectedRegion" clearable value-key="id" placeholder="请选择" style="width: 100%;" @change="regionChange">
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="井号名称">
          <el-input v-model="searchData.wellName" placeholder="请输入井号名称" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="单据科目">
          <el-select v-model="searchData.selectedSubject" clearable value-key="id" placeholder="请选择" style="width: 100%;" :disabled="subjectDisabled" @change="regionChange">
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
        <el-form-item label="作业项目">
          <el-input v-model="searchData.operItem" placeholder="请输入作业项目" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="备注" label-width="60px">
          <el-input v-model="searchData.remark" placeholder="请输入作业项目" clearable />
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
  name: 'OrderInOutSearchForm',
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
      productList: [],
      searchData: {
        startDate: '',
        endDate: '',
        selectedRegion: '',
        selectedSubject: '',
        wellName: '',
        orderType: '',
        operItemOrRemark: '',
        productDetailIds: []
      },
      productValue: [],
      regionList: [],
      subjectDisabled: false,
      selectedSubject: '',
      dataTitle: '',
      subjectTitle: '',
      submitButtonLoading: false,
      timer: {},
      loading: false,
      props: { multiple: true },
      subjectList: []
    }
  },
  mounted() {
    this.initProductOption()
    this.initRegion()
    this.initSubjectList()
  },
  methods: {
    initSubjectList() {
      this.$axios.get('http://127.0.0.1:8080/product/productSubject/list/subject')
        .then((res) => {
          this.subjectList = res.data.data
          if (this.orderType === 1) {
            this.searchData.selectedSubject = 1
            this.subjectDisabled = true
          } else if (this.orderType === 2) {
            this.subjectList.shift()
            this.subjectList.pop()
            this.subjectList.pop()
          }
        })
        .finally((res) => {
        })
    },
    listRegionReturn() {
      return this.$axios.get('http://127.0.0.1:8080/area/areaRegion/list/all')
    },
    initRegion() {
      this.$axios.get('http://127.0.0.1:8080/area/areaRegion/list/all')
        .then((res) => {
          this.regionList = res.data.data
        })
    },
    initProductOption() {
      this.$axios.get('http://127.0.0.1:8080/product/productCategory/list/detail')
        .then((res) => {
          console.log('查找模块')
          console.log(res)
          this.productList = res.data.data
        })
    },
    listCenterByIdReturn(id) {
      return this.$axios.get('http://127.0.0.1:8080/area/areaCenter/list/' + id)
    },
    listCenterById(id) {
      this.$axios.get('http://127.0.0.1:8080/area/areaCenter/list/' + id)
        .then((res) => {
          this.centerList = res.data.data
        })
    },
    regionChange(value) {
      this.orderFormData.regionId = value.id
      this.orderFormData.regionName = value.name
      this.selectedCenter = ''
      this.selectedStation = ''
      this.listCenterById(value.id)
    },
    listStationByIdReturn(id) {
      return this.$axios.get('http://127.0.0.1:8080/area/areaStation/list/' + id)
    },
    listStationById(id) {
      this.$axios.get('http://127.0.0.1:8080/area/areaStation/list/' + id)
        .then((res) => {
          this.stationList = res.data.data
        })
    },
    centerChange(value) {
      this.orderFormData.centerId = value.id
      this.orderFormData.centerName = value.name
      this.selectedStation = ''
      this.listStationById(value.id)
    },
    stationChange(value) {
      this.orderFormData.stationId = value.id
      this.orderFormData.stationName = value.name
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
    listOrder(id) {
      if (this.orderType === 1) {
        return this.$axios.get('http://127.0.0.1:8080/order/orderIn/' + id)
      } else if (this.orderType === 2) {
        return this.$axios.get('http://127.0.0.1:8080/order/orderOut/' + id)
      }
    },
    listOrderDetail(id) {
      if (this.orderType === 1) {
        return this.$axios.get('http://127.0.0.1:8080/order/orderInDetail/list/' + id)
      } else if (this.orderType === 2) {
        return this.$axios.get('http://127.0.0.1:8080/order/orderOutDetail/list/' + id)
      }
    },
    listCenter() {
      return this.$axios.get('http://127.0.0.1:8080/area/areaCenter/list')
    },
    listStation() {
      return this.$axios.get('http://127.0.0.1:8080/area/areaStation/list')
    },
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
      this.$emit('init', this.searchData)
    }
  }
}
</script>

<style scoped>

</style>
