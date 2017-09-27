<!--
描述：办公自动化-流程历史-查詢组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-search(title="会议申请查询"
  v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '申请部门', prop: 'orgName'},
          {label: '经办人', prop: 'createBy'}
        ],
        rules: {}
      }
    },
    created() {
    },
    components: {
      KalixSearch: BaseSearch
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
