<template>
  <div class="app-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="油管">
        <DailyReportComs :category-id="14" :store-info-list="storeInfoList" />
      </el-tab-pane>
      <el-tab-pane label="抽油杆">
        <DailyReportComs :category-id="15" :store-info-list="storeInfoList" />
      </el-tab-pane>
      <el-tab-pane label="特种杆">
        <DailyReportComs :category-id="16" :store-info-list="storeInfoList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DailyReportComs from './components/DailyReportComs'
export default {
  name: 'DailyReport',
  components: { DailyReportComs },
  data() {
    return {
      categoryId: '',
      storeInfoList: []
    }
  },
  created() {
    this.$getStoreInfoList()
      .then(res => {
        this.storeInfoList = res.data
      })
    // var getData = []
    // this.loading = true
    // this.$request.get('/report/dailyReport')
    //   .then(res => {
    //     getData = res.data.data
    //     this.colCount = res.data.data[0].data.length
    //     console.log(this.colCount)
    //     for (var i in getData) {
    //       var a = {}
    //       var b = []
    //       a['subjectName'] = getData[i].subjectName
    //       a['typeName'] = getData[i].typeName
    //       var x = 0
    //       var join = 0
    //       getData[i].data.forEach(function(e) {
    //         x += 1
    //         join += e.num
    //         b.push({ productName: e.productName, key: 'num' + x })
    //         a['num' + x] = e.number
    //         a['join'] = join
    //       })
    //       this.allList = b
    //     }
    //     this.loading = false
    //   })
    //   .finally(() => {
    //     this.loading = false
    //   })
  },
  methods: {
    setData() {
      var getData = []
      this.loading = true
      this.$request.get('/report/dailyReport')
        .then(res => {
          this.AllData = []
          getData = res.data.data
          this.colCount = res.data.data[0].data.length
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
                  a['num' + 1] = num1
                } else if (i == 1) {
                  if (!num2) {
                    num2 = 0
                  }
                  num2 = e.number + num2
                  a['num' + 1] = num2
                } else if (i == 2) {
                  if (!num3) {
                    num3 = 0
                  }
                  num3 = e.number + num3
                  a['num' + 1] = num3
                } else if (i == 3) {
                  if (!num4) {
                    num4 = 0
                  }
                  num4 = e.number + num4
                  a['num' + 1] = num1
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
