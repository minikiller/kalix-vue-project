<template lang="pug">
  keep-alive
    base-table(bizKey="workgroup" title='组列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:formModel="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    bizSearch="AdminWorkGroupSearch"  v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {workgroupURL, workGroupBtnPermissionPrefix, ToolButtonList, WorkGroupComponent} from '../config.toml'
  import Vue from 'vue'

  // 注册全局组件
  WorkGroupComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        buttonPermissionPrefix: workGroupBtnPermissionPrefix,
        targetURL: workgroupURL,
        tableFields: [
          {prop: 'app', label: '所属应用'},
          {prop: 'name', label: '工作组名称'}
        ],
        bizDialog: [{id: 'view', dialog: 'AdminWorkGroupView'},
          {id: 'add', dialog: 'AdminWorkGroupAdd'},
          {id: 'edit', dialog: 'AdminWorkGroupAdd'}
        ],
        formModel: {
          name: '',
          app: '',
          available: 1
        },
        formRules: {
          app: [
            {required: true, message: '请输入所属应用', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入工作组名称', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {},
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
