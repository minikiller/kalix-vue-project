import {dictKeyObject} from 'common/keyValueObject'

export default function dataRestructure(_data) {
  let _keyObj = dictKeyObject(`RESEARCH-DICT-KEY`, 'value', 'label')
  _data.forEach(function (e) {
    if (_keyObj) {
      e.positionalTitles = _keyObj[e.positionalTitles]
    }
  })
  return _data
}
