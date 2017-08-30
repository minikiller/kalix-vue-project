<!--
描述：我的首页-收件箱组件-新增组件
开发人：桑杨
开发日期：2017年8月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="note"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="收件人" prop="receiverIds" v-bind:rules="rules.receiverIds")
        el-select(v-model="formModel.receiverIds"
        multiple filterable remote placeholder="请输入关键词"
        v-bind:remote-method="remoteMethod"
        v-bind:loading="loading")
          el-option(v-for="item in usersData" v-bind:key="item.id"
          v-bind:label="item.name"
          v-bind:value="item.id")
        input(type="hidden" v-model="formModel.category")
      el-form-item(label="消息主题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="消息内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="textarea" v-bind:autosize="{ minRows: 2, maxRows: 4}")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import Cache from 'common/cache'
  import {ReceiverURL, UsersURL} from '../config.toml'

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
          receiverIds: [{required: true, message: '请输入收件人', trigger: 'blur'}],
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        targetURL: ReceiverURL,
        loading: false,
        usersData: []
      }
    },
    created() {
      this.getDate()
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      getDate() {
        if (!Cache.get('USERS-DICT')) {
          let _data = {
            jsonStr: '{"%name%":""}',
            page: 1,
            start: 0,
            limit: 1000
          }
          this.$http.get(UsersURL, {
            params: _data
          }).then(res => {
            console.log(res.data.data)
            Cache.save('USERS-DICT', JSON.stringify(res.data.data))
          })
        }
        this.dataList = JSON.parse(Cache.get('USERS-DICT'))
      },
      remoteMethod(query) {
        if (query !== '') {
          this.usersData = this.dataList.filter(item => {
            return item.name.indexOf(query) > -1
          })
        } else {
          this.usersData = []
        }
      }
    }
  }
</script>

