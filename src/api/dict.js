import Cache from 'common/cache'
import Vue from 'vue'

const getDict = (_appName, _dictType) => {
  const DictURL = `/camel/rest/${_appName}/dicts`
  const DictKey = `${_appName.toUpperCase()}-DICT-KEY`
  if (!Cache.get(DictKey)) {
    const data = {
      page: 1,
      start: 0,
      limit: 200,
      sort: '[{\'property\': \'value\', \'direction\': \'ASC\'}]'
    }
    Vue.axios.get(DictURL, {
      params: data
    }).then(response => {
      if (response.data) {
        Cache.save(DictKey, JSON.stringify(response.data.data))
        return initItems(response.data.data)
      }
    })
  } else {
    let data = JSON.parse(Cache.get(DictKey))
    return initItems(data)
  }

  function initItems(data) {
    return data.filter(item => {
      return item.type === _dictType
    })
  }
}

export {getDict}
