<template lang="pug">
  kalix-select(v-model="currentValue" placeholder="请选择申请部门" style="width:100%"
  appName="USERORGS" v-on:selectChange="onChange")
</template>
<script type="text/ecmascript-6">
  import {SelectMixin} from './SelectMixin'

  export default {
    mixins: [SelectMixin]
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
