import Cache from 'common/cache'
import {isEmptyObject} from 'common/util'
//  获取 对应 _DictKey 的键值对对象
export function dictKeyObject(_DictKey, _value, _label) {
  let dataDictKey = JSON.parse(Cache.get(_DictKey))
  let _keyObj = {}
  dataDictKey.forEach(function (e) {
    _keyObj[e[_value]] = e[_label]
  })
  return !isEmptyObject(_keyObj) ? _keyObj : null
}
