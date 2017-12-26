<!--
描述：我的首页-公司公告-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="note"
  ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL"
  v-bind:submitBefore="submitBefore"
  v-bind:submitAfter="submitAfter"
  v-bind:submitCustom="submitCustom"
  )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="area")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {NoteURL} from '../config.toml'
  import {FormModel} from './model.toml'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        targetURL: NoteURL
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      submitBefore(baseDialog, callBack) {
        console.log('[baseDialog Submit] 提交前 submitBefore', baseDialog)
        callBack()
      },
      submitAfter(baseDialog) {
        console.log('[baseDialog Submit] 提交后 submitAfter', baseDialog)
      },
      submitCustom(baseDialog) {
        console.log('[baseDialog Submit] 自定义提交 submitCustom', baseDialog)
        baseDialog.close()
      }
    }
  }
</script>

