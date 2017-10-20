<!--
描述：支持yyyy-MM-dd hh:mm:ss 格式的日期组件
开发人：sunlf
开发日期：2017年9月21日
-->
<template lang="pug">
  el-date-picker(v-model='currentValue' type="datetime" v-bind:placeholder="placeholder" v-bind:readonly="readonly")
</template>
<script type="text/ecmascript-6">
  import {DatepickerMixin} from './datepickerMixin'
  export default {
    mixins: [DatepickerMixin]
  }
</script>

