<!--
描述：人员管理-科研人员维护-查询组件
开发人：hqj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-search(title="科研人员查询"
  v-bind:searchFields="searchFields" v-bind:form-rules="rules")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '姓名', prop: 'name'}
        ],
        rules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
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
