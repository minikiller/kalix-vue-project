<template lang="pug">
  div.panel(v-bind:class="cls")
    panel-header
      template(slot="title")
        div {{title}}
      template(slot="right")
        panel-header-button(type="close" v-on:click="close")
    div.panel-body
      slot(name="panelSlot")
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'
  import PanelHeader from './panelHeader.vue'
  import panelHeaderButton from './panelHeaderButton.vue'
  export default {
    props: {
      title: {
        default: ''
      }
    },
    data() {
      return {
        cls: ''
      }
    },
    methods: {
      close() {
        // 关闭窗体
        EventBus.$emit('ON_CLOSE_BASETABLE')
      }
    },
    components: {
      PanelHeader,
      panelHeaderButton
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  .panel
    position: absolute;
    width 937px
    height 80%
    left 50%
    top 5%
    margin-left -314px
    overflow: hidden;
    z-index 99
    background-color #fefef0
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
    .group-title
      text-align center
      font-size 18px
      margin 0 54px
      line-height 53px
      border-bottom 4px solid #686868
    .panel-body
      flex 1
      padding 0
      width 100%
      box-sizing border-box
      overflow auto
      display flex
      flex-flow column
      .article
        flex 1
        overflow auto
      .aside
        text-align right
</style>
