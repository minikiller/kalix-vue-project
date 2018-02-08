<template lang="pug">
  div.side_list_item(v-on:click="click" v-bind:class="{'selected':item.isSelect}")
    i.icon(v-bind:class="item.icon")
    | {{item.text}}
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .side_list_item
    height 53px
    line-height 53px
    border-top 1px solid #625833
    padding 0 21px
    font-size 14px
    color #cec9c8
    cursor pointer
    &:first-chile
      border none
    .icon
      display inline-block
      width 28px
      height 28px
      border-radius 50%
      margin 13px 15px 0 0
      background #48372f 50% 50% no-repeat
      float left
      &.item_home
        background-image: url(images/icon-1.png) !important
      &.item_history
        background-image: url(images/icon-2.png) !important
      &.item_setup
        background-image: url(images/icon-3.png) !important
      &.item_collect
        background-image: url(images/icon-4.png) !important
      &.item_edit
        background-image: url(images/icon-5.png) !important
    &.selected
      color #ffe1dd
      background-color rgba(197, 172, 113, 0.29)
      .icon
        background-color #937d67

</style>
