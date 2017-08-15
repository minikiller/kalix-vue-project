<template lang="pug">
  div
    p {{count}}
    button(@click="inc") +
    button(@click="dec") -
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      inc: state => state.count++,
      dec: state => state.count--
    }
  })
  export default {
    computed: {
      count() {
        return store.state.count
      }
    },
    methods: {
      inc () {
        store.commit('inc')
      },
      dec () {
        store.commit('dec')
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
