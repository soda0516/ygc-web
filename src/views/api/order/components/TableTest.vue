<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :cell-class-name="goodsInfo"
  >
    <el-table-column
      prop="date"
      label="日期"
      width="180"
    />
    <el-table-column
      prop="name"
      label="姓名"
      width="180"
    />
    <el-table-column
      prop="address"
      label="地址"
    />
    <el-table-column
      prop="address"
      label="地址"
      style="padding: 0px;padding: 0px !important;overflow: unset"
    >
      <template>
        <el-table
          :data="innerTableData"
          style="width: 100%"
          :show-header="showHeader"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="180"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
        </el-table>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TableTest',
  data() {
    return {
      showHeader: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      innerTableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    goodsInfo(row) {
      if (row.columnIndex === 3) {
        return 'goodsInfo'// 给第2个td里面添加goodsInfo的类名
      }
    }
  }
}
</script>

<style>
  .goodsInfo {
    padding: 0!important;
  }
  .goodsInfo .cell {
    padding: 0;
    overflow: unset;
  }
</style>
