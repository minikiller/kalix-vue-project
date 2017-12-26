<!--
描述：我的首页-公司新闻-查詢组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-search(title="文号查询"
  v-bind:searchFields="searchFields" v-bind:form-rules="rules")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '标题', prop: 'title'}
        ],
        rules: {
          name: [{required: true, message: '请输入标题', trigger: 'blur'}]
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
