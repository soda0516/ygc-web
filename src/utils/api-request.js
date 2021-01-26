
export function getAreaRegionList() {
  return this.$request.get('/area/areaRegion/list/all')
}
export function getProductCategoryListDetailList() {
  return this.$request.get('/product/productCategory/list/detail')
}
export function getProductSubjectList() {
  return this.$request.get('/product/productSubject/list/subject')
}
export function getOrderOperTypeList() {
  return this.$request.get('/order/commons/operType/list')
}
export function getOrderTypeList() {
  return this.$request.get('/order/commons/orderType/list')
}
export function getProductOptionList() {
  return this.$request.get('/product/productCategory/list/detail')
}
export function getAreaCenterListById(id) {
  return this.$request.get('/area/areaCenter/list/' + id)
}
export function getAreaStationListById(id) {
  return this.$request.get('/area/areaStation/list/' + id)
}
export function getOperTypeList() {
  return this.$request.get('/order/commons/operType/list')
}
export function getProductDetailList() {
  return this.$request.get('/product/productDetail/list')
}
export function getProductCategoryList() {
  return this.$request.get('/product/productCategory/list')
}
export function getProductModelList(id) {
  return this.$request.get('/product/productModel/list/category/' + id)
}
export function getProductDescList(id) {
  return this.$request.get('/product/productDescription/list/category/' + id)
}
export function getProductSpecList(id) {
  return this.$request.get('/product/productSpecification/list/category/' + id)
}
export function getStoreInfoList() {
  return this.$request.get('/store/storeInfo/list')
}
