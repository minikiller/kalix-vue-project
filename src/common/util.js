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
