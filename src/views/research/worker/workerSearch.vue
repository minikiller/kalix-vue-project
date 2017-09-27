<!--
描述：人员管理-科研人员维护-查询组件
开发人：hqj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-search(title="科研人员查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '单位部门', prop: 'orgId', type: 'orgTree', isAll: true},
          {label: '姓名', prop: 'name'},
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
