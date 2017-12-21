<!--
描述：办公自动化-系统管理-文号管理
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="document"
  ref="kalixBizDialog" v-bind:formModel.sync="formModel"
  isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title")
        el-input(v-model="formModel.title" readonly)
      el-form-item(label="内容" prop="content")
        el-input(v-model="formModel.content" type="area" readonly)
      el-form-item(label="发布人" prop="publishPeople")
        el-input(v-model="formModel.publishPeople" readonly)
      el-form-item(label="发布时间" prop="publishDate" )
        el-input(v-model="formModel.publishDate" readonly)
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {FormModel} from './model.toml'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
    }
  }
</script>

