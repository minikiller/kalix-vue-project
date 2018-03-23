<template lang="pug">
  div.call-panel(v-bind:class="cls" ref="callPanel")
    slot(name="panelSlot")
    div.user-avatar
      div.avatar
      div.content
        div.name 人物名称
        div.message 等待对方接受邀请 ...
    div.timer 00:01
    div.chat_plan
      div.button-chat_plan.button-chat-min
      div.button-chat_plan.button-chat-close
    div.button-wrapper
      div
        div.button-chat
          i.icon-chat.icon-chat-mute
          div.clear-fix-line
          span.name 静音
        div.button-chat(v-if="type === 'video'")
          i.icon-chat.icon-chat-toggle
          div.clear-fix-line
          span.name 切换到语音聊天
        div.button-chat
          i.icon-chat.icon-chat-volume
          div.clear-fix-line
          span.name 音量
      div.icon-chat.icon-chat-break(v-on:click="onCallClose")
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'
  import EasemobApi from '@/components/im/js/api'

  export default {
    props: {
      type: {
        default: ''
      },
      chatWrapper: {
        type: HTMLDivElement
      }
    },
    activated() {
    },
    methods: {
      open() {
        this.$myConsoleLog('[callPanel] chatWrapper', this.chatWrapper, '#EE2C2C')
        // this.$myConsoleLog('[callPanel] callPanel', this.$refs.callPanel.style, '#104E8B')
        window.callPanel = this.$refs.callPanel
        window.chatWrapper = this.chatWrapper
        this.$refs.callPanel.style.left = (this.chatWrapper.offsetLeft + this.chatWrapper.offsetWidth + 20) + 'px'
      },
      onCallClose() {
        EventBus.$emit('ON_CALL_CLOSE')
        EasemobApi.api.hungupCall()
      }
    },
    computed: {
      cls() {
        return `${this.type}-chat`
      }
    },
    components: {
      EasemobApi
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .clear-fix-line
    &:after
      content ''
      display block
      clear: both

  .button-chat_plan
    display inline-block
    width 23px
    height 23px
    background no-repeat 50% 50% transparent
    cursor pointer
    transition all .2s
    &:hover
      background-color rgba(45, 46, 45, .85)
      border-radius 4px
    & + .button-chat_plan
      margin-left 1px
    &.button-chat-min
      background-image url("./images/button-chat-min.png")
    &.button-chat-close
      background-image url("./images/button-chat-close.png")

  .icon-chat
    display inline-block
    width 40px
    height 40px
    background no-repeat 50% 50% transparent
    cursor pointer
    transition all .2s
    &:hover
      transform scale(1.2)
    &.icon-chat-mute
      background-image url("./images/button-chat-mute.png")
    &.icon-chat-volume
      background-image url("./images/button-chat-volume.png")
    &.icon-chat-toggle
      background-image url("./images/button-chat-toggle.png")
    &.icon-chat-break
      width 48px
      height 48px
      margin-top 29px
      background-image url("./images/button-chat-break.png")

  .call-panel
    position absolute
    top 5%
    background-color rgba(45, 46, 45, .85)
    border-radius 4px
    z-index 1000
    user-select none
    .user-avatar
      position absolute
      .avatar
        border-radius 50%
        background url("../im/images/user-3.png") no-repeat 50% 50%
        background-size cover
      .content
        color #ffffff
        transition opacity 1s
        .name,
        .message
          font-size 100%
    .timer
      position absolute
      left 0
      width 100%
      text-align center
      color #ffffff
      opacity 0
      transition opacity 1s
      font-size 14px
    .chat_plan
      position absolute
      top 10px
      right 10px
      font-size 0
      line-height 0
    .button-wrapper
      position absolute
      width 100%
      left 0
      z-index 4100
      text-align center
      .button-chat
        width 84px
        display inline-block
        .name
          display inline-block
          color #ffffff
          font-size 12px
          line-height 1
          margin-top 13px

    /* 语音聊天 */
    &.voice-chat
      width 293px
      height 442px
      .user-avatar
        position absolute
        top 73px
        left 0
        width 100%
        text-align center
        .avatar
          display inline-block
          width 97px
          height 97px
        .content
          margin-top 19px
          .name
            font-size 12px
          .message
            font-size 12px
            margin-top 15px
      .button-wrapper
        bottom 37px
      .icon-chat-break
        margin-top 24px
      .timer
        bottom 215px
    /* 视频聊天 */
    &.video-chat
      width 363px
      height 600px
      .user-avatar
        top 30px
        left 26px
        display flex
        align-items center
        .avatar
          width 70px
          height 70px
        .content
          margin-left 7px
          .name
            font-size 18px
          .message
            font-size 14px
            margin-top 12px
      .button-wrapper
        bottom 47px
      .timer
        bottom 207px

    &.connected
      .video-wrapper
        opacity 1
      .timer
        opacity 1
      .user-avatar
        .content
          opacity 0

</style>
