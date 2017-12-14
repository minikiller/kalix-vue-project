<!--
描述：艺术中心-系统管理-公司信息-查询组件
开发人：hqj
开发日期：2017年12月13日
-->

<template lang="pug">
  kalix-search(title="公司信息查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '企业组织机构代码', prop: 'code'},
          {label: '企业名称', prop: 'name'}
        ]
      }
    },
    components: {
      KalixSearch: BaseSearch
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
