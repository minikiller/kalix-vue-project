<!--
描述：办公自动化-工作流状态统一封装的组件 用于table的列显示
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  el-table-column(prop="status" label="工作流状态" align="center" width="90")
    template(slot-scope="scope")
      el-tag(:type="scope.row.status | statusFilter") {{scope.row.status | dictFilter }}
</template>

<script type="text/ecmascript-6">
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'warning',
          1: 'info',
          2: 'success',
          3: 'danger'
        }
        return statusMap[status]
      },
      dictFilter(value) {
        const valueMap = {
          0: '未申请',
          1: '处理中',
          2: '已结束',
          3: '已中止'
        }
        return valueMap[value]
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
