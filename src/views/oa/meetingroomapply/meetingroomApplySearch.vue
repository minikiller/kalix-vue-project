<!--
描述：办公自动化-会议室申请-查询组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-search(title="会议室申请查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '名称', prop: 'title'},
          {label: '编号', prop: 'businessNo'},
          {
            label: '当前环节',
            prop: 'currentNode',
            type: 'select',
            options: [
              {value: '行政事务办公室主管审核', label: '行政事务办公室主管审核'},
              {value: '校务部副部长审核', label: '校务部副部长审核'}
            ],
            clearable: true
          },
          {
            label: '审批结果',
            prop: 'auditResult',
            type: 'select',
            options: [
              {value: '流程尚未启动', label: '流程尚未启动'},
              {value: '审批中...', label: '审批中...'},
              {value: '审批结果:审批同意', label: '审批结果:审批同意'}
            ],
            clearable: true
          }
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
