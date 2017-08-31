/**
 * 2017-8-16 桑杨
 * 检测 obj 是否是空对象
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
  for (var key in obj) {
    return false
  }
  return true
}

export function getCookie(cookieName) {
  var strCookie = document.cookie
  var arrCookie = strCookie.split('; ')
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split('=')
    if (cookieName === arr[0]) {
      return arr[1]
    }
  }
  return ''
}
