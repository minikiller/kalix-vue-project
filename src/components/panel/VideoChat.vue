<!--
  描述：视频聊天
  开发：桑杨
  日期：2018年2月6日09:19:11
-->
<template lang="pug">
  kalix-call-panel(type="video" v-bind:chatWrapper="chatWrapper" ref="callPanel")
    div.video-wrapper(slot="panelSlot")
</template>
<script type="text/ecmascript-6">
  import KalixCallPanel from './callPanel'

  export default {
    props: {
      chatWrapper: {
        type: HTMLDivElement
      }
    },
    mounds() {
    },
    methods: {
      open() {
        this.$refs.callPanel.open()
      }
    },
    components: {
      KalixCallPanel
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .video-wrapper
    position absolute
    top 0
    left 0
    height 100%
    width 100%
    background url("images/111.png") 50% 50% no-repeat
    opacity .4
    transition opacity 1s
    border-radius 4px
</style>
