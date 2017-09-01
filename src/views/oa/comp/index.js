import {OaWorkflowComponent} from '../config.toml'
import Vue from 'vue'

const registerComp = () => {
// 注册全局组件
  OaWorkflowComponent.forEach((item) => {
    console.log('[kalix]-[oa] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })
}

export {registerComp}
