import {OaWorkflowComponent} from '../config.toml'
import Vue from 'vue'
const _import = require('@/api/_import_' + process.env.NODE_ENV)

const registerComp = () => {
// 注册全局组件
  OaWorkflowComponent.forEach((item) => {
    console.log('[kalix]-[oa] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, _import(item.path))
  })
}

export {registerComp}
