<template lang="pug">
  div
    el-table-column(label="行号" width="70")
      template(scope="scope")
        div(style="text-align: center") {{ scope.row.rowNumber }}
    el-table-column(prop="type" label="类型" width="180")
    el-table-column(prop="label" label="签名" width="180")
    el-table-column(prop="value" label="数值" width="70")
    el-table-column(prop="createBy" label="创建人" width="120")
    el-table-column(prop="creationDate" label="创建日期")
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang='stylus' type='text/stylus'>
</style>
