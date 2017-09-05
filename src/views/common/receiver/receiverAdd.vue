<!--
描述：我的首页-收件箱组件-新增组件
开发人：桑杨
开发日期：2017年8月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="receiver"
  size="tiny" title="发件"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot" style="padding: 0 40px 0 25px;")
      el-form-item(label="收件人")
        kalix-user-select(v-bind:params="params" style="width:100%"
        v-model="receiverIds" v-bind:multiple="multiple"
        v-on:userSelected="onUserSelected")
      el-form-item(label="消息主题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="消息内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="textarea" v-bind:autosize="{ minRows: 4, maxRows: 8}")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {SenderURL} from '../config.toml'
  import UserSelect from '@/components/biz/userselect/userselect'

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
        params: {},
        rules: {
          receiverIds: [{required: true, message: '请输入收件人', trigger: 'blur'}],
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        targetURL: SenderURL,
        receiverIds: [],
        multiple: true
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog,
      KalixUserSelect: UserSelect
    },
    methods: {
      onUserSelected(users) {
        console.log('onUserSelected', users)
        let ids = []
        let names = []
        users.forEach(item => {
          ids.push(item.id)
          names.push(item.name)
        })
        this.formModel.receiverIds = ids.join(':')
        this.formModel.receiverNames = names.join(',')
      }
    },
    watch: {
      receiverIds(newValue) {
//        this.formModel.receiverIds = newValue.join(':')
      }
    }
  }
</script>

