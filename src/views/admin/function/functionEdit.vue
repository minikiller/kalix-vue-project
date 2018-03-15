<!--
描述：系统应用-功能管理-添加
开发人：yangz
开发日期：2018年01月29日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="function" ref="kalixBizDialog" v-bind:submitBefore="submitBefore"
  v-bind:submitAfter="submitAfter" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.id" type="hidden")
      input(v-model="formModel.isLeaf" type="hidden")
      input(v-model="formModel.applicationId" type="hidden")
      el-form-item(label="所属应用" prop="applicationName" label-width="120px" v-bind:rules="rules.applicationName")
        el-input(v-model="formModel.applicationName" readonly)
      el-form-item(label="上级功能" prop="parentName" label-width="120px" v-bind:rules="rules.parentName")
        el-input(v-model="formModel.parentName" readonly)
      el-form-item(label="名称" prop="name" label-width="120px" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="功能代码" prop="code" label-width="120px" v-bind:rules="rules.code")
        el-input(v-model="formModel.code")
      el-form-item(label="数据权限主键" prop="dataPermissionKey" label-width="120px")
        el-input(v-model="formModel.dataPermissionKey")
      el-form-item(label="权限是否生效" prop="dataPermission" label-width="120px")
        el-select(v-model="formModel.dataPermission" placeholder="请选择")
          el-option(v-for="item in options" v-bind:key="item.value" v-bind:value="item.value" v-bind:label="item.label")
      el-form-item(label="备注" prop="remark" label-width="120px")
        el-input(v-model="formModel.remark" type="textarea" v-bind:rows="3")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {functionURL} from '../config.toml'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          applicationName: [{required: true, message: '所属应用不能为空', trigger: 'blur'}],
          parentName: [{required: true, message: '上级功能不能为空', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          code: [{required: true, message: '请输入功能代码', trigger: 'blur'}]
        },
        targetURL: functionURL,
        labelWidth: '110px',
        options: [{
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
        // dataPermission: ''
        tempParent: undefined,
        tempChildren: undefined
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      submitBefore(baseDialog, callBack) {
        let code = baseDialog.formModel.code
        baseDialog.formModel.permission = baseDialog.formModel.permission + ':' + code
        if (baseDialog.formModel.parent) {
          this.tempParent = baseDialog.formModel.parent
          baseDialog.formModel.parent = undefined
        }
        if (baseDialog.formModel.children) {
          this.tempChildren = baseDialog.formModel.children
          baseDialog.formModel.children = undefined
        }
        // console.log('baseDialog==============', baseDialog)
        callBack()
      },
      submitAfter(baseDialog, callBack) {
        if (this.tempParent) {
          baseDialog.formModel.parent = this.tempParent
        }
        if (this.tempChildren) {
          baseDialog.formModel.children = this.tempChildren
        }
        // callBack()
      }
    }
  }
</script>

<style scoped>

</style>
