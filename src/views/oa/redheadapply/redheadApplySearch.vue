<!--
描述：办公自动化-红头文件申请-查询组件
开发人：sunlf
开发日期：2017年12月20日
-->

<template lang="pug">
  kalix-search(title="红头文件申请查询"
  v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '文件名称', prop: 'title'},
          {
            label: '文件状态',
            prop: 'docStatus',
            type: 'select',
            options: [
              {value: '新建', label: '新建'},
              {value: '审批中', label: '审批中'},
              {value: '审批通过', label: '审批通过'},
              {value: '已发文', label: '已发文'},
              {value: '已废除', label: '已废除'}
            ],
            clearable: true
          },
          {label: '文号类型', prop: 'docType', type: 'dict', appName: 'oa', dictType: '文号类型'},
          {label: '文号', prop: 'businessNo'},
          {
            label: '当前环节',
            prop: 'currentNode',
            type: 'select',
            options: [
              {value: '上级领导审批', label: '上级领导审批'},
              {value: '校领导审批', label: '校领导审批'},
              {value: '董事长审批', label: '董事长审批'},
              {value: '部门拟稿修改', label: '部门拟稿修改'}
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
              {value: '审批结果:董事长审批同意', label: '审批结果:董事长审批同意'}
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
