<template lang="pug">
  div#app
    <!--img(src="./assets/logo.png")-->
    keep-alive
      router-view
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/comm.styl"
</style>
