<!--
描述：办公自动化-公务用车申请-查询组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  kalix-search(title="公务用车申请查询" v-bind:searchFields="searchFields")
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
              {value: '部门负责人审批', label: '部门负责人审批'},
              {value: '部门主管领导审批', label: '部门主管领导审批'},
              {value: '校务部审批', label: '校务部审批'},
              {value: '校务部主管领导审批', label: '校务部主管领导审批'}
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
    components: {
      KalixSearch: BaseSearch
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
