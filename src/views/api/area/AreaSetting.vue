<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            <span>采油大区</span>
          </div>
          <div class="text item" style="margin-bottom: 10px">
            <el-row :gutter="24">
              <el-col :span="16">
                <el-input v-model="inputRegion" style="width: 100%" size="small" clearable />
              </el-col>
              <el-col :span="8">
                <el-button size="small" style="width: 100%" @click="addRegion">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-table
              :data="regionList"
              border
              style="width: 100%;height: 280px"
              size="small"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
            >
              <el-table-column label="选择" width="60px" align="center" header-align="center">
                <template slot-scope="scope">
                  <!--            <i class="el-icon-time"></i>-->
                  <!--            :disabled="scope.row.accessTokenStatus !== '可操作'"-->
                  <el-radio v-model="radioRegion" :label="scope.row.id" @click.native.prevent="getTemplateRegionRow(scope.$index,scope.row)">{{ '' }}</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                label="采油大区名称"
              >
                <template slot-scope="scope">
                  <el-input v-if="showBtnRegion[scope.$index]" v-model="scope.row.name" size="mini" style="text-align: center" />
                  <span v-if="!showBtnRegion[scope.$index]">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="145"
              >
                <template slot-scope="scope">
                  <el-button v-if="showBtnRegion[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row,1)">更新</el-button>
                  <el-button v-if="showBtnRegion[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row,1)">取消</el-button>

                  <el-button v-if="!showBtnRegion[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row,1)">编辑</el-button>
                  <el-button v-if="!showBtnRegion[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row,1)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>中心站</span>
          </div>
          <div class="text item" style="margin-bottom: 10px">
            <el-row :gutter="24">
              <el-col :span="16">
                <el-input v-model="inputCenter" style="width: 100%" size="small" clearable/>
              </el-col>
              <el-col :span="8">
                <el-button size="small" style="width: 100%" @click="addCenter">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-table
              :data="centerList"
              border
              style="width: 100%;height: 280px"
              size="small"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
            >
              <el-table-column label="选择" width="60px" align="center" header-align="center">
                <template slot-scope="scope">
                  <!--            <i class="el-icon-time"></i>-->
                  <!--            :disabled="scope.row.accessTokenStatus !== '可操作'"-->
                  <el-radio v-model="radioCenter" :label="scope.row.id" @click.native.prevent="getTemplateCenterRow(scope.$index,scope.row)">{{ '' }}</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="中心站名称"
              >
                <template slot-scope="scope">
                  <el-input v-if="showBtnCenter[scope.$index]" v-model="scope.row.name" size="mini" style="text-align: center" />
                  <span v-if="!showBtnCenter[scope.$index]">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="145"
              >
                <template slot-scope="scope">
                  <el-button v-if="showBtnCenter[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row,2)">更新</el-button>
                  <el-button v-if="showBtnCenter[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row,2)">取消</el-button>

                  <el-button v-if="!showBtnCenter[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row,2)">编辑</el-button>
                  <el-button v-if="!showBtnCenter[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row,2)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            <span>小站</span>
          </div>
          <div class="text item" style="margin-bottom: 10px">
            <el-row :gutter="24">
              <el-col :span="16">
                <el-input v-model="inputStation" style="width: 100%" size="small" clearable />
              </el-col>
              <el-col :span="8">
                <el-button size="small" style="width: 100%" @click="addStation">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-table
              :data="stationList"
              border
              style="width: 100%;height: 280px"
              size="small"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
            >
              <el-table-column
                prop="name"
                label="小站名称"
              >
                <template slot-scope="scope">
                  <el-input v-if="showBtnStation[scope.$index]" v-model="scope.row.name" size="mini" style="text-align: center" />
                  <span v-if="!showBtnStation[scope.$index]">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="145"
              >
                <template slot-scope="scope">
                  <el-button v-if="showBtnStation[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row,3)">更新</el-button>
                  <el-button v-if="showBtnStation[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row,3)">取消</el-button>

                  <el-button v-if="!showBtnStation[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row,3)">编辑</el-button>
                  <el-button v-if="!showBtnStation[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row,3)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AreaSetting',
  data() {
    return {
      radioRegion: '',
      regionList: [],
      radioCenter: '',
      radioStation: '',
      centerList: [],
      stationList: [],
      showBtnRegion: [],
      showBtnCenter: [],
      showBtnStation: [],
      inputRegion: '',
      inputCenter: '',
      inputStation: ''
    }
  },
  mounted() {
    this.$getAreaRegionList()
      .then(res => {
        this.regionList = res.data.data
      })
  },
  methods: {
    getTemplateRegionRow(index, row) {
      this.radioRegion = row.id
      this.$getAreaCenterListById(this.radioRegion)
        .then(res => {
          console.log(JSON.stringify(res))
          this.centerList = res.data.data
        })
    },
    getTemplateCenterRow(index, row) {
      this.radioCenter = row.id
      this.$getAreaStationListById(this.radioCenter)
        .then(res => {
          console.log(JSON.stringify(res))
          this.stationList = res.data.data
        })
    },
    getTemplateStationRow(index, row) {

    },
    handleUpdate(index, row, type) {
      console.log(JSON.stringify(row))
      var url
      if (type === 1) {
        url = 'areaRegion'
      }
      if (type === 2) {
        url = 'areaCenter'
      }
      if (type === 3) {
        url = 'areaStation'
      }
      if (url) {
        this.$request({
          url: '/area/' + url,
          method: 'put',
          params: {
            item: JSON.stringify(row)
          }
        }).then(res => {
          if (type === 1) {
            this.$set(this.regionList, index, res.data.data)
          }
          if (type === 2) {
            this.$set(this.centerList, index, res.data.data)
          }
          if (type === 3) {
            this.$set(this.stationList, index, res.data.data)
          }
        }).finally(() => {
          if (type === 1) {
            this.$set(this.showBtnRegion, index, false)
          }
          if (type === 2) {
            this.$set(this.showBtnCenter, index, false)
          }
          if (type === 3) {
            this.$set(this.showBtnStation, index, false)
          }
        })
      }
    },
    handleCancel(index, row, type) {
      if (type === 1) {
        this.$set(this.showBtnRegion, index, false)
      }
      if (type === 2) {
        this.$set(this.showBtnCenter, index, false)
      }
      if (type === 3) {
        this.$set(this.showBtnStation, index, false)
      }
    },
    handleEdit(index, row, type) {
      if (type === 1) {
        this.$set(this.showBtnRegion, index, true)
      }
      if (type === 2) {
        this.$set(this.showBtnCenter, index, true)
      }
      if (type === 3) {
        this.$set(this.showBtnStation, index, true)
      }
    },
    handleDelete(index, row, type) {
      var url
      if (type === 1) {
        url = 'areaRegion'
      }
      if (type === 2) {
        url = 'areaCenter'
      }
      if (type === 3) {
        url = 'areaStation'
      }
      if (url) {
        this.$request({
          url: '/area/' + url + '/' + row.id,
          method: 'delete'
        }).then(res => {
          if (type === 1) {
            this.$getAreaRegionList()
              .then(res => {
                this.regionList = res.data.data
              })
          }
          if (type === 2) {
            this.$getAreaCenterListById(this.radioRegion)
              .then(res => {
                console.log(JSON.stringify(res))
                this.centerList = res.data.data
              })
          }
          if (type === 3) {
            this.$getAreaStationListById(this.radioCenter)
              .then(res => {
                console.log(JSON.stringify(res))
                this.stationList = res.data.data
              })
          }
        })
      }
    },
    addRegion() {
      this.$request({
        url: '/area/areaRegion',
        method: 'post',
        params: {
          region: this.inputRegion
        }
      }).then(res => {
        this.regionList = res.data.data
      })
    },
    addCenter() {
      this.$request({
        url: '/area/areaCenter',
        method: 'post',
        params: {
          regionId: this.radioRegion,
          name: this.inputCenter
        }
      }).then(res => {
        this.centerList = res.data.data
      })
    },
    addStation() {
      this.$request({
        url: '/area/areaStation',
        method: 'post',
        params: {
          centerId: this.radioCenter,
          name: this.inputStation
        }
      }).then(res => {
        this.stationList = res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
