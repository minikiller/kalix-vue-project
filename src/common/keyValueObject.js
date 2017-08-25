import Cache from 'common/cache'
import {isEmptyObject} from 'common/util'
/***
 * 描述：获取 对应 _DictKey 的键值对对象
 * 开发人：桑杨
 * 开发日期：2017年8月25日
 * @param _DictKey  缓存 Cache Key
 * @param _value  对象"键"对应的列名
 * @param _label  对象"值"对应的列名
 * @returns {*}
 */
export function dictKeyObject(_DictKey, _value, _label) {
  let dataDictKey = JSON.parse(Cache.get(_DictKey))
  let _keyObj = {}
  dataDictKey.forEach(function (e) {
    _keyObj[e[_value]] = e[_label]
  })
  return !isEmptyObject(_keyObj) ? _keyObj : null
}
