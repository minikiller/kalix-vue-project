<!--
描述：我的首页-数据字典-查詢组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-search(title="字典查询"
  v-bind:searchFields="searchFields" v-bind:form-rules="rules")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '类型', prop: 'type'}
        ],
        rules: {
          type: [{required: true, message: '请输入类型', trigger: 'blur'}]
        }
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
