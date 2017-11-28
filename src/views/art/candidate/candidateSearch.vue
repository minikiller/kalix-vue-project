<!--
描述：艺术中心-学生应聘-查詢组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-search(title="应聘信息查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '更新时间', prop: 'updateDateBegin', type: 'date', field: 'updateDate:begin:gt'},
          {label: '-', prop: 'updateDateEnd', type: 'date', field: 'updateDate:end:lt'}
        ]
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
