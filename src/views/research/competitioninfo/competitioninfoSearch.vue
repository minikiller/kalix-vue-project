<!--
描述：展赛管理
开发人：fj
开发日期：2017年9月06日
-->

<template lang="pug">
  kalix-search(title="展赛查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '展赛名称', prop: 'name'},
          {label: '展赛类别', prop: 'type', type: 'dict', appName: 'research', dictType: '展赛类别'}
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
