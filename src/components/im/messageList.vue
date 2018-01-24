<template lang="pug">
  div.message-list
    im-header
      user-avatar(v-bind:user="user")
    div.im-bd
      ul.user-list(id="user-list-session")
        li.user-list_item
          div.user_avatar_wrapper
            img.avatar(src="/static/images/im/user-1.png")
          div.user-list_item_main
            p.member_nick user
            p.member_msg.text_ellipsis 消息
          div.time 16:25
        li.user-list_item
          div.user_avatar_wrapper
            img.avatar(src="/static/images/im/user-2.png")
          div.user-list_item_main
            p.member_nick 用户2
            p.member_msg.text_ellipsis 《参加全国大学生竞赛》
          div.time 16:25
        li.user-list_item
          div.user_avatar_wrapper
            img.avatar(src="/static/images/im/sys-message.png")
          div.user-list_item_main
            p.member_nick 实时消息
            p.member_msg.text_ellipsis 参加今天的下午5点会
          div.time 16:25
        li.user-list_item
          div.user_avatar_wrapper
            img.avatar(src="/static/images/im/user-file.png")
          div.user-list_item_main
            p.member_nick 审批文件
            p.member_msg.text_ellipsis 《参加全国大学生竞赛》
          div.time 16:25
</template>
<script type="text/ecmascript-6">
  import imHeader from './imHeader'
  import UserAvatar from './userAvatar'

  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {
            userName: ''
          }
        }
      }
    },
    components: {
      imHeader,
      UserAvatar
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .message-list
    .im-bd
      height 100%
      display flex
      flex-direction column
      .im-bd
        width 100%
        overflow auto
        flex 1
        box-sizing border-box
        border-left 1px solid #cbbb7a
        border-right 1px solid #cbbb7a
        background-color #ffffeb
        &::-webkit-scrollbar
          width 4px
          height 4px
          background-color #ffffff
        &::-webkit-scrollbar-thumb
          border-radius 4px
          background-color #999999

    /* 用户列表 */
    .user-list
      .user-list_item
        height 70px
        width 100%
        padding 0 20px
        background url("./user-item-bg.png") 50% 0 repeat-x
        border-bottom 1px solid #f0ebca
        box-sizing border-box
        cursor pointer
        &.selected
          background-image url("./user-item-bg.png")
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
