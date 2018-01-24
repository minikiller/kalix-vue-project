<!--
描述：即时通讯-侧栏
开发人：桑杨
开发日期：2018年1月15日
-->
<template lang="pug">
  div.side_bar(v-bind:class="{'show':isShow}")
    div.tool-btn.close.side_bar_close
    div.user_info
      div.avatar_wrapper
        div.avatar(v-bind:style="styleObject")
      div.user_name {{user.userName}}
      div.user_org 动画研究院
    ul.side_list
      li.side_list_item.selected
        i.icon(style="background-image: url(/static/images/im/icon-1.png)")
        | 首页
      li.side_list_item
        i.icon(style="background-image: url(/static/images/im/icon-2.png)")
        | 历史纪录
      li.side_list_item
        i.icon(style="background-image: url(/static/images/im/icon-3.png)")
        | 个人设置
      li.side_list_item
        i.icon(style="background-image: url(/static/images/im/icon-4.png)")
        | 收藏
      li.side_list_item
        i.icon(style="background-image: url(/static/images/im/icon-5.png)")
        | 编辑
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      isShow: {
        type: Boolean
      },
      user: {
        default: () => {
          return {}
        }
      }
    },
    methods: {
      styleObject() {
        let style = {}
        if (this.icon) {
          style = {
            backgroundImage: `url('${this.user.icon}')`
          }
        }
        return style
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .side_bar
    position absolute
    top 0
    left 0
    width 90%
    height 100%
    overflow hidden
    border-radius 4px 0 0 4px
    background url("./side_bar-bg.png") 0 0 repeat
    transition transform .5s

    &.show
      transform translate3d(-100%, 0, 0)
    .side_bar_close
      position absolute
      top 0px
      left 0px
      border-radius-bottomright 0
    .user_info
      text-align center
      padding 21px 0 13px
      .avatar_wrapper
        display inline-block
        border 1px solid #fefeea
        border-radius 50%
        padding 13px
        .avatar
          width 81px
          height 81px
          border 0
          margin 0
      .user_name,
      .user_org
        font-size 14px
        line-height 14px
      .user_name
        margin-top 11px
        font-weight bold
        color #ffffff
      .user_org
        margin-top 5px
        color #c5ac71
    .side_list
      border solid #625833
      border-width 1px 0
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
        &.selected
          color #ffe1dd
          background-color rgba(197, 172, 113, 0.29)
          .icon
            background-color #937d67

</style>
