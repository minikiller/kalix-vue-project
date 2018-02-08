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
