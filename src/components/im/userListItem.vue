<template lang="pug">
  div.user-list_item(v-on:dblclick="onDbClock")
    div.user_avatar_wrapper
      div.avatar(v-bind:style="styleObject()")
    div.user-list_item_main
      div.member_nick {{item.title}}
      div.member_msg.text_ellipsis {{item.content}}
    div.time {{getTime(item.time)}}
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'

  export default {
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      onDbClock() {
        EventBus.$emit('onChatItemDbClick', this.item)
      },
      styleObject() {
        let style = {}
        if (this.item.avatar) {
          style = {
            backgroundImage: `url('${this.item.avatar}')`
          }
        }
        return style
      },
      getTime(time) {
        let t = new Date(time)
        return `${t.getHours()}:${t.getMinutes()}`
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .user-list_item
    height 70px
    width 100%
    padding 0 20px
    background url("images/user-item-bg.png") 50% 0 repeat-x
    border-bottom 1px solid #f0ebca
    box-sizing border-box
    cursor pointer
    &.selected
      background-image url("images/user-item-bg.png")
    .user_avatar_wrapper
      display inline-block
      margin-right 8px
      margin-top 15px
      position relative
      float left
      .avatar
        width 40px
        height 40px
        border-radius 50%
        border 1px solid #dddddd
        background-size cover
      .badge
        position absolute
        display inline-block
        top -6px
        right -2px
        width 14px
        height 14px
        font-size 12px
        color #ffffff
        text-align center
        line-height 14px
        border-radius 50%
        border 1px solid #fff
        background-color #ff3b2f
        .badge-text
          transform scale(0.8333)
    .user-list_item_main
      display inline-block
      float left
      margin 0
      margin-top 15px
      width 134px
      .member_nick
        height: 16px;
        line-height: 16px;
        overflow: hidden;
        margin-top 6px;
      .member_msg
        font-size: 12px;
        line-height 14px
        color: #898a93;
        margin-top 2px
        text_ellipsis()

    .time
      display inline-block
      float right
      margin-top 21px
      margin-left 8px
      font-size 14px;
      color #bcbdc0
</style>
