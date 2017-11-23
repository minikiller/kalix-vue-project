<template lang="pug">
  div.panel.chat-panel
    panel-header
      template(slot="title")
        chat-avatar(avatar="/static/images/im/7.jpg" text="某")
      template(slot="right")
        div.tool-btn.fixed
        div.tool-btn.max
        div.tool-btn.close(v-bind:click="isChatShow=false")
    div.panel_body_container
    div.chat_toolbar_footer
</template>
<script type="text/ecmascript-6">
  import PanelHeader from './panelHeader.vue'
  import ChatAvatar from './chatAvatar.vue'

  export default {
    components: {
      PanelHeader,
      ChatAvatar
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
