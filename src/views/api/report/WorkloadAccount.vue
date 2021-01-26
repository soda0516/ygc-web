<template>
  <div class="app-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="管材库存量查询">
        <el-form
          ref="elForm"
          label-width="85px"
          label-position="right"
          size="small"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="库存日期">
                <el-date-picker
                  v-model="searchData.searchDate"
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
            <el-col :span="5">
              <el-form-item label="所属小队">
                <el-select v-model="searchData.storeId" clearable value-key="id" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in storeInfoList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="" label-width="20px">
                <el-button size="small" type="primary" :loading="loading" style="width: 100%" @click="showStore">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div v-loading="loading">
          <el-table
            :data="tableData"
            border
            style="width: 98%;margin:auto"
            size="small"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :span-method="objectSpanMethod"
          >
            <!--            :span-method="objectSpanMethod"-->
            <el-table-column
              prop="productName"
              label="管材规格型号"
            />
            <el-table-column
              prop="subject2Num"
              label="领用"
              :formatter="zeroShowEmpty"
            />
            <el-table-column
              prop="subject3Num"
              label="周转"
              :formatter="zeroShowEmpty"
            />
            <el-table-column
              prop="subject4Num"
              label="待修"
              :formatter="zeroShowEmpty"
            />
            <el-table-column
              prop="subject5Num"
              label="待报废"
              :formatter="zeroShowEmpty"
            />
            <el-table-column
              prop="subject1Num"
              label="回收"
              :formatter="zeroShowEmpty"
            />
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工作量阶段统计">
        <el-form
          ref="elForm"
          label-width="85px"
          label-position="right"
          size="small"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="起始日期">
                <el-date-picker
                  v-model="searchWorkloadData.startDate"
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
              <el-form-item label="结束日期">
                <el-date-picker
                  v-model="searchWorkloadData.endDate"
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
            <el-col :span="5">
              <el-form-item label="所属小队">
                <el-select v-model="searchWorkloadData.storeId" clearable value-key="id" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in storeInfoList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="" label-width="20px">
                <el-button size="small" type="primary" :loading="loading" style="width: 100%" @click="showWorkload">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div v-loading="loading">
          <el-table
            :data="tableDataWorkload"
            border
            style="width: 90%;margin:auto"
            size="small"
            :header-row-class-name="headerRowClass"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :cell-class-name="tableCellClassName"
          >
            <el-table-column
              prop="workloadOneName"
              label="工作项目"
            />
            <el-table-column
              prop="workloadOne"
              label="工作量"
            />
            <el-table-column
              prop="workloadTwoName"
              label="工作项目"
            />
            <el-table-column
              prop="workloadTwo"
              label="工作量"
            />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'WorkloadAccount',
  data() {
    return {
      searchData: {
        storeId: '',
        searchDate: ''
      },
      searchWorkloadData: {
        storeId: '',
        startDate: '',
        endDate: ''
      },
      productValue: '',
      productList: [],
      subjectList: [],
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
      tableData: [],
      spanArr: [],
      loading: false,
      tableDataWorkload: [],
      storeInfoList: []
    }
  },
  created() {
    this.$getStoreInfoList()
      .then(res => {
        this.storeInfoList = res.data
        this.storeInfoList.push({ id: 0, name: '两队合计' })
      })
  },
  methods: {
    productChange() {

    },
    initTable() {
      this.loading = true
      this.$request.get('/report/storeAccount', { params: {
        searchData: JSON.stringify(this.searchData) }
      })
        .then(res => {
          this.tableData = res.data
          var index = 0
          for (let i = 0; i < this.tableData.length; i++) {
            if (i > 0) {
              if (this.tableData[i].productCategoryId !== this.tableData[i - 1].productCategoryId) {
                index = i
              }
              if ((this.tableData[i].subject1Num + this.tableData[index].subject1Num) !== 0) {
                this.tableData[index].subject1Num = this.tableData[i].subject1Num + this.tableData[index].subject1Num
              }
            }
          }
          this.rowspan()
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    showStore() {
      this.initTable()
    },
    rowspan() {
      this.spanArr = []
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (this.tableData[index].productCategoryId === this.tableData[index - 1].productCategoryId) {
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
      if (columnIndex === 5) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    showWorkload() {
      this.loading = true
      this.$request.get('/report/workloadAccount', { params: { searchWorkloadData: JSON.stringify(this.searchWorkloadData) }})
        .then(res => {
          this.tableDataWorkload = res.data
          this.rowspan()
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 2) {
        return 'table_tr'
      } else {
        return ''
      }
    },
    headerRowClass() {
      return 'headerRowClass'
    },
    zeroShowEmpty(row, col) {
      if (col.property === 'subject1Num') {
        if (row.subject1Num === 0) {
          return ''
        } else {
          return row.subject1Num
        }
      }
      if (col.property === 'subject2Num') {
        if (row.subject2Num === 0) {
          return ''
        } else {
          return row.subject2Num
        }
      }
      if (col.property === 'subject3Num') {
        if (row.subject3Num === 0) {
          return ''
        } else {
          return row.subject3Num
        }
      }
      if (col.property === 'subject4Num') {
        if (row.subject4Num === 0) {
          return ''
        } else {
          return row.subject4Num
        }
      }
      if (col.property === 'subject5Num') {
        if (row.subject5Num === 0) {
          return ''
        } else {
          return row.subject5Num
        }
      }
    }
  }
}
</script>

<style>
  .table_tr {
    font-weight:bold
  }
  .headerRowClass{
    background-color: #99a9bf;
  }
</style>
