<!--
描述：人员管理-教师维护-查詢组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-search(title="教师查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '姓名', prop: 'name'},
          {label: '单位部门', prop: 'orgId', type: 'orgTree', isAll: true},
          {
            label: '性别',
            prop: 'sex',
            type: 'select',
            options: [
              {value: '男', label: '男'},
              {value: '女', label: '女'}
            ]
          }
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
