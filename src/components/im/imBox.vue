<template lang="pug">
  div.im-box
    div.im-hd
      slot(name="imHeader")
    div.im-bd
      slot(name="imBody")
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped lang="stylus" type="text/stylus">
  .im-box
    height 100%
    display flex
    flex-direction column
    .im-hd
      width 100%
      height 55px
      background-color #ae935c
      display flex
      border-radius 4px 4px 0 0
      border 1px solid #a8925f
      border-bottom 1px solid #cbbb7a
      box-sizing border-box
    .im-bd
      display flex
      flex 1
      flex-direction column
      overflow auto
      box-sizing border-box
      border-left 1px solid #cbbb7a
      border-right 1px solid #cbbb7a
      &::-webkit-scrollbar
        width 4px
        height 4px
        background-color #ffffff
      &::-webkit-scrollbar-thumb
        border-radius 4px
        background-color #999999
</style>
