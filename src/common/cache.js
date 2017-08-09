/**
 * Created by sunlf on 2017/7/21.
 * 封装本地缓存
 */
export default {
  save(key, data) {
    sessionStorage.setItem(key, data)
  },
  get(key) {
    return sessionStorage.getItem(key)
  },
  clear() {
    sessionStorage.clear()
  }
}
