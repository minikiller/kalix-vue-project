<!--
描述：系统应用-模板管理-模板属性添加
开发人：yangz
开发日期：2018年01月31日
-->
<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="templateConfig" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.templateId" type="hidden")
      el-form-item(label="属性名称" prop="fieldName" v-bind:label-width="labelWidth" v-bind:rules="rules.fieldName")
        el-input(v-model="formModel.fieldName")
      el-form-item(label="属性描述" prop="fieldDesc" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.fieldDesc")
</template>

<script type="text/ecmascript-6">
  import FormModel from './templateConfigModel'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {templateConfigURL} from '../config.toml'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px',
        rules: {
          fieldName: [{required: true, message: '请输入属性名称', trigger: 'blur'}]
        },
        targetURL: templateConfigURL
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      init(dialogOption) {
        this.formModel.templateId = dialogOption.templateId
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
