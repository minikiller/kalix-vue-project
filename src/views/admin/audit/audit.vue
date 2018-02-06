<!--
描述：系统应用-系统管理-审计管理
开发人：杨泽
开发日期：2018年2月6日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="audit" title='审计列表'
      ref="kalixTable"
      v-bind:tableFields="tableFields"
      v-bind:targetURL="targetURL"
      v-bind:bizDialog="bizDialog"
      v-bind:btnList="btnList"
      v-bind:hasTableSelection="hasTableSelection"
      v-bind:isShowToolBar="isShowToolBar"
      v-bind:toolbarBtnList="toolbarBtnList"
      v-bind:deleteAllUrl="deleteAllUrl"
      bizSearch="AdminAuditSearch")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {auditURL, AuditComponent} from '../config.toml'
  import {auditBtnList} from '../audit/index'
  import {registerComponent} from '@/api/register'
  // 注册全局组件
  registerComponent(AuditComponent)

  export default {
    data() {
      return {
        targetURL: auditURL,
        tableFields: [
          {prop: 'appName', label: '应用名称'},
          {prop: 'funName', label: '功能名称'},
          {prop: 'actor', label: '操作人'},
          {prop: 'action', label: '业务操作'},
          {prop: 'content', label: '操作内容'},
          {prop: 'creationDate', label: '操作时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminAuditView'}
        ],
        btnList: auditBtnList,
        hasTableSelection: true,
        isShowToolBar: true,
        toolbarBtnList: [
          {id: 'deleteChecked', isShow: true},
          {id: 'add', isShow: false}
        ],
        deleteAllUrl: `${auditURL}/remove`
      }
    },
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
