<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="80px" class="demo-ruleForm" size="mini">
          <el-form-item label="起始日期" prop="pass">
            <el-date-picker
              v-model="searchData.startDate"
              type="date"
              placeholder="选择开始日期"
              :picker-options="pickerOptions"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              :editable="false"
              clearable
            />
          </el-form-item>
          <el-form-item label="结束日期" prop="pass">
            <el-date-picker
              v-model="searchData.endDate"
              type="date"
              placeholder="选择结束日期"
              :picker-options="pickerOptions"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              :editable="false"
              clearable
            />
          </el-form-item>
          <el-form-item label="明细科目" prop="checkPass">
            <el-select v-model="searchData.subjectId" value-key="id" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in subjectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="管材选择" prop="age">
            <el-cascader
              v-model="value"
              :options="productList"
              style="width: 100%"
              clearable
            />
            <!--            @change="handleChange"-->
          </el-form-item>
          <el-form-item label="选择小队" prop="checkPass">
            <el-select v-model="searchData.storeId" value-key="id" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in storeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="test(1)">查询</el-button>
            <el-button @click="showValue">导出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-loading="loading" :span="18">
        <el-table
          :data="tableData"
          border
          style="width: 98%"
          size="small"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="orderDate"
            label="日期"
          >
            <template scope="scope">
              <span>{{ paraDate(scope.row.orderDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="summary"
            label="摘要"
          />
          <el-table-column
            prop="inNum"
            label="收入数量"
            :formatter="zeroShowEmpty"
          />
          <el-table-column
            prop="outNum"
            label="发出数量"
            :formatter="zeroShowEmpty"
          />
          <el-table-column
            prop="storeNum"
            label="库存合计"
            :formatter="zeroShowEmpty"
          />
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="paginationData.pageSize"
          :current-page="paginationData.currentPage"
          :total="paginationData.pageTotal"
          :pager-count="9"
          style="margin-top: 15px;text-align: right;padding-right: 5%"
          @current-change="pageChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AccountDetail',
  data() {
    return {
      tableData: [],
      ruleForm: {},
      paginationData: {
        pageSize: 12,
        currentPage: 1,
        pageTotal: 15
      },
      loading: false,
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
      searchData: {
        startDate: '',
        endDate: '',
        subjectId: '',
        storeId: '',
        productIds: []
      },
      subjectList: [],
      productList: [],
      storeList: [
        {
          value: 1,
          label: '管材一队'
        },
        {
          value: 2,
          label: '管材二队'
        }
      ],
      value: []
    }
  },
  created() {
    this.loading = true
    this.$axios.all([this.$getProductOptionList(), this.$getProductSubjectList()])
      .then(this.$axios.spread((res1, res2) => {
        this.productList = res1.data
        this.subjectList = res2.data
      }))
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    test(currentPage) {
      this.paginationData.currentPage = currentPage
      this.searchData.productIds = []
      if (this.value.length > 0) {
        this.searchData.productIds.push(this.value[1])
      }
      this.loading = true
      this.$request({
        url: '/report/reportDetail',
        method: 'post',
        params: {
          searchData: JSON.stringify(this.searchData),
          currentPage: this.paginationData.currentPage,
          pages: this.paginationData.pageSize
        }
      }).then(res => {
        this.tableData = res.data.records
        this.paginationData.pageSize = res.data.size
        this.paginationData.pageTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    showValue() {
      console.log(this.value)
    },
    paraDate(time) {
      return this.binParseDateFull(time)
    },
    zeroShowEmpty(row, col) {
      if (col.property === 'inNum') {
        if (row.inNum === 0) {
          return ''
        } else {
          return row.inNum
        }
      }
      if (col.property === 'outNum') {
        if (row.outNum === 0) {
          return ''
        } else {
          return row.outNum
        }
      }
      if (col.property === 'storeNum') {
        if (row.storeNum === 0) {
          return ''
        } else {
          return row.storeNum
        }
      }
    },
    pageChange(value) {
      this.test(value)
    },
    tableRowClassName({ row, index }) {
      console.log(row.summary)
      if (row.type >= 100) {
        return 'table_tr'
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
 .table_tr {
   font-weight:bold
 }
</style>
