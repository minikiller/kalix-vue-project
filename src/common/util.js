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

/**
 * 2017-9-6 桑杨
 * 合并对象数组
 * @param newArr 追加数组
 * @param oldArr 原始数组
 * @returns {Array} 合并后的数组
 */
export function concatArrayObject(newArr, oldArr) {
  let retArr = []
  if (newArr.length > 0) {
    oldArr.forEach((e, i) => {
      let _j = -1
      var item = newArr.find((e2, j) => {
        _j = j
        return e2.id === e.id
      })
      if (item) {
        retArr.push(Object.assign(e, item))
        newArr.splice(_j, 1)
      } else {
        retArr.push(e)
      }
    })
    if (newArr.length > 0) {
      newArr.forEach(e => {
        retArr.push(e)
      })
    }
  } else {
    retArr = oldArr
  }
  return retArr
}

/**
 * 2017-9-6 桑杨
 * 合并对象
 * @param newObj 新对象
 * @param oldObj 原对象
 * @returns {*} 合并后的对象
 */
export function concatObject(newObj, oldObj) {
  if (!isEmptyObject(newObj)) {
    oldObj = Object.assign(newObj, oldObj)
  }
  return oldObj
}
