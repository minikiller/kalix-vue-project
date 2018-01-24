<template lang="pug">
  div.im-header
    slot
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped lang="stylus" type="text/stylus">
  .im-header
    width 100%
    height 55px
    background-color #ae935c
    display flex
    border-radius 4px 4px 0 0
    border 1px solid #a8925f
    border-bottom 1px solid #cbbb7a
    box-sizing border-box
    .im-header_title
      line-height 55px
      text-align center
      flex 1
      color #ffffff
</style>
