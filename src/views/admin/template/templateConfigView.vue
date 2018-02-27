<!--
描述：系统应用-模板管理-模板属性查看
开发人：yangz
开发日期：2018年01月31日
-->
<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="templateConfig" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="属性名称" prop="fieldName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.fieldName" readonly)
      el-form-item(label="属性值" prop="fieldDesc" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.fieldValue" readonly)
      el-form-item(label="属性描述" prop="fieldDesc" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.fieldDesc" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './templateConfigModel'
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

<style scoped lang="stylus" type="text/stylus">

</style>
