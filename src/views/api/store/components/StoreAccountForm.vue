<template>
  <div>
    <el-form :inline="true" :model="formInline" style="width: 100%" size="small">
      <el-form-item label="历史盘点日期">
        <el-select v-model="historyDateValue" placeholder="请选择">
          <el-option
            v-for="item in historyDateList"
            :key="item.historyDate"
            :label="item.historyDate"
            :value="item.historyDate"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showHistory">显示历史盘点记录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="removeHistory">移除历史盘点记录</el-button>
      </el-form-item>
      <el-form-item label="新建盘点日期">
        <el-date-picker
          v-model="newDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          :editable="false"
          clearable
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createTemplet">创建/显示盘点模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveTemplet">保存当前盘点信息</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="storeAccountForm"
      border
      size="small"
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :span-method="objectSpanMethod"
    >
      <!--          :span-method="objectSpanMethod"-->
      <el-table-column
        label="盘点日期日期"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ parseDateFull(scope.row.accountDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="管材型号规格"
      />
      <el-table-column
        label="回收"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.subjectNumOne" size="mini" />
        </template>
      </el-table-column>
      <el-table-column
        label="领用"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.subjectNumTwo" size="mini" />
        </template>
      </el-table-column>
      <el-table-column
        label="周转"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.subjectNumThree" size="mini" />
        </template>
      </el-table-column>
      <el-table-column
        label="待修"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.subjectNumFour" size="mini" />
        </template>
      </el-table-column>
      <el-table-column
        label="待报废"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.subjectNumFive" size="mini" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StoreAccountForm',
  props: ['storeId'],
  data() {
    return {
      accountDate: '',
      storeAccountForm: [],
      spanArr: [],
      formInline: {},
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
      historyDate: '',
      newDate: '',
      historyDateList: [],
      historyDateValue: ''
    }
  },
  mounted() {
    this.getHistoryDate()
    console.log(this.storeId)
  },
  methods: {
    // :picker-options="pickerOptions"
    submit(accountDate) {
      console.log('submit' + accountDate)
      this.$request({
        url: '/store/storeAccount/list',
        method: 'get',
        params: {
          accountDate: accountDate,
          storeId: this.storeId
        }
      })
        .then((res) => {
          this.storeAccountForm = res.data
          console.log(JSON.stringify(res.data))
          // this.rowspan()
        })
    },
    history(accountDate) {
      console.log('submit' + accountDate)
      this.$request({
        url: '/store/storeAccount/history/list',
        method: 'get',
        params: {
          accountDate: accountDate,
          storeId: this.storeId
        }
      })
        .then((res) => {
          this.storeAccountForm = res.data
          console.log(JSON.stringify(res.data))
          this.rowspan()
        })
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
      this.storeAccountForm.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          console.log(this.storeAccountForm[index].accountDate)
          if (this.storeAccountForm[index].storeId === this.storeAccountForm[index - 1].storeId) {
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
      if (columnIndex === 0 || columnIndex === 7) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    showHistory() {
      this.history(this.historyDateValue)
    },
    createTemplet() {
      this.$request({
        url: '/store/storeAccount/templet',
        method: 'post',
        params: {
          accountDate: this.newDate,
          storeId: this.storeId
        }
      })
        .then((res) => {
          this.getHistoryDate()
        })
    },
    saveTemplet() {
      this.$request({
        url: '/store/storeAccount/templet',
        method: 'put',
        params: {
          storeAccountSetVo: JSON.stringify(this.storeAccountForm)
        }
      })
        .then((res) => {
          // this.storeAccountForm = res.data.data
          // this.rowspan()
        })
    },
    getHistoryDate() {
      this.$request({
        url: '/store/storeAccount/history-date',
        method: 'get',
        params: {
          storeId: this.storeId
        }
      })
        .then((res) => {
          this.historyDateList = res.data
          if (this.historyDateList.length > 0) {
            this.historyDateValue = this.historyDateList[0].historyDate
            console.log('this.historyDateValue' + this.storeId + '-222-' + JSON.stringify(this.historyDateValue))
            this.history(this.historyDateValue)
          }
          // this.rowspan()
        })
    },
    removeHistory() {
      this.$request({
        url: '/store/storeAccount/historyDate',
        method: 'delete',
        params: {
          storeId: this.storeId,
          historyDate: this.historyDateValue
        }
      })
        .then((res) => {
          this.getHistoryDate()
        })
    }
  }
}
</script>

<style scoped>

</style>
