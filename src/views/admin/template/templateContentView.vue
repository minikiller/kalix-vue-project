<!--
描述：系统应用-模板管理-模板属性查看
开发人：yangz
开发日期：2018年01月31日
-->
<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="templateContent" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="模板类型" prop="templateType" v-bind:rules="rules.templateType" v-bind:label-width="labelWidth")
        kalix-dict-select(v-model="formModel.templateType" appName="admin" dictType="模板类型" style="width:100%" disabled)
      el-form-item(label="模板内容" prop="content" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.content" v-bind:rows="6" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './templateConfigModel'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px',
        rules: {
          templateType: [{required: true, message: '请选择模板类型', trigger: 'change'}]
        }
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
