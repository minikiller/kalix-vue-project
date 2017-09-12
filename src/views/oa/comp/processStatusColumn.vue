<!--
描述：办公自动化-工作流状态统一封装的组件 用于table的列显示
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  el-table-column(prop="status" label="工作流状态" align="center")
    template(scope="scope")
      el-tag(:type="scope.row.status | statusFilter") {{scope.row.status | dictFilter }}
</template>

<script type="text/ecmascript-6">
    export default {
      filters: {
        statusFilter(status) {
          const statusMap = {
            1: 'success',
            0: 'danger'
          }
          return statusMap[status]
        },
        dictFilter(value) {
          const valueMap = {
            1: '处理中',
            0: '未申请'
          }
          return valueMap[value]
        }
      }
    }
</script>

<style scoped lang="stylus">

</style>
