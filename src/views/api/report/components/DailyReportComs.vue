<template>
  <div>
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
            <el-button size="small" type="primary" :loading="loading" style="width: 100%" @click="setData">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-loading="loading">
      <el-table
        :data="AllData"
        border
        size="small"
        style="margin: auto;width: 95%"
        :span-method="objectSpanMethod"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
      >
        <el-table-column
          prop="subjectName"
          label=""
        />
        <el-table-column
          prop="typeName"
          label=""
        />
        <el-table-column
          v-for="(item,index) in allList"
          :key="index"
          :prop="item.key"
          :label="item.productName"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DailyReportComs',
  props: ['categoryId', 'storeInfoList'],
  data() {
    return {
      AllData: [],
      allList: [],
      loading: false,
      spanArr: [],
      colCount: 0,
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
        searchDate: '',
        storeId: ''
      }
    }
  },
  created() {
    var getData = []
    this.loading = true
    this.$request({
      url: '/report/dailyReport',
      method: 'get',
      params: {
        categoryId: this.categoryId,
        searchData: JSON.stringify(this.searchData)
      }
    }).then(res => {
      getData = res.data
      this.colCount = res.data[0].data.length
      console.log(this.colCount)
      for (var i in getData) {
        var a = {}
        var b = []
        a['subjectName'] = getData[i].subjectName
        a['typeName'] = getData[i].typeName
        var x = 0
        var join = 0
        getData[i].data.forEach(function(e) {
          x += 1
          join += e.num
          b.push({ productName: e.productName, key: 'num' + x })
          a['num' + x] = e.number
          a['join'] = join
        })
        this.allList = b
      }
      this.loading = false
    })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    setData() {
      var getData = []
      this.loading = true
      this.$request({
        url: '/report/dailyReport',
        method: 'get',
        params: {
          categoryId: this.categoryId,
          searchData: JSON.stringify(this.searchData)
        }
      })
        .then(res => {
          this.AllData = []
          getData = res.data
          this.colCount = res.data[0].data.length
          for (var i in getData) {
            var a = {}
            var b = []
            a['subjectName'] = getData[i].subjectName
            a['typeName'] = getData[i].typeName
            var x = 0
            var join = 0
            var num1
            var num2
            var num3
            var num4
            getData[i].data.forEach(function(e) {
              x += 1
              join += e.num
              b.push({ productName: e.productName, key: 'num' + x })
              if (e.number === 0) {
                a['num' + x] = ''
              } else {
                if (i == 0) {
                  if (!num1) {
                    num1 = 0
                  }
                  num1 = e.number + num1
                  if (num1 !== 0) {
                    a['num' + 1] = num1
                  } else {
                    a['num' + 1] = ''
                  }
                } else if (i == 1) {
                  if (!num2) {
                    num2 = 0
                  }
                  num2 = e.number + num2
                  if (num2 !== 0) {
                    a['num' + 1] = num2
                  } else {
                    a['num' + 1] = ''
                  }
                } else if (i == 2) {
                  if (!num3) {
                    num3 = 0
                  }
                  num3 = e.number + num3
                  if (num3 !== 0) {
                    a['num' + 1] = num3
                  } else {
                    a['num' + 1] = ''
                  }
                } else if (i == 3) {
                  if (!num4) {
                    num4 = 0
                  }
                  num4 = e.number + num4
                  if (num4 !== 0) {
                    a['num' + 1] = num4
                  } else {
                    a['num' + 1] = ''
                  }
                } else {
                  a['num' + x] = e.number
                }
              }
              a['join'] = join
            })
            this.AllData.push(a)
            this.allList = b
          }
          this.loading = false
        })
        .finally(() => {
          this.rowspan()
          this.loading = false
        })
    },
    rowspan() {
      this.spanArr = []
      this.AllData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (this.AllData[index].subjectName === this.AllData[index - 1].subjectName) {
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
      if (rowIndex === 0 && columnIndex >= 2) {
        return [1, this.colCount]
      }
      if (rowIndex === 1 && columnIndex >= 2) {
        return [1, this.colCount]
      }
      if (rowIndex === 2 && columnIndex >= 2) {
        return [1, this.colCount]
      }
      if (rowIndex === 3 && columnIndex >= 2) {
        return [1, this.colCount]
      }
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
