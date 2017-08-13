<template lang="pug">
  div
    el-button(v-on:click="onAddClick" type="primary")
      i.iconfont.icon-add
      | 添加
    el-button(v-on:click="onRefreshClick" type="primary")
      i.iconfont.icon-refresh
      | 刷新
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {
      onAddClick() {
        this.$emit('onAddClick')
      },
      onRefreshClick() {
        this.$emit('onRefreshClick')
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
