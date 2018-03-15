<!--
描述：系统应用-模板管理-模板添加
开发人：yangz
开发日期：2018年01月31日
-->
<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="template" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="模板名称" prop="name" v-bind:label-width="labelWidth" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="模板描述" prop="desc" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.desc" v-bind:rows="3")
      <!--el-form-item(label="模板内容" prop="content" v-bind:label-width="labelWidth")-->
        <!--tinymce(v-model="formModel.content" ref="editor")-->
</template>

<script type="text/ecmascript-6">
  import FormModel from './templateModel'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {templateURL} from '../config.toml'
  // import Tinymce from '@/third/Tinymce'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px',
        rules: {
          name: [{required: true, message: '请输入模板名称', trigger: 'blur'}]
        },
        targetURL: templateURL
      }
    },
    components: {
      KalixDialog: Dialog
      // Tinymce
    },
    methods: {
      // kalixDialogOpen() {
      //   this.$nextTick(() => {
      //     this.$refs.editor.initTinymce()
      //   })
      // },
      // kalixDialogClose() {
      //   this.$refs.editor.destroyTinymce()
      // }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
