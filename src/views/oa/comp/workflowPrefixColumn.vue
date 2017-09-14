<!--
描述：办公自动化-工作流前缀固定字段封装组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
    kalix-biz-no-column  // 业务编号
    el-table-column(prop="title" label="业务名称" align="center" width="220")
    el-table-column(prop="orgName" label="申请部门" align="center" width="220")
    el-table-column(prop="creationDate" label="申请时间" align="center"  width="220")
</template>

<script type="text/ecmascript-6">
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

  export default {
    components: {
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn
    }
  }
</script>

<style scoped lang="stylus">

</style>
