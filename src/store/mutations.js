import * as types from './mutation-types'

const mutations = {
  [types.SaveLogin](state, payload) {
    state.user = payload
  }
}
export default mutations
