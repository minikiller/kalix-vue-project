<template lang="pug">
  kalix-tool-bar
    template(slot="toolBarSlot")
      el-button(v-on:click="onDeleteCheckedClick" type="primary")
        i.iconfont.icon-delete
        | 批量删除
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'
  import ToolBar from '@/components/custom/baseToolBar'

  export default {
    methods: {
      onDeleteCheckedClick() {
        EventBus.$emit('deleteCheckedClick')
      }
    },
    components: {
      KalixToolBar: ToolBar
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
