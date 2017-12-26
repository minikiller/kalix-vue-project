<!--
描述：办公自动化-系统管理-文号管理
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="document" title='文号列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog"
    bizSearch="OaDocumentSearch" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {DocumentURL, DocumentComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(DocumentComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: DocumentURL,
        tableFields: [
          {prop: 'title', label: '标题'},
          {prop: 'content', label: '内容'},
          {prop: 'publishPeople', label: '发布人'},
          {prop: 'publishDate', label: '发布时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'OaDocumentView'},
          {id: 'edit', dialog: 'OaDocumentAdd'},
          {id: 'add', dialog: 'OaDocumentAdd'}
        ]
      }
    },
    created() {
    },
    methods: {},
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus">

</style>
