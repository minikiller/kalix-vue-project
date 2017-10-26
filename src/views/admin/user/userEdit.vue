<template lang="pug">
  div.user-add
    kalix-dialog(ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
      div(slot="dialogFormSlot")
        el-form-item(label="头像" prop="icon" v-bind:rules="rules.icon")
          kalix-upload(v-model="formModel.icon" v-bind:isImage="true" style="width:100%" )
        el-form-item(label="工号" prop="code" v-bind:rules="rules.code")
          el-input(v-model="formModel.code")
        el-form-item(label="登录名" prop="loginName" v-bind:rules="rules.loginName" )
          el-input(v-model="formModel.loginName" v-bind:readonly="true")
        el-form-item(label="姓名" prop="name" v-bind:rules="rules.name")
          el-input(v-model="formModel.name")
        el-form-item(label="邮箱" prop="email" v-bind:rules="rules.email")
          el-input(v-model="formModel.email")
        el-form-item(label="电话号" prop="phone" v-bind:rules="rules.phone")
          el-input(v-model="formModel.phone")
        el-form-item(label="手机号" prop="mobile" v-bind:rules="rules.mobile")
          el-input(v-model="formModel.mobile")
</template>

<script type="text/ecmascript-6">
  import Dialog from '../../../components/custom/baseDialog.vue'
  import {userURL} from 'config/global.toml'
  export default {
    props: {
    },
    data() {
      return {
        targetURL: userURL,
        formModel: {
          loginName: '',
          icon: ''
        },
        rules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
          mobile: [{required: true, message: '请输入手机号', trigger: 'blur'}]
        }
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      open(obj) {
        this.formModel = obj
        this.$refs.kalixBizDialog.open('', true)
      }
    }
  }
</script>
