<template>
  <div v-loading="loading">
    <OrderInternalSearchForm v-if="!today" ref="OrderInternalSearchFormRef" :order-type="orderType" @init="initOrderList" @initPage="initPage" />
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      size="small"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :span-method="objectSpanMethod"
    >
      <el-table-column label="操作" width="150px">
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
        label="调拨日期"
        width="130px"
      >
        <template scope="scope">
          <span>{{ parseDateFull(scope.row.order_internal_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="交出单位"
        prop="order_internal_hand_over_company"
      />
      <el-table-column
        label="接收单位"
        prop="order_internal_receipt_company"
      />
      <el-table-column
        label="交出人"
        prop="order_internal_hand_over_user"
      />
      <el-table-column
        label="接收人"
        prop="order_internal_receipt_user"
      />
      <el-table-column
        label="增加科目"
        prop="order_internal_add_subject"
        :formatter="formatterAddSubject"
      />
      <el-table-column
        label="减少科目"
        prop="order_internal_subtract_subject"
        :formatter="formatterSubtractSubject"
      />
      <el-table-column
        label="所在小队"
        prop="order_internal_store_id"
      />
      <el-table-column
        label="单据类型"
        prop="order_internal_order_type"
        :formatter="formatterOrderType"
      />
      <el-table-column
        label="操作类型"
        prop="order_internal_oper_type"
        :formatter="formatterOrderOperType"
      />
      <el-table-column
        label="单据备注"
        prop="order_internal_remark"
      />
      <el-table-column
        label="管材规格型号"
        width="180"
        prop="product_name"
      />
      <el-table-column
        label="数量"
        width="70"
        prop="detail_actual_num"
      />
      <el-table-column
        label="单价"
        width="90"
        prop="detail_unit_price"
      />
      <el-table-column
        label="金额"
        width="90"
        prop="detail_total_fee"
      />
      <el-table-column
        label="备注"
        prop="detail_remark"
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="75%"
      style="top: -5%"
      :before-close="handleClose"
      @open="openDialog"
    >
      <div>
        <OrderInternalForm ref="OrderInternalModifyFormRef" :modify="modify" :modify-order-id="modifyOrderId" :order-type="orderType" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OrderInternalForm from './OrderInternalForm'
import OrderInternalSearchForm from './OrderInternalSearchForm'
export default {
  name: 'OrderInternalModifyForm',
  components: { OrderInternalSearchForm, OrderInternalForm },
  props: ['today'],
  data() {
    return {
      dialogTitle: '调拨单修改',
      dialogVisible: false,
      tableData: [],
      loading: false,
      modifyType: false,
      spanArr: [],
      modify: true,
      modifyOrderId: 0,
      orderType: 3,
      paginationData: {
        pageSize: 12,
        currentPage: 1,
        pageTotal: 1
      },
      subjectList: [],
      orderTypeList: [],
      orderOperTypeList: [],
      searchData: {
        startDate: '',
        endDate: '',
        selectedRegion: '',
        selectedSubject: '',
        wellName: '',
        orderType: '',
        operItemOrRemark: '',
        productDetailIds: []
      }
    }
  },
  mounted() {
    this.loading = true
    var that = this
    var searchVar = this.$refs.OrderInternalSearchFormRef.searchData
    this.$axios.all([this.initOrderListReturn(searchVar), this.initSubjectList(), this.initOrderTypeListReturn(), this.initOrderOperTypeListReturn()])
      .then(this.$axios.spread((res1, res2, res3, res4) => {
        this.tableData = res1.data.records
        this.paginationData.pageSize = res1.data.size
        this.paginationData.pageTotal = res1.data.total
        this.subjectList = res2.data
        this.orderTypeList = res3.data
        this.orderOperTypeList = res4.data
      }))
      .finally(() => {
        this.rowspan()
        clearTimeout(this.timer) // 清除延迟执行
        this.timer = setTimeout(() => {
          this.loading = false
        }, 500)
      })
  },
  methods: {
    initSubjectList() {
      return this.$request.get('/product/productSubject/list/subject')
    },
    initOrderList() {
      var searchVar = ''
      if (this.today) {
        searchVar = this.searchData
      } else {
        searchVar = this.$refs.OrderInternalSearchFormRef.searchData
      }
      this.loading = true
      this.$request({
        url: '/order/orderInternalDetail/page/detail',
        method: 'get',
        params: {
          today: this.today,
          searchData: searchVar,
          currentPage: this.paginationData.currentPage,
          pages: this.paginationData.pageSize
        }
      }).then((res) => {
        this.tableData = res.data.records
        this.paginationData.pageSize = res.data.size
        this.paginationData.pageTotal = res.data.total
      }).finally(() => {
        this.rowspan()
        this.loading = false
      })
    },
    initOrderTypeListReturn() {
      return this.$request({
        url: '/order/commons/orderType/list',
        method: 'get'
      })
    },
    initOrderOperTypeListReturn() {
      return this.$request({
        url: '/order/commons/operType/list',
        method: 'get'
      })
    },
    initOrderListReturn(searchVar) {
      return this.$request({
        url: '/order/orderInternalDetail/page/detail',
        method: 'get',
        params: {
          today: this.today,
          searchData: searchVar,
          currentPage: this.paginationData.currentPage,
          pages: this.paginationData.pageSize
        }
      })
    },
    formatterOrderType(row, col) {
      for (let i = 0; i < this.orderTypeList.length; i++) {
        if (row.order_internal_order_type === this.orderTypeList[i].value) {
          return this.orderTypeList[i].label
        }
      }
    },
    formatterOrderOperType(row, col) {
      for (let i = 0; i < this.orderOperTypeList.length; i++) {
        if (row.order_internal_oper_type === this.orderOperTypeList[i].value) {
          return this.orderOperTypeList[i].label
        }
      }
    },
    formatterAddSubject(row, col) {
      for (let i = 0; i < this.subjectList.length; i++) {
        if (row.order_internal_add_subject === this.subjectList[i].id) {
          return this.subjectList[i].name
        }
      }
    },
    formatterSubtractSubject(row, col) {
      for (let i = 0; i < this.subjectList.length; i++) {
        if (row.order_internal_subtract_subject === this.subjectList[i].id) {
          return this.subjectList[i].name
        }
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
        columnIndex === 10 ||
        columnIndex === 11) {
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
    },
    openDialog() {
      this.$nextTick(() => {
        this.$refs.OrderInternalModifyFormRef.initFromModify(this.modifyOrderId)
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
      this.$request.delete('/order/orderInternal/' + id)
        .then((res) => {
          this.initOrderList()
        })
        .finally(() => {
          clearTimeout(this.timer) // 清除延迟执行
          this.timer = setTimeout(() => {
            this.loading = false
          }, 500)
        })
    },
    initPage(number) {
      this.paginationData.currentPage = number
    },
    pageChange(value) {
      this.paginationData.currentPage = value
      this.initOrderList()
    }
  }
}
</script>

<style scoped>
  .goodsInfo {
    padding: 0!important;
  }
  .goodsInfo .cell {
    padding: 0;
    overflow: unset;
  }
</style>
