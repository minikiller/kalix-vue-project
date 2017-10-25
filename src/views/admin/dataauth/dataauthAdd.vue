<template lang="pug">
  kalix-dialog.dataauth-add(bizKey="dataauth" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="数据权限" prop="type" v-bind:rules="rules.type" label-width="140px")
        kalix-dict-select(v-model="formModel.type" appName="admin" dictType="数据权限" style="width:100%")
      // el-form-item(label="应用名称" prop="appId" label-width="140px")
        kalix-app-menu-select(style="width:100%" v-model="application" v-bind:multiple="false"
        v-bind:objectsUrl="appsUrl" label="text" v-bind:objectIds.sync="formModel.appId")
      // el-form-item(label="菜单名称" prop="menuid" label-width="140px")
        kalix-app-menu-select(style="width:100%" v-model="menu" v-bind:multiple="false"
        v-bind:objectsUrl="menusUrl" label="text" v-bind:objectIds.sync="formModel.menuId")
      el-form-item(label="应用名称" prop="appId"  label-width="140px")
        kalix-select(placeholder="请选择应用" style="width:100%" appName="applications"
        v-bind:requestUrl="requestUrl" label="text" v-model="formModel.appId")
      el-form-item(label="备注" prop="remark" label-width="140px")
        el-input(v-model="formModel.remark" type="textarea")
</template>

<script>
  import FormModel from './model'
  import {dataauthURL, appsURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import KalixSelect from '@/components/custom/baseSelect'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        requestUrl: appsURL,
        rules: {
          type: [{type: 'number', required: true, message: '请选取数据权限', trigger: 'change'}]
        },
        targetURL: dataauthURL
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixSelect
    }
  }
</script>

<style scoped>

</style>
