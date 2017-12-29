<template lang="pug">
  div.panel_header
    div.panel_title
      slot(name="title")
    div.item
      slot(name="right")
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  .panel_header
    display flex;
    box-orient horizontal;
    height 55px;
    width 100%;
    border-radius $borderRadius $borderRadius 0 0;
    justify-content flex-start;
    align-items center;
    background-color #ae935c
    .item
      flex 1
      font-size 0
      padding: 6px 10px !important;
      &:last-child
        text-align right
    .panel_title
      padding 0 14px
      font-weight: 400;
      font-size: 18px;
      line-height: 100%;
      text-align: center;
      box-flex: 15;
      color #ffffff
      text_ellipsis()
</style>
