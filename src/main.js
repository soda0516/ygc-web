import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import cnlocale from 'element-ui/lib/locale/lang/zh-CN'
import request from './utils/request'
import {
  getAreaRegionList,
  getProductCategoryListDetailList,
  getProductSubjectList,
  getOrderOperTypeList,
  getOrderTypeList,
  getProductOptionList,
  getAreaCenterListById,
  getAreaStationListById,
  getOperTypeList,
  getProductCategoryList,
  getProductModelList,
  getProductDescList,
  getProductSpecList,
  getProductDetailList,
  getStoreInfoList } from './utils/api-request'
import { parseDateFull } from './utils/commons-util'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

import '@/icons' // icon
import '@/permission'
// import { getStoreInfoList } from '@/utils/api-request' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { cnlocale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)cnlocale

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$axios = axios
Vue.prototype.$store = store

Vue.prototype.$getAreaRegionList = getAreaRegionList
Vue.prototype.$getProductCategoryListDetailList = getProductCategoryListDetailList
Vue.prototype.$getProductSubjectList = getProductSubjectList
Vue.prototype.$getOrderOperTypeList = getOrderOperTypeList
Vue.prototype.$getOrderTypeList = getOrderTypeList
Vue.prototype.$getProductOptionList = getProductOptionList
Vue.prototype.$getAreaCenterListById = getAreaCenterListById
Vue.prototype.$getAreaStationListById = getAreaStationListById
Vue.prototype.$getOperTypeList = getOperTypeList
Vue.prototype.$getProductCategoryList = getProductCategoryList
Vue.prototype.$getProductModelList = getProductModelList
Vue.prototype.$getProductDescList = getProductDescList
Vue.prototype.$getProductSpecList = getProductSpecList
Vue.prototype.$getProductDetailList = getProductDetailList
Vue.prototype.binParseDateFull = parseDateFull
Vue.prototype.$getStoreInfoList = getStoreInfoList

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
