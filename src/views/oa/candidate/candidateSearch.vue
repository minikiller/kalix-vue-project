<!--
描述：办公自动化-应聘人员管理-查询组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-search(title="应聘人员查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '人员类别', prop: 'personCategory', type: 'dict', appName: 'oa', dictType: '招聘人员类别'},
          {label: '所在部门', prop: 'orgName'},
          {label: '应聘岗位', prop: 'position'}
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
