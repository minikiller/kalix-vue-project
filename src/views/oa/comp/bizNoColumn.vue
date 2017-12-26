<!--
描述：办公自动化-工作流bizNo封装的组件 用于table的列显示
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  el-table-column(prop="name" v-bind:label="title" width="280" align="center")
    template(slot-scope="scope")
      el-tag(v-if="scope.row[name]") {{ scope.row[name] }}
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      name: {
        type: String,
        default: 'businessNo'
      },
      title: {
        type: String,
        default: '编号'
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
