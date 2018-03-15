<!--
描述：系统管理-审计配置管理-查询组件
开发人：杨泽
开发日期：2018年2月6日
-->
<template lang="pug">
  Kalix-Search(:searchFields="searchFields" title="审计配置查询" bizKey="auditconfig")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  export default {
    components: {
      KalixSearch: BaseSearch
    },
    data() {
      return {
        searchFields: [
          {label: '类名称', prop: 'clsName'},
          {label: '应用名称', prop: 'appName'},
          {label: '功能名称', prop: 'funName'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
