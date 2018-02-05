<!--
描述：办公自动化-文号状态统一封装的组件 用于table的列显示
开发人：hqj
开发日期：2018年01月16日
-->
<template lang="pug">
  el-table-column(prop="status" label="文号状态" align="center" width="120")
    template(slot-scope="scope")
      el-tag(:type="scope.row.status | statusFilter") {{scope.row.status}}
</template>

<script type="text/ecmascript-6">
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          '已撤回': 'warning',
          '使用中': 'success',
          '已废除': 'danger'
        }
        return statusMap[status]
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
