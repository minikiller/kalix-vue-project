<!--
描述：系统应用-审计管理-查看
开发人：yangz
开发日期：2018年02月06日
-->
<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="audit" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="应用名称" prop="appName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.appName" readonly)
      el-form-item(label="功能名称" prop="funName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.funName" readonly)
      el-form-item(label="操作人" prop="actor" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.actor" readonly)
      el-form-item(label="业务操作" prop="action" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.action" readonly)
      el-form-item(label="操作内容" prop="content" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.content" v-bind:rows="3" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog
    }
  }
</script>
