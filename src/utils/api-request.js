
export function getAreaRegionList() {
  return this.$axios.get('http://127.0.0.1:8080/area/areaRegion/list/all')
}
export function getProductCategoryListDetailList() {
  return this.$axios.get('http://127.0.0.1:8080/product/productCategory/list/detail')
}
export function getProductSubjectList() {
  return this.$axios.get('http://127.0.0.1:8080/product/productSubject/list/subject')
}
export function getOrderOperTypeList() {
  return this.$axios.get('http://127.0.0.1:8080/order/commons/operType/list')
}
export function getOrderTypeList() {
  return this.$axios.get('http://127.0.0.1:8080/order/commons/orderType/list')
}
export function getProductOptionList() {
  return this.$axios.get('http://127.0.0.1:8080/product/productCategory/list/detail')
}
export function getAreaCenterListById(id) {
  return this.$axios.get('http://127.0.0.1:8080/area/areaCenter/list/' + id)
}
export function getAreaStationListById(id) {
  return this.$axios.get('http://127.0.0.1:8080/area/areaStation/list/' + id)
}
export function getOperTypeList() {
  return this.$axios.get('http://127.0.0.1:8080/order/commons/operType/list')
}
