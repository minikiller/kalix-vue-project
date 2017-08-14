// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'config/axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'

import Search from '@/components/table/search'
import Wrapper from '@/components/table/wrapper'
import KalixDialog from '@/components/table/dialog'
import UserAdd from '@/views/admin/user/userAdd'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)

// 注册全局组件
Vue.component('kalix-search', Search)
Vue.component('kalix-wrapper', Wrapper)
// Vue.component('input-cell', InputCell)
Vue.component('kalix-dialog', KalixDialog)
Vue.component('KalixUserAdd', UserAdd)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
