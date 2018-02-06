<!--
描述：系统应用-系统管理-审计配置管理
开发人：杨泽
开发日期：2018年2月6日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="auditconfig" title='审计配置列表' ref="kalixTable"
      v-bind:tableFields="tableFields"
      v-bind:targetURL="auditConfigURL"
      v-bind:bizDialog="auditConfigDialog"
      v-bind:btnList="auditConfigBtnList"
      v-bind:customRender="customRender"
      bizSearch="AdminAuditConfigSearch")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {auditConfigURL, AuditConfigComponent} from '../config.toml'
  import {auditConfigBtnList} from '../auditconfig/index'
  import {registerComponent} from '@/api/register'
  // 注册全局组件
  registerComponent(AuditConfigComponent)
  export default {
    data() {
      return {
        auditConfigURL: auditConfigURL,
        tableFields: [
          {prop: 'clsName', label: '类名称'},
          {prop: 'appName', label: '应用名称'},
          {prop: 'funName', label: '功能名称'},
          {prop: 'enable', label: '是否监控'},
          {prop: 'creationDate', label: '创建日期'}
        ],
        auditConfigDialog: [
          {id: 'add', dialog: 'AdminAuditConfigAdd'},
          {id: 'view', dialog: 'AdminAuditConfigView'},
          {id: 'edit', dialog: 'AdminAuditConfigEdit'}
        ],
        auditConfigBtnList: auditConfigBtnList
      }
    },
    components: {
      BaseTable
    },
    methods: {
      customRender(_data) {
        if (_data) {
          _data.forEach((e) => {
            e.enable = e.enable ? '是' : '否'
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
