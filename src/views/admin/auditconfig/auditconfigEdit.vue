<!--
描述：系统管理-审计配置管理-编辑
开发人：杨泽
开发日期：2018年2月6日
-->
<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="auditconfig" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="类名称" prop="clsName" v-bind:label-width="labelWidth" v-bind:rules="rules.clsName")
        el-input(v-model="formModel.clsName")
      el-form-item(label="应用名称" prop="appName" v-bind:label-width="labelWidth" v-bind:rules="rules.appName")
        el-input(v-model="formModel.appName")
      el-form-item(label="功能名称" prop="funName" v-bind:label-width="labelWidth" v-bind:rules="rules.funName")
        el-input(v-model="formModel.funName")
      el-form-item(label="是否监控" prop="enable" v-bind:label-width="labelWidth" v-bind:rules="rules.enable")
        el-select(v-model="formModel.enable" placeholder="请选择是否监控")
          el-option(v-for="item in options" v-bind:key="item.value" v-bind:value="item.value" v-bind:label="item.label")
      el-form-item(label="备注" prop="remark" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.remark" type="textarea" v-bind:rows="3")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {auditConfigURL} from '../config.toml'
  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          clsName: [{required: true, message: '请输入类名称', trigger: 'blur'}],
          appName: [{required: true, message: '请输入应用名称', trigger: 'blur'}],
          funName: [{required: true, message: '请输入功能名称', trigger: 'blur'}],
          enable: [{required: true, message: '请选择是否监控', trigger: 'blur'}]
        },
        targetURL: auditConfigURL,
        options: [{
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }]
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      init(dialogOption) {
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
