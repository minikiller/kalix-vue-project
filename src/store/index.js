/**
 * Created by Administrator on 2017/7/12.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  mutations,
  actions,
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
