<template>
  <div>
    <OrderInOutSearchForm ref="OrderInOutSearchFormRef" :order-type="orderType" @init="initOrderList" @initPage="initPage" />
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      border
      size="small"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :span-method="objectSpanMethod"
    >
      <el-table-column label="操作" width="150px" fixed>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="回收日期"
        width="130px"
      >
        <template scope="scope">
          <span>{{ parseDateFull(scope.row.order_order_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="采油作业区"
        prop="order_region_id"
        :formatter="formatterRegion"
      />
      <el-table-column
        label="中心站"
        prop="order_center_id"
        :formatter="formatterCenter"
      />
      <el-table-column
        label="小站"
        prop="order_station_id"
        :formatter="formatterStation"
      />
      <el-table-column
        label="井号名称"
        prop="order_well_name"
      />
      <el-table-column
        label="作业项目"
        prop="order_oper_item"
      />
      <el-table-column
        label="所属小队"
        prop="order_store_id"
      />
      <el-table-column
        label="增加科目"
        prop="order_subject_type"
        :formatter="formatterSubject"
      />
      <el-table-column
        label="单据类型"
        prop="order_order_type"
        :formatter="formatterOrderType"
      />
      <el-table-column
        label="单据备注"
        prop="order_remark"
      />
      <el-table-column
        label="管材规格型号"
        width="180"
        prop="product_name"
        fixed="right"
      />
      <!--      <el-table-column-->
      <!--        label="井场数量"-->
      <!--        width="70"-->
      <!--        prop="detail_request_num"-->
      <!--      />-->
      <el-table-column
        label="数量"
        width="60"
        prop="detail_actual_num"
        fixed="right"
      />
      <el-table-column
        label="单价"
        width="80"
        prop="detail_unit_price"
        fixed="right"
      />
      <el-table-column
        label="金额"
        width="80"
        prop="detail_total_fee"
        fixed="right"
      />
      <el-table-column
        label="备注"
        prop="detail_remark"
        fixed="right"
      />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="paginationData.pageSize"
      :current-page="paginationData.currentPage"
      :total="paginationData.pageTotal"
      :pager-count="9"
      style="margin-top: 15px;text-align: right"
      @current-change="pageChange"
    />
    <!--    :page-size="paginationData.pageSize"-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="75%"
      style="top: -5%"
      :before-close="handleClose"
      @open="initDialog"
    >
      <div>
        <OrderInOutForm ref="OrderInOutModifyFormRef" :modify="modify" :modify-order-id="modifyOrderId" :order-type="orderType" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OrderInOutForm from './OrderInOutForm'
import OrderInOutSearchForm from './OrderInOutSearchForm'
export default {
  name: 'OrderInOutModifyForm',
  components: { OrderInOutSearchForm, OrderInOutForm },
  props: ['modifyType', 'orderType'],
  data() {
    return {
      tableData: [],
      spanArr: [],
      dialogVisible: false,
      modify: true,
      modifyOrderId: 0,
      loading: false,
      timer: {},
      dialogTitle: '',
      refreshOrderListUrl: '',
      paginationData: {
        pageSize: 12,
        currentPage: 1,
        pageTotal: 1
      },
      orderTypeList: [],
      orderOperTypeList: [],
      subjectList: [],
      regionAllList: [],
      centerAllList: [],
      stationAllList: []
    }
  },
  mounted() {
    this.initOrderList()
    this.$axios.all([this.$getOrderTypeList(), this.$getOrderOperTypeList(), this.$getProductSubjectList(), this.$getAreaRegionList(), this.$getAreaCenterListById(''), this.$getAreaStationListById('')])
      .then(this.$axios.spread((orderTypeListRes, orderOrderOperTypeListRes, subjectRes, res4, res5, res6) => {
        console.log('subjectRes:')
        console.log(subjectRes)
        this.orderTypeList = orderTypeListRes.data.data
        this.orderOperTypeList = orderOrderOperTypeListRes.data.data
        this.subjectList = subjectRes.data.data
        this.regionAllList = res4.data.data
        this.centerAllList = res5.data.data
        this.stationAllList = res6.data.data
        console.log(res4.data.data)
      }))
    if (this.modifyType === 1) {
      this.dialogTitle = '回收单修改'
      this.orderType = 1
      this.refreshOrderListUrl = 'http://127.0.0.1:8080/order/orderInDetail/page/detail'
    } else if (this.modifyType === 2) {
      this.dialogTitle = '出库单修改'
      this.orderType = 2
      this.refreshOrderListUrl = 'http://127.0.0.1:8080/order/orderOutDetail/page/detail'
    }
  },
  methods: {
    plusDetail() {
      var index = this.detailList.length
      var refName = index
      var detail = { id: refName }
      this.detailList.push(detail)
    },
    minusDetail() {
      if (this.detailList.length > 6) {
        this.detailList.pop()
      }
    },
    initPage(number) {
      this.paginationData.currentPage = number
    },
    // initOrderTypeListReturn() {
    //   return this.$axios({
    //     url: 'http://127.0.0.1:8080/order/commons/orderType/list',
    //     method: 'get'
    //   })
    // },
    // initOrderOperTypeListReturn() {
    //   return this.$axios({
    //     url: 'http://127.0.0.1:8080/order/commons/operType/list',
    //     method: 'get'
    //   })
    // },
    formatterOrderType(row, col) {
      for (let i = 0; i < this.orderTypeList.length; i++) {
        if (row.order_order_type === this.orderTypeList[i].value) {
          return this.orderTypeList[i].label
        }
      }
    },
    formatterOrderOperType(row, col) {
      for (let i = 0; i < this.orderOperTypeList.length; i++) {
        if (row.order_order_type === this.orderOperTypeList[i].value) {
          return this.orderOperTypeList[i].label
        }
      }
    },
    formatterSubject(row, col) {
      for (let i = 0; i < this.subjectList.length; i++) {
        if (row.order_subject_type === this.subjectList[i].id) {
          return this.subjectList[i].name
        }
      }
    },
    formatterRegion(row, col) {
      for (let i = 0; i < this.regionAllList.length; i++) {
        if (row.order_region_id === this.regionAllList[i].id) {
          return this.regionAllList[i].name
        }
      }
    },
    formatterCenter(row, col) {
      for (let i = 0; i < this.centerAllList.length; i++) {
        if (row.order_center_id === this.centerAllList[i].id) {
          return this.centerAllList[i].name
        }
      }
    },
    formatterStation(row, col) {
      for (let i = 0; i < this.stationAllList.length; i++) {
        if (row.order_station_id === this.stationAllList[i].id) {
          return this.stationAllList[i].name
        }
      }
    },
    initOrderList(searchData) {
      console.log('this.modifyType111111111111' + this.modifyType)
      if (this.modifyType === 1) {
        this.refreshOrderListUrl = 'http://127.0.0.1:8080/order/orderInDetail/page/detail'
      } else if (this.modifyType === 2) {
        this.refreshOrderListUrl = 'http://127.0.0.1:8080/order/orderOutDetail/page/detail'
      }
      console.log(this.refreshOrderListUrl)
      if (this.refreshOrderListUrl.trim() !== '') {
        this.loading = true
        var searchVar = this.$refs.OrderInOutSearchFormRef.searchData
        this.$axios({
          url: this.refreshOrderListUrl,
          method: 'get',
          params: {
            searchData: JSON.stringify(searchVar),
            currentPage: this.paginationData.currentPage,
            pages: this.paginationData.pageSize
          }
        }).then(res => {
          console.log(res)
          this.tableData = res.data.data.records
          this.paginationData.pageSize = res.data.data.size
          this.paginationData.pageTotal = res.data.data.total
        }).finally(() => {
          this.rowspan()
          clearTimeout(this.timer) // 清除延迟执行
          this.timer = setTimeout(() => {
            this.loading = false
          }, 500)
        })
      }
    },
    parseDateFull(time) {
      var x = new Date(time)
      var z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
      }
      if (z.M < 10) {
        z.M = '0' + z.M
      }
      if (z.d < 10) {
        z.d = '0' + z.d
      }
      if (z.h < 10) {
        z.h = '0' + z.h
      }
      if (z.m < 10) {
        z.m = '0' + z.m
      }
      return z.y + '年' + z.M + '月' + z.d + '日'
    },
    rowspan() {
      this.spanArr = []
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (this.tableData[index].order_id === this.tableData[index - 1].order_id) {
            this.spanArr[this.position] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.position = index
          }
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4 ||
        columnIndex === 5 ||
        columnIndex === 6 ||
        columnIndex === 7 ||
        columnIndex === 8 ||
        columnIndex === 9 ||
        columnIndex === 10) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    handleEdit(index, value) {
      this.modifyOrderId = value.order_id
      this.dialogVisible = true
      // this.$refs.OrderInOutModifyFormRef.initFromModify(value.order_id)
    },
    initDialog() {
      this.$nextTick(() => {
        this.$refs.OrderInOutModifyFormRef.initFromModify(this.modifyOrderId)
      })
    },
    handleClose(done) {
      this.initOrderList()
      done()
    },
    handleDelete(index, value) {
      this.$confirm('此操作将单据及其明细信息，是否继续?', '单据信息删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOrderIn(value.order_id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteOrderIn(id) {
      this.loading = true
      var url
      if (this.modifyType === 1) {
        url = 'http://127.0.0.1:8080/order/orderIn/'
      } else if (this.modifyType === 2) {
        url = 'http://127.0.0.1:8080/order/orderOut/'
      }
      if (url) {
        this.$axios.delete(url + id)
          .then((res) => {
            this.initOrderList()
          })
      }
    },
    pageChange(value) {
      this.paginationData.currentPage = value
      var search = this.$refs.OrderInOutSearchFormRef.searchData
      this.initOrderList(search)
    }
  }
}
</script>
<style>
  /*.goodsInfo {*/
  /*  padding: 0!important;*/
  /*}*/
  /*.goodsInfo .cell {*/
  /*  padding: 0;*/
  /*  overflow: unset;*/
  /*}*/

  /*去掉表格单元格边框*/
  /*.customer-no-border-table th{*/
  /*  border:none;*/
  /*}*/
  .customer-no-border-table td,.customer-no-border-table th.is-leaf {
    border:none;
  }
  /*表格最外边框*/
  .customer-no-border-table .el-table--border, .el-table--group{
    border: none;
  }
  /*头部边框*/
  .customer-no-border-table thead tr th.is-leaf{
    border: 0px solid #EBEEF5;
    border-right: none;
  }
  .customer-no-border-table thead tr th:nth-last-of-type(2){
    border-right: 0px solid #EBEEF5;
  }
  /*表格最外层边框-底部边框*/
  .customer-no-border-table .el-table--border::after,.customer-no-border-table .el-table--group::after{
    border: 0px;
    width: 0;
  }
  .customer-no-border-table::before{
    width: 0;
  }
  .customer-no-border-table .el-table__fixed-right::before,.el-table__fixed::before{
    width: 0;
  }
</style>
