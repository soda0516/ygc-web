<template>
  <div class="app-container">
    <el-card v-loading="loading" class="box-card">
      <div slot="header">
        <span>账号设置</span>
      </div>
      <div class="text item" style="margin-bottom: 10px">
        <el-row :gutter="24">
          <el-col :span="16">
            <el-input v-model="username" style="width: 100%" size="small" clearable />
          </el-col>
          <el-col :span="8">
            <el-button size="small" style="width: 100%" @click="addUsername">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="text item">
        <el-table
          :data="userInfoDetailList"
          border
          style="width: 100%;"
          size="small"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
        >
          <el-table-column
            label="用户姓名"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.username" size="mini" style="text-align: center" />
            </template>
          </el-table-column>
          <el-table-column
            label="用户密码"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.password" size="mini" style="text-align: center" />
            </template>
          </el-table-column>
          <el-table-column
            label="所在小队"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.storeId" placeholder="请选择" clearable size="mini" style="width: 100%">
                <el-option
                  v-for="item in storeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="角色分配"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.roleIds" multiple placeholder="请选择" size="mini" style="width: 100%">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.roleNote"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="145"
          >
            <template slot-scope="scope">
              <el-button size="mini" @click.native="handleUpdate(scope.$index, scope.row)">保存</el-button>
              <el-button size="mini" @click.native="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AccountSetting',
  data() {
    return {
      showEdit: [],
      userInfoDetailList: [],
      roleList: [],
      storeList: [],
      loading: false,
      username: ''
    }
  },
  created() {
    var that = this
    this.loading = true
    this.$axios.all([that.$getStoreInfoList(), that.listUserInfoWihtRoleIds(), that.listUserRole()])
      .then((this.$axios.spread((res1, res2, res3) => {
        that.storeList = res1.data
        that.userInfoDetailList = res2.data
        that.roleList = res3.data
      })))
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    handleEdit(index, row, type) {
      this.$set(this.showEdit, index, true)
    },
    handleCancel(index, row, type) {
      this.$set(this.showEdit, index, false)
    },
    handleUpdate(index, row, type) {
      console.log(JSON.stringify(this.storeList))
      console.log(JSON.stringify(row))
      this.$request({
        url: '/user-info/bo',
        method: 'put',
        params: {
          data: JSON.stringify(row)
        }
      })
        .then(res => {
          var that = this
          this.loading = true
          this.$axios.all([that.listUserInfoWihtRoleIds()])
            .then((this.$axios.spread((res1) => {
              that.userInfoDetailList = res1.data
            })))
            .finally(() => {
              this.loading = false
            })
        })
    },
    handleDelete(index, row, type) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request({
          url: '/user-info',
          method: 'delete',
          params: {
            id: row.id
          }
        })
          .then(res => {
            var that = this
            this.loading = true
            this.$axios.all([that.listUserInfoWihtRoleIds()])
              .then((this.$axios.spread((res1) => {
                that.userInfoDetailList = res1.data
              })))
              .finally(() => {
                this.loading = false
              })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    listUserInfoWihtRoleIds() {
      return this.$request.get('/user-info/list/detail')
    },
    listUserRole() {
      return this.$request.get('/user-role')
    },
    addUsername() {
      this.$request({
        url: '/user-info',
        method: 'post',
        params: {
          username: this.username
        }
      })
        .then(res => {
          var that = this
          this.loading = true
          this.$axios.all([that.listUserInfoWihtRoleIds()])
            .then((this.$axios.spread((res1) => {
              that.userInfoDetailList = res1.data
            })))
            .finally(() => {
              this.loading = false
            })
        })
        .finally(() => {

        })
    }
  }
}
</script>

<style scoped>

</style>
