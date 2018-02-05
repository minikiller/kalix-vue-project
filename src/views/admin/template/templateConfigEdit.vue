<!--
描述：系统应用-模板管理-模板属性修改
开发人：yangz
开发日期：2018年02月01日
-->
<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="templateConfig" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.templateId" type="hidden")
      el-form-item(label="属性名称" prop="fieldName" v-bind:label-width="labelWidth" v-bind:rules="rules.fieldName")
        el-input(v-model="formModel.fieldName")
      el-form-item(label="属性描述" prop="fieldDesc" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.fieldDesc")
</template>

<script>
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
    }
    /**
    ,
    methods: {
      open(obj) {
        this.$refs.kalixBizDialog.open('', true, obj)
      }
    }
     **/
  }
</script>

<style scoped>

</style>
