<template lang="pug">
  div.org-list-item(v-bind:class="{'active':item.active}" v-on:click="click")
    div.title
      span {{item.name}}
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
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .org-list-item
    cursor: pointer
    &:after
      content ''
      clear: both
    &:first-child
      .list_group_title
        border-top: 0
    &.active
      .list_group_body
        display block
      .title
        background-image: url(images/open_arrow_fire.png)
    .list_group_body
      display none
    .title
      padding .65em 28px .75em
      border-top 1px solid #ccc
      background url(images/open_arrow.png) no-repeat 12px
      background-size 14px 14px
      .online-percent
        color #808080
        font-size 12px
        float right
        line-height 20px
</style>
