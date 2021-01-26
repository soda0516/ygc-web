<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span>管材种类</span>
          </div>
          <div class="text item" style="margin-bottom: 10px">
            <el-row>
              <el-col :span="17">
                <el-input v-model="inputCategory" placeholder="请输入管材种类" clearable style="width:100%" size="small" />
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button size="small" style="width: 100%;" @click="addCategory">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-table
              :data="categoryList"
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
                  <el-radio v-model="templateRadio" :label="scope.row.id" @change="getTemplateRow(scope.$index,scope.row)">{{ '' }}</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="管材种类"
              >
                <template slot-scope="scope">
                  <el-input v-if="showBtnCategory[scope.$index]" v-model="scope.row.name" size="mini" style="text-align: center" />
                  <span v-if="!showBtnCategory[scope.$index]">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="操作"
                width="145"
              >
                <template slot-scope="scope">
                  <el-button v-if="showBtnCategory[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row,1)">更新</el-button>
                  <el-button v-if="showBtnCategory[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row,1)">取消</el-button>

                  <el-button v-if="!showBtnCategory[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row,1)">编辑</el-button>
                  <el-button v-if="!showBtnCategory[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row,1)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span>管材型号</span>
          </div>
          <div class="text item" style="margin-bottom: 10px">
            <el-row>
              <el-col :span="17">
                <el-input v-model="inputModel" clearable placeholder="请输入管材种类" style="width:100%" size="small" />
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button size="small" style="width: 100%" @click="addModel">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-table
              :data="modelList"
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
                  <el-radio v-model="radioModel" :label="scope.row.id" @click.native.prevent="getTemplateModelRow(scope.$index,scope.row)">{{ '' }}</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="管材型号"
              >
                <template slot-scope="scope">
                  <el-input v-if="showBtnModel[scope.$index]" v-model="scope.row.name" size="mini" style="text-align: center" />
                  <span v-if="!showBtnModel[scope.$index]">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="145"
              >
                <template slot-scope="scope">
                  <el-button v-if="showBtnModel[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row,2)">更新</el-button>
                  <el-button v-if="showBtnModel[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row,2)">取消</el-button>

                  <el-button v-if="!showBtnModel[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row,2)">编辑</el-button>
                  <el-button v-if="!showBtnModel[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row,2)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span>管材规格</span>
          </div>
          <div class="text item" style="margin-bottom: 10px">
            <el-row>
              <el-col :span="17">
                <el-input v-model="inputSpec" clearable placeholder="请输入管材规格" style="width:100%" size="small" />
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button size="small" style="width: 100%" @click="addSpec">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-table
              :data="specList"
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
                  <el-radio v-model="radioSpec" :label="scope.row.id" @click.native.prevent="getTemplateSpecRow(scope.$index,scope.row)">{{ '' }}</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="管材规格"
              >
                <template slot-scope="scope">
                  <el-input v-if="showBtnSpec[scope.$index]" v-model="scope.row.name" size="mini" style="text-align: center" />
                  <span v-if="!showBtnSpec[scope.$index]">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="145"
              >
                <template slot-scope="scope">
                  <el-button v-if="showBtnSpec[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row,3)">更新</el-button>
                  <el-button v-if="showBtnSpec[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row,3)">取消</el-button>

                  <el-button v-if="!showBtnSpec[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row,3)">编辑</el-button>
                  <el-button v-if="!showBtnSpec[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row,3)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span>管材描述</span>
          </div>
          <div class="text item" style="margin-bottom: 10px">
            <el-row>
              <el-col :span="17">
                <el-input v-model="inputDesc" clearable placeholder="请输入管材描述" style="width:100%" size="small" />
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button size="small" style="width: 100%" @click="addDesc">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <el-table
              :data="descList"
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
                  <el-radio v-model="radioDesc" :label="scope.row.id" @click.native.prevent="getTemplateDescRow(scope.$index,scope.row)">{{ '' }}</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="管材描述"
              >
                <template slot-scope="scope">
                  <el-input v-if="showBtnDesc[scope.$index]" v-model="scope.row.name" size="mini" style="text-align: center" />
                  <span v-if="!showBtnDesc[scope.$index]">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="145"
              >
                <template slot-scope="scope">
                  <el-button v-if="showBtnDesc[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row, 4)">更新</el-button>
                  <el-button v-if="showBtnDesc[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row, 4)">取消</el-button>

                  <el-button v-if="!showBtnDesc[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row, 4)">编辑</el-button>
                  <el-button v-if="!showBtnDesc[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row, 4)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-divider />
    <el-row :gutter="24" style="text-align: center">
      <el-button type="primary" @click="showDrawer">显示当前管材列表</el-button>
      <el-button type="success" @click="addDetail">发布一个管材明细</el-button>
    </el-row>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="40%"
      :before-close="handleClose"
    >
      <div class="app-container">
        <el-table
          :data="detailList"
          border
          style="width: 100%"
          size="small"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
        >
          <el-table-column
            label="管材种类"
          >
            <template slot-scope="scope">
              <el-select v-if="showBtnDetail[scope.$index]" v-model="scope.row.categoryId" placeholder="请选择" size="mini" @change="selectCategoryChange">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-if="!showBtnDetail[scope.$index]">{{ scope.row.categoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="管材型号"
          >
            <template slot-scope="scope">
              <el-select v-if="showBtnDetail[scope.$index]" v-model="scope.row.modelId" clearable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in selectModelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-if="!showBtnDetail[scope.$index]">{{ scope.row.modelName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="管材规格"
          >
            <template slot-scope="scope">
              <el-select v-if="showBtnDetail[scope.$index]" v-model="scope.row.specificationId" clearable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in selectSpecList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-if="!showBtnDetail[scope.$index]">{{ scope.row.specificationName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="管材描述"
          >
            <template slot-scope="scope">
              <el-select v-if="showBtnDetail[scope.$index]" v-model="scope.row.descriptionId" clearable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in selectDescList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-if="!showBtnDetail[scope.$index]">{{ scope.row.descriptionName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
          >
            <template slot-scope="scope">
              <el-input v-if="showBtnDetail[scope.$index]" v-model="scope.row.remark" size="mini" style="text-align: center" />
              <span v-if="!showBtnDetail[scope.$index]">{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="145"
          >
            <template slot-scope="scope">
              <el-button v-if="showBtnDetail[scope.$index]" size="mini" @click.native="handleUpdate(scope.$index, scope.row, 5)">更新</el-button>
              <el-button v-if="showBtnDetail[scope.$index]" size="mini" @click.native="handleCancel(scope.$index, scope.row, 5)">取消</el-button>

              <el-button v-if="!showBtnDetail[scope.$index]" size="mini" @click.native="handleEdit(scope.$index, scope.row, 5)">编辑</el-button>
              <el-button v-if="!showBtnDetail[scope.$index]" size="mini" @click.native="handleDelete(scope.$index, scope.row, 5)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailSetting',
  data() {
    return {
      loading: '',
      templateRadio: '',
      selectCategory: {},
      radioModel: '',
      selectModel: {},
      radioSpec: '',
      selectSpec: {},
      radioDesc: '',
      selectDesc: {},
      categoryList: [],
      modelList: [],
      specList: [],
      descList: [],
      selectModelList: [],
      selectSpecList: [],
      selectDescList: [],
      inputCategory: '',
      inputModel: '',
      inputSpec: '',
      inputDesc: '',
      showEdit: [], // 显示编辑框
      showBtnCategory: [],
      showBtnModel: [],
      showBtnSpec: [],
      showBtnDesc: [],
      showBtnDetail: [],
      showBtnOrdinary: true,
      drawer: false,
      direction: 'rtl',
      detailList: []
    }
  },
  mounted() {
    this.$axios.all([this.$getProductCategoryList(), this.$getProductDetailList()])
      .then(this.$axios.spread((res1, res2) => {
        this.categoryList = res1.data.data
        this.detailList = res2.data.data
      }))
  },
  methods: {
    addCategory() {
      this.$request({
        url: '/product/productCategory',
        method: 'post',
        params: {
          name: this.inputCategory
        }
      }).then(res => {
        this.categoryList = res.data.data
      }).finally(() => {
      })
    },
    addModel() {
      this.$request({
        url: '/product/productModel',
        method: 'post',
        params: {
          name: this.inputModel,
          categoryId: this.templateRadio
        }
      }).then(res => {
        this.modelList = res.data.data
      }).finally(() => {
      })
    },
    addSpec() {
      this.$request({
        url: '/product/productSpecification',
        method: 'post',
        params: {
          name: this.inputSpec,
          categoryId: this.templateRadio
        }
      }).then(res => {
        this.specList = res.data.data
      }).finally(() => {
      })
    },
    addDesc() {
      this.$request({
        url: '/product/productDescription',
        method: 'post',
        params: {
          name: this.inputDesc,
          categoryId: this.templateRadio
        }
      }).then(res => {
        this.descList = res.data.data
      }).finally(() => {
      })
    },
    getTemplateRow(index, value) {
      console.log('this.selectCategory')
      console.log(this.selectCategory)
      this.selectCategory = value
      this.$axios.all([this.$getProductModelList(this.templateRadio), this.$getProductSpecList(this.templateRadio), this.$getProductDescList(this.templateRadio)])
        .then(this.$axios.spread((res1, res2, res3) => {
          console.log(res3)
          this.modelList = res1.data.data
          this.specList = res2.data.data
          this.descList = res3.data.data

          this.selectModel = {}
          this.selectSpec = {}
          this.selectDesc = {}
        }))
    },
    getTemplateModelRow(index, row) {
      if (this.radioModel === row.id) {
        this.radioModel = ''
      } else {
        this.radioModel = row.id
        this.selectModel = row
      }
    },
    getTemplateSpecRow(index, row) {
      console.log(JSON.stringify(row))
      if (this.radioSpec === row.id) {
        this.radioSpec = ''
      } else {
        this.radioSpec = row.id
        this.selectSpec = row
      }
    },
    getTemplateDescRow(index, row) {
      console.log(JSON.stringify(row))
      if (this.radioDesc === row.id) {
        this.radioDesc = ''
      } else {
        this.radioDesc = row.id
        this.selectDesc = row
      }
    },
    addDetail() {
      this.$request({
        url: '/product/productDetail',
        method: 'post',
        params: {
          category: JSON.stringify(this.selectCategory),
          model: JSON.stringify(this.selectModel),
          spec: JSON.stringify(this.selectSpec),
          desc: JSON.stringify(this.selectDesc)
        }
      }).then(res => {
        this.detailList = res.data.data
      }).finally(() => {
      })
    },
    // 点击编辑
    handleEdit(index, row, type) {
      if (type === 1) {
        this.$set(this.showBtnCategory, index, true)
      }
      if (type === 2) {
        this.$set(this.showBtnModel, index, true)
      }
      if (type === 3) {
        this.$set(this.showBtnSpec, index, true)
      }
      if (type === 4) {
        this.$set(this.showBtnDesc, index, true)
      }
      if (type === 5) {
        console.log('this.showBtnDetail')
        this.$set(this.showBtnDetail, index, true)
        this.selectCategoryChange(row.categoryId)
      }
    },
    handleCancel(index, row, type) {
      if (type === 1) {
        this.$set(this.showBtnCategory, index, false)
      }
      if (type === 2) {
        this.$set(this.showBtnModel, index, false)
      }
      if (type === 3) {
        this.$set(this.showBtnSpec, index, false)
      }
      if (type === 4) {
        this.$set(this.showBtnDesc, index, false)
      }
      if (type === 5) {
        this.$set(this.showBtnDetail, index, false)
      }
    },
    handleUpdate(index, row, type) {
      console.log(index)
      console.log(JSON.stringify(row))
      var url
      if (type === 1) {
        url = 'productCategory'
      }
      if (type === 2) {
        url = 'productModel'
      }
      if (type === 3) {
        url = 'productSpecification'
      }
      if (type === 4) {
        url = 'productDescription'
      }
      if (type === 5) {
        url = 'productDetail'
      }
      if (url) {
        this.$request({
          url: '/product/' + url,
          method: 'put',
          params: {
            item: JSON.stringify(row)
          }
        }).then(res => {
          if (type === 1) {
            this.$set(this.categoryList, index, res.data.data)
          }
          if (type === 2) {
            this.$set(this.modelList, index, res.data.data)
          }
          if (type === 3) {
            this.$set(this.specList, index, res.data.data)
          }
          if (type === 4) {
            console.log(res.data.data)
            this.$set(this.descList, index, res.data.data)
          }
          if (type === 5) {
            console.log(res.data.data)
            this.$set(this.detailList, index, res.data.data)
          }
        }).finally(() => {
          if (type === 1) {
            this.$set(this.showBtnCategory, index, false)
          }
          if (type === 2) {
            this.$set(this.showBtnModel, index, false)
          }
          if (type === 3) {
            this.$set(this.showBtnSpec, index, false)
          }
          if (type === 4) {
            this.$set(this.showBtnDesc, index, false)
          }
          if (type === 5) {
            this.$set(this.showBtnDetail, index, false)
          }
        })
      }
    },
    handleDelete(index, row, type) {
      var url
      if (type === 1) {
        url = 'productCategory'
      }
      if (type === 2) {
        url = 'productModel'
      }
      if (type === 3) {
        url = 'productSpecification'
      }
      if (type === 4) {
        url = 'productDescription'
      }
      if (type === 5) {
        url = 'productDetail'
      }
      if (url) {
        this.$request({
          url: '/product/' + url + '/' + row.id,
          method: 'delete'
        }).then(res => {
          if (type === 1) {
            this.categoryList.splice(index, 1)
          }
          if (type === 2) {
            this.modelList.splice(index, 1)
          }
          if (type === 3) {
            this.specList.splice(index, 1)
          }
          if (type === 4) {
            this.descList.splice(index, 1)
          }
          if (type === 5) {
            this.$request.all([this.$getProductDetailList()])
              .then(this.$request.spread((res2) => {
                this.detailList = res2.data.data
              }))
          }
        })
      }
    },
    showDrawer() {
      this.drawer = true
    },
    handleClose(done) {
      done()
    },
    selectCategoryChange(categoryId) {
      this.$axios.all([this.$getProductModelList(categoryId), this.$getProductSpecList(categoryId), this.$getProductDescList(categoryId)])
        .then(this.$axios.spread((res1, res2, res3) => {
          console.log(res3)
          this.selectModelList = res1.data.data
          this.selectSpecList = res2.data.data
          this.selectDescList = res3.data.data
        }))
    }
  }
}
</script>

<style scoped>

</style>
