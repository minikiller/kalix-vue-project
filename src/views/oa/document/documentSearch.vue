<!--
描述：办公自动化-系统管理-文号管理-查询组件
开发人：hqj-修改
开发日期：2018年01月10日
-->

<template lang="pug">
  kalix-search(title="文号查询" v-bind:searchFields="searchFields" )
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '文号类型', prop: 'docType', type: 'dict', appName: 'oa', dictType: '文号类型'},
          {label: '年份', prop: 'year'},
          {
            label: '文号状态',
            prop: 'status',
            type: 'select',
            options: [
              {value: '使用中', label: '使用中'},
              {value: '已撤回', label: '已撤回'},
              {value: '已废除', label: '已废除'}
            ]
          }
        ]
      }
    },
    components: {
      KalixSearch: BaseSearch
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
