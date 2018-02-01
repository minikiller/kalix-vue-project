<!--
描述：系统应用-模板管理-模板查看
开发人：yangz
开发日期：2018年01月31日
-->
<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="template" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="模板名称" prop="name" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="模板描述" prop="desc" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.desc" v-bind:rows="3" readonly)
      el-form-item(label="模板内容" prop="content" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.content" v-bind:rows="3" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './templateModel'
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
