// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import axios from 'config/axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
// import Search from '@/components/table/search'
// import Wrapper from '@/components/table/wrapper'
// import KalixDialog from '@/components/table/dialog'
import {GlobalComponent, GlobalFilter} from 'config/global.toml'
import './element-ui'
import Es6Promise from 'es6-promise'
// import VueMce from 'vue-mce'

Es6Promise.polyfill()
// Vue.use(VueMce)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// for (const item of GlobalComponent) {
//   console.log(item.name, item.path)
//   var com = require(`${item.path}`)
//   Vue.component(item.name, com)
// }

const _import = require('./components/_import_' + process.env.NODE_ENV)
// 注册全局组件
GlobalComponent.forEach((item) => {
  console.log('[kalix]-[main.js] registry component name is: ' + item.name, '; registry path is: ' + item.path)
  Vue.component(item.name, _import(item.path))
})
// 注册全局过滤器
GlobalFilter.forEach((item) => {
  console.log('[kalix]-[main.js] registry filter name is: ' + item.name, '; registry path is: ' + item.path)
  Vue.filter(item.name, _import(item.path))
})

// Vue.component('kalix-search', Search)
// Vue.component('kalix-wrapper', Wrapper)
// Vue.component('input-cell', InputCell)
// Vue.component('kalix-dialog', KalixDialog)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
