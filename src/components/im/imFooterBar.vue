<template lang="pug">
  div.im-footer-bar(v-bind:class="cls" v-on:click="click")
    div.icon
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {}
    },
    data() {
      return {
        isSelected: false
      }
    },
    methods: {
      isSelect(flag) {
        this.isSelected = flag
      },
      click() {
        this.$emit('click')
      }
    },
    computed: {
      cls() {
        if (this.data.isSelect) {
          return this.data.type + ' selected'
        }
        return this.data.type
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  $borderRadius = 4px
  .im-footer-bar
    position relative
    overflow hidden
    flex 1
    display flex
    height 68px
    color #ccc
    font-size 0px
    text-align center
    cursor pointer
    justify-content center
    align-items center
    &:before
      top 0
      left 0
      position absolute
      display block
      content ''
      width 1px
      height 100%
      background-image url("./nav_tab_item_border.png")
    &:first-child
      border-radius 0 0 0 $borderRadius
      &:before
        visibility hidden
    &:last-child
      border-radius 0 0 $borderRadius 0
    .icon
      display inline-block
      width 34px
      height 34px
      background-size 100% 100%
    &.contact .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_conversation.png)
    }

    &.conversation .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_contact.png)
    }

    &.plugin .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_plugin.png)
    }

    &.setup .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_setup.png)
    }

    &.selected.contact .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_conversation_selected.png)
    }

    &.selected.conversation .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_contact_selected.png)
    }

    &.selected.plugin .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_plugin_selected.png)
    }

    &.selected.setup .icon {
      background-image: url(http://w.qq.com/css/image/tab_icon_setup_selected.png)
    }


</style>
