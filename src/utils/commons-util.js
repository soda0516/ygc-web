export function parseDateFull(time) {
  if (!time) {
    return ''
  }
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
}
