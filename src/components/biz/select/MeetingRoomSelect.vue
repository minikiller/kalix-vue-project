<template lang="pug">
  kalix-select(v-model="currentValue" placeholder="请选择会议地点" style="width:100%"
  appName="MEETINGROOMS" v-on:selectChange="onChange")
</template>
<script type="text/ecmascript-6">
  import {SelectMixin} from './SelectMixin'

  export default {
    mixins: [SelectMixin]
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
