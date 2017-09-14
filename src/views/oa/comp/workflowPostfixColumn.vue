<!--
描述：办公自动化-工作流后缀固定字段封装组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
    el-table-column(prop="createBy" label="经办人" align="center" width="90")
    el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
    el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
    kalix-process-status-column // 工作流状态列
</template>

<script type="text/ecmascript-6">
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'

  export default {
    components: {
      KalixProcessStatusColumn: ProcessStatusColumn
    }
  }
</script>

<style scoped lang="stylus">

</style>
