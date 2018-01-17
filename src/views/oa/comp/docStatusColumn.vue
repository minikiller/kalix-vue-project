<!--
描述：办公自动化-红头文件状态统一封装的组件 用于table的列显示
开发人：hqj
开发日期：2018年01月16日
-->
<template lang="pug">
  el-table-column(prop="docStatus" label="文件状态" align="center" width="120")
    template(slot-scope="scope")
      el-tag(:type="scope.row.docStatus | statusFilter") {{scope.row.docStatus}}
</template>

<script type="text/ecmascript-6">
  export default {
    filters: {
      statusFilter(docStatus) {
        const statusMap = {
          '审批中': 'warning',
          '审批通过': 'info',
          '已发文': 'success',
          '已废除': 'danger'
        }
        return statusMap[docStatus]
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
