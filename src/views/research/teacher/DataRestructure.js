import Cache from 'common/cache'
import {isEmptyObject} from 'common/util'

export default function dataRestructure(_data) {
  let _keyObj = CreateDictKeyObject(`RESEARCH-DICT-KEY`, 'value', 'label')
  if (_keyObj) {
    _data.forEach(function (e) {
      e.positionalTitles = _keyObj[e.positionalTitles]
    })
  }
  return _data
}

//  获取键值对对象
function CreateDictKeyObject(_DictKey, _value, _label) {
  let dataDictKey = JSON.parse(Cache.get(_DictKey))
  let _keyObj = {}
  dataDictKey.forEach(function (e) {
    _keyObj[e[_value]] = e[_label]
  })
  return !isEmptyObject(_keyObj) ? _keyObj : null
}
