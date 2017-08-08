<template lang="pug" src="./Hello.pug">
</template>

<script type="text/ecmascript-6">
  import {msg} from './Hello.toml'
  export default {
    name: 'hello',
    data() {
      return {
        msg: msg
      }
    },
    methods: {
      changeMsg() {
        this.msg = 'hello'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import './Hello.styl'
</style>
