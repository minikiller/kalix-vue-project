<!--
  描述：音频聊天
  开发：桑杨
  日期：2018年3月2日15:03:37
-->
<template lang="pug">
  kalix-call-panel(type="voice" ref="callPanel" v-bind:chatWrapper="chatWrapper")
</template>
<script type="text/ecmascript-6">
  import KalixCallPanel from './callPanel'

  export default {
    props: {
      chatWrapper: {
        type: HTMLDivElement
      }
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
</style>
