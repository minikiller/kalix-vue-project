<!--
描述：我的首页-发件箱组件-新增组件
开发人：桑杨
开发日期：2017年8月29日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="note"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="收件人")
        el-select(v-model="formModel.receiverid" multiple filterable remote placeholder="请输入关键词"
        v-bind:remote-method="remoteMethod"
        v-bind:loading="loading")
          el-option(v-for="item in options4" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
        input(type="hidden" v-model="formModel.receiverNames")
        input(type="hidden" v-model="formModel.category")
        input(type="hidden" v-model="formModel.receiverIds")
      el-form-item(label="消息主题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="消息内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="textarea" v-bind:autosize="{ minRows: 2, maxRows: 4}")
</template>

<script type="text/ecmascript-6">
  import BaseDictSelect from '@/components/custom/baseDictSelect.vue'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {NoteURL} from '../config.toml'

  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      },
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        rules: {
          title: [{required: true, message: '请输入消息主题', trigger: 'blur'}],
          content: [{required: true, message: '请输入消息内容', trigger: 'blur'}]
        },
        targetURL: NoteURL
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect
    },
    methods: {
    }
  }
</script>

