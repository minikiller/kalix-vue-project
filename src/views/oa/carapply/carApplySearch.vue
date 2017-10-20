<!--
描述：办公自动化-公务用车申请-查詢组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  kalix-search(title="用车申请查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '申请部门', prop: 'orgName'},
          {label: '经办人', prop: 'createBy'}
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
