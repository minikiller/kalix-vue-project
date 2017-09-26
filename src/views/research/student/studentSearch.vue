<!--
描述：人员管理-学生维护-查詢组件
开发人：fj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-search(title="学生查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '姓名', prop: 'name'},
          {label: '所属班级', prop: 'classId', type: 'orgTree', isAll: true},
          {
            label: '性别',
            prop: 'sex',
            type: 'select',
            options: [
              {value: '男', label: '男'},
              {value: '女', label: '女'}
            ]
          },
          {label: '出生日期', prop: 'birthday', type: 'date', field: 'begin:gt'},
          {label: '-', prop: 'birthday', type: 'date', field: 'end:lt'},
          {label: '入学年份', prop: 'entranceYear', type: 'year', field: 'begin:gt'},
          {label: '-', prop: 'entranceYear', type: 'year', field: 'end:lt'}
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
