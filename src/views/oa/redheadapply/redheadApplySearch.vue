<!--
描述：办公自动化-红头文件申请-查询组件
开发人：sunlf
开发日期：2017年12月20日
-->

<template lang="pug">
  kalix-search(title="红头文件申请查询"
  v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '文号', prop: 'businessNo'},
          {label: '文件名称', prop: 'title'},
          {label: '文号类型', prop: 'docType', type: 'dict', appName: 'oa', dictType: '文号类型'}
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
