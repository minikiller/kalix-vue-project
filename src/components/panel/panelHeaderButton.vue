<template lang="pug">
  div.panel-header-button(v-bind:class="type" v-on:click="click")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      type: ''
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  .panel-header-button
    display inline-block
    width 26px
    height 26px
    background 50% 50% no-repeat
    cursor pointer
    border-radius $borderRadius
    transition background-color 0.2s, border-color 0.2s
    border 1px solid transparent
    background-color #ae935c
    &:hover
      background-color #7b6a48
    & + .panel-header-button
      margin-left 10px
    &.fixed
      background-image url("/static/images/im/icon-fixed.png")
    &.min
      background-image url("/static/images/im/icon-min.png")
    &.max
      background-image url("/static/images/im/icon-max.png")
    &.close
      background-image url("/static/images/im/icon-close.png")

</style>
