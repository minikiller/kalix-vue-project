<template lang="pug">
  div
    div.panel(v-bind:class="cls" ref="chatPanel")
      panel-header
        template(slot="title")
          user-avatar(v-bind:userObjB="userObj")
        template(slot="right")
          panel-header-button(v-if="cls === 'max'" type="ori" v-on:click="oriBaseTable")
          panel-header-button(v-else type="max" v-on:click="maxBaseTable")
          panel-header-button(type="close" v-on:click="closeBaseTable")
      div.panel-body
        div.show-wrapper
          div.message-cells
            div.cell
              div.avatar
              div.cnt 开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会
            div.cell.me
              div.avatar
              div.cnt 开会
        div.write-wrapper
          div.chat_tool_bar
            div.button-chat_tool_bar.icon-chat_tool_bar-face
            div.button-chat_tool_bar.icon-chat_tool_bar-file
            div.button-chat_tool_bar.icon-chat_tool_bar-video(v-on:click="showVideo")
            div.button-chat_tool_bar.icon-chat_tool_bar-video(v-on:click="showVoice")
          div.article
          div.aside
            div.btn-send 发送
    component(v-bind:is="which_to_show" ref="bizCallPanel"
    v-bind:chatWrapper="chatWrapper")
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'
  import PanelHeader from './panelHeader.vue'
  import panelHeaderButton from './panelHeaderButton.vue'
  import UserAvatar from '@/components/im/userAvatar'
  import VideoChat from './VideoChat'
  import VoiceChat from './VoiceChat'

  export default {
    data() {
      return {
        cls: '',
        title: '',
        userObj: {
          userName: '交流群',
          avatar: ''
        },
        chatWrapper: null,
        which_to_show: ''
      }
    },
    activated() {
      EventBus.$on('ON_CALL_CLOSE', this.onCallClose)
    },
    mounds() {
    },
    methods: {
      onCallClose() {
        this.which_to_show = ''
      },
      showVideo() {
        this.which_to_show = 'VideoChat'
        this.chatWrapper = this.$refs.chatPanel
        this.$nextTick(() => {
          this.$refs.bizCallPanel.open()
        })
      },
      showVoice() {
        this.which_to_show = 'VoiceChat'
        this.chatWrapper = this.$refs.chatPanel
        this.$nextTick(() => {
          this.$refs.bizCallPanel.open()
        })
      },
      oriBaseTable() {
        this.cls = ''
        EventBus.$emit('ON_ORI_BASETABLE')
      },
      maxBaseTable() {
        this.cls = 'max'
        EventBus.$emit('ON_MAX_BASETABLE')
      },
      closeBaseTable() {
        // 关闭窗体
        EventBus.$emit('ON_CLOSE_BASETABLE')
      }
    },
    components: {
      PanelHeader,
      panelHeaderButton,
      UserAvatar,
      VideoChat,
      VoiceChat
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  .panel
    position: absolute;
    top: 5%;
    height: 80%;
    left: 50%;
    margin-left: -195px;
    width 700px !important
    overflow: hidden;
    z-index 99
    background-color rgba(254, 254, 240, 0.8)
    border-radius $borderRadius
    display flex
    flex-flow column
    transition all .5s
    &.open
      opacity 1
    &.close,
    &.min
      opacity 0
      transform scale(.5)
    .panel-body
      flex 1
      padding 0
      width 100%
      box-sizing border-box
      overflow hidden
      display flex
      flex-flow column
      .show-wrapper
        overflow auto
        flex 1
        &::-webkit-scrollbar
          width 4px
          height 4px
          background-color transparent
        &::-webkit-scrollbar-thumb
          border-radius 4px
          background-color #999999
        .message-cells
          padding 30px 25px 30px 25px
          .cell
            & + .cell
              margin-top 50px
            &:after
              content ''
              display block
              clear: both
            .avatar
              width 32px
              height 32px
              border-radius 50%
              background url("./images/111.png") 50% 50% no-repeat
              background-size cover
              float left
              margin-top 1px
            .cnt
              position relative
              padding 5px 15px
              margin 0 10px
              float left
              border 1px solid #d0d0d0
              border-radius 4px
              background-color #ffffff
              color #000000
              font-size 14px
              line-height 22px
              max-width 300px
              cursor default
              &:after
                position absolute
                display block
                content ''
                background-color #FFFFFF
                border-top 1px solid #d0d0d0
                border-left 1px solid #d0d0d0
                width 8px
                height 8px
                top 10px
                transform rotate(-45deg)
                left -5px

            &.me
              .avatar,
              .cnt
                float right
                background-color #ba8363
                color #FFFFFF
                &:after
                  transform rotate(135deg)
                  right -5px
                  left initial
                  background-color #ba8363
                  border-color #cf9a7b
      .write-wrapper
        height 177px
        border-top 1px solid #f0f0e2
        background-color #ffffeb
        display flex
        flex-flow column
        box-sizing border-box
        .chat_tool_bar
          height 40px
          box-sizing border-box
          border-bottom 1px solid #f0ebca
          padding 6px 13px
          .button-chat_tool_bar
            display inline-block
            width 28px
            height 28px
            background no-repeat 50% 50%
            cursor pointer
            & + .button-chat_tool_bar
              margin-left 10px
            &.icon-chat_tool_bar-face
              background-image url("./images/icon-face.png")
            &.icon-chat_tool_bar-file
              background-image url("./images/icon-file.png")
            &.icon-chat_tool_bar-video
              background-image url("./images/icon-video.png")
        .article
          flex 1
          overflow auto
        .aside
          text-align right
          height 50px
          padding 0 35px
          .btn-send
            display inline-block
            cursor pointer
            padding 6px 16px
            font-size 14px
            line-height 14px
            color #565452
            border 1px solid #dcdcdc
            background-color #ffffff
            border-radius 0

  /* 翻板 */
  .turn-enter-active,
  .turn-leave-active
    transition all .3s
    transform-style preserve-3d

  .turn-enter-active
    transform-origin center top

  .turn-leave-active
    transform-origin center bottom

  .turn-enter,
  .turn-leave-active
    opacity 0

  .turn-enter
    transform scale(.9) rotateX(-10deg)

  .turn-leave-active
    transform scale(.9) rotateX(10deg)

  /* 缩放 */
  .zoom-enter-active,
  .zoom-leave-active
    transition all .5s

  .zoom-enter,
  .zoom-leave-active
    opacity 0
    transform scale(.9)
</style>
