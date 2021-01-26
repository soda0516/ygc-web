<template>
  <div class="app-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="保障大队管材一队 库存盘点表">
        <StoreAccountForm :store-id="1" />
      </el-tab-pane>
      <el-tab-pane label="保障大队管材二队 库存盘点表">
        <StoreAccountForm :store-id="2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StoreAccountForm from './components/StoreAccountForm'
export default {
  name: 'StoreAccount',
  components: { StoreAccountForm },
  data() {
    return {
      accountDate: '',
      storeAccountForm: [],
      spanArr: [],
      formInline: {}
    }
  },
  mounted() {
    this.submit()
  },
  methods: {
    // :picker-options="pickerOptions"
    submit() {
      this.$request({
        url: '/store/storeAccount/list',
        method: 'get',
        params: {
          accountDate: this.accountDate,
          storeId: 0
        }
      })
        .then((res) => {
          this.storeAccountForm = res.data.data
          // this.rowspan()
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
    }
  }
}
</script>

<style scoped>

</style>
