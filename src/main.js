// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'config/axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
// import Search from '@/components/table/search'
// import Wrapper from '@/components/table/wrapper'
// import KalixDialog from '@/components/table/dialog'
import {GlobalComponent, GlobalFilter} from 'config/global.toml'
import './element-ui'
import KalixBase from 'kalix-base'

// 列表树引入
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(KalixBase)

// for (const item of GlobalComponent) {
//   console.log(item.name, item.path)
//   var com = require(`${item.path}`)
//   Vue.component(item.name, com)
// }
// 注册全局组件
GlobalComponent.forEach((item) => {
  console.log('[kalix]-[main.js] registry component name is: ' + item.name, '; registry path is: ' + item.path)
  Vue.component(item.name, item.path)
})
// 注册全局过滤器
GlobalFilter.forEach((item) => {
  console.log('[kalix]-[main.js] registry filter name is: ' + item.name, '; registry path is: ' + item.path)
  Vue.filter(item.name, item.path)
})

// Vue.component('kalix-search', Search)
// Vue.component('kalix-wrapper', Wrapper)
// Vue.component('input-cell', InputCell)
// Vue.component('kalix-dialog', KalixDialog)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
