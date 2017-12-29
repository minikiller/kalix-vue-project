<!--
描述：语音通话
开发人：juezhan
开发日期：2017年12月6日
-->
<template lang="pug">
  div.voice-call
    div.hd
      div.hd-btn-wrapper
        div.hd-btn.min
        div.hd-btn.close
    div.bd
      div.user
        div.avatar
        div.name 人物名称
      div.calling(v-if="isCalling")
        div.dot
        div.dot
        div.dot
      div.conversation(v-if="!isCalling")
        div.timer 00:05
        div.operation
          div.item
            div.icon-btn.jingyin
            div.text 静音
          div.item
            div.icon-btn.yinliang
            div.text 音量
      div.btn-wrapper
        div.btn-call
</template>
<script type="text/ecmascript-6">
  import PanelHeader from './panelHeader'

  export default {
    data() {
      return {
        isCalling: false
      }
    },
    methods: {
      min() {
      },
      close() {
      }
    },
    components: {
      PanelHeader
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .voice-call
    position absolute
    top 0
    left 0
    width 293px
    height 442px
    background-color rgba(45, 46, 45, .82)
    border-radius 4px
    .hd
      height 38px
      .hd-btn-wrapper
        font-size 0
        float right
        margin 7px 8px
        .hd-btn
          display inline-block
          width 20px
          height 20px
          background 50% 50% transparent no-repeat
          cursor pointer
          border-radius 4px
          transition all .2s
          &:hover
            background-color #000000
          &.min
            background-image url("./images/icon-min-b.png")
          &.close
            background-image url("./images/icon-close-b.png")
    .bd
      .user
        margin-top 35px
        text-align center
        .avatar
          display inline-block
          width 97px
          height 97px
          background url("./images/user-a.png") 0 0 no-repeat
          border-radius 50%
        .name
          font-size 14px
          color #ffffff
          margin-top 17px
      .btn-wrapper
        position absolute
        font-size 0
        text-align center
        width 100%
        bottom 104px
        .btn-call
          display inline-block
          width 48px
          height 48px
          background url("./images/vioce-call-bg.png") 0 0 no-repeat
          border-radius 50%
      .timer
        font-size 12px
        text-align center
      .operation
        text-align center
        font-size 0
        .item
          margin 0 20px
          display inline-block
          .icon-btn
            width 42px
            height 42px
            background 0 0 no-repeat
            border-radius 50%
            &.jingyin
              background-image url("./images/icon-maikefeng.png")
            &.yinliang
              background-image url("./images/icon-yinliang.png")
          .text
            font-size 12px
            margin-top 9px

      .calling
        text-align center
        font-size 0
        margin-top 14px
        .dot
          display inline-block
          border-radius 50%
          width 8px
          height 8px
          background-color #ffffff
          & + .dot
            margin-left 11px
          &:nth-child(1)
            animation calling 1s infinite
          &:nth-child(2)
            animation calling 1s infinite .2s
          &:nth-child(3)
            animation calling 1s infinite .4s

  @keyframes calling
    0%, 100%
      opacity 1
    50%
      opacity .5


</style>
