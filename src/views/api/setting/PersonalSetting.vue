<template>
  <div class="app-container">
    <el-card v-loading="loading" class="box-card">
      <div slot="header">
        <span>个人密码设置</span>
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
              <el-input v-model="scope.row.username" size="mini" style="text-align: center" disabled />
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
              <el-select v-model="scope.row.storeId" placeholder="请选择" clearable size="mini" style="width: 100%" disabled>
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
              <el-select v-model="scope.row.roleIds" multiple placeholder="请选择" size="mini" style="width: 100%" disabled>
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
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import store from '../../../store'

export default {
  name: 'PersonalSetting',
  data() {
    return {
      showEdit: [],
      userInfoDetailList: [],
      roleList: [],
      storeList: [],
      loading: false,
    }
  },
  created() {
    var that = this
    this.loading = true
    this.$axios.all([that.$getStoreInfoList(), that.listUserRole()])
      .then((this.$axios.spread((res1, res2) => {
        that.storeList = res1.data
        that.roleList = res2.data
        if (that.$store.getters.info_id) {
          this.$axios.all([that.listUserInfoWihtRoleIds(that.$store.getters.info_id)])
            .then((this.$axios.spread((res) => {
              that.userInfoDetailList.push(res.data)
            })))
        }
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
          this.$axios.all([that.listUserInfoWihtRoleIds(that.$store.getters.info_id)])
            .then((this.$axios.spread((res) => {
              that.userInfoDetailList = []
              that.userInfoDetailList.push(res.data)
            })))
            .finally(() => {
              this.loading = false
            })
        })
    },
    listUserInfoWihtRoleIds(info_id) {
      return this.$request.get('/user-info/list/detail/' + info_id)
    },
    listUserRole() {
      return this.$request.get('/user-role')
    }
  }
}
</script>

<style scoped>

</style>
