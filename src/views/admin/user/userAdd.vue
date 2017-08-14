<template lang="pug">
  div.user-add
    kalix-dialog(ref="kalixDialog" v-bind:form-model="formModel" v-bind:dataUrl="dataUrl")
      div.el-form(slot="dialogFormSlot")
        el-form-item(label="工号" prop="code" v-bind:rules="rules.code")
          el-input(v-model="formModel.code")
        el-form-item(label="登录名" prop="loginName" v-bind:rules="rules.loginName")
          el-input(v-model="formModel.loginName")
        el-form-item(label="姓名" prop="name" v-bind:rules="rules.name")
          el-input(v-model="formModel.name")
        el-form-item(label="性别" prop="sex" v-bind:rules="rules.sex")
          el-input(v-model="formModel.sex")
        el-form-item(label="密码" prop="password" v-bind:rules="rules.password")
          el-input(v-model="formModel.password")
        el-form-item(label="确认密码" prop="confirmPassword" v-bind:rules="rules.confirmPassword")
          el-input(v-model="formModel.confirmPassword")
        el-form-item(label="邮箱" prop="email" v-bind:rules="rules.email")
          el-input(v-model="formModel.email")
        el-form-item(label="岗位名称" prop="position")
          el-input(v-model="formModel.position")
        el-form-item(label="电话号码" prop="phone" v-bind:rules="rules.phone")
          el-input(v-model="formModel.phone")
        el-form-item(label="手机号" prop="mobile" v-bind:rules="rules.mobile")
          el-input(v-model="formModel.mobile")
        el-form-item(label="状态" prop="available")
          el-input(v-model="formModel.available")
</template>
<script type="text/ecmascript-6">
  import Dialog from './baseDialog.vue'
  import {usersURL} from 'config/global.toml'

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
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formModel.confirmPassword !== '') {
            this.$refs.kalixDialog.$refs.dialogForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      var validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formModel.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        dataUrl: usersURL,
        rules: {
          code: [{required: true, message: '请输入 code', trigger: 'blur'}],
          loginName: [{required: true, message: '请输入 loginName', trigger: 'blur'}],
          name: [{required: true, message: '请输入 name', trigger: 'blur'}],
          sex: [{required: true, message: '请输入 sex', trigger: 'blur'}],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validateConfirmPassword, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone: [{required: true, message: '请输入 phone', trigger: 'blur'}],
          mobile: [{required: true, message: '请输入 mobile', trigger: 'blur'}],
          available: [{required: true, message: '请输入 available', trigger: 'blur'}]
        }
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      hello() {
        alert('dfdf')
      },
      open(title) {
        this.$refs.kalixDialog.open(title)
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
