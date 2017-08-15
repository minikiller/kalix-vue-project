<template lang="pug">
  kalix-dialog.user-add(
  ref="kalixDialog" v-bind:form-model="formModel" v-bind:dataUrl="dataUrl"
  v-on:refreshData="refreshData"
  )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="工号" prop="code" v-bind:rules="rules.code")
        el-input(v-model="formModel.code")
      el-form-item(label="登录名" prop="loginName" v-bind:rules="rules.loginName")
        el-input(v-model="formModel.loginName")
      el-form-item(label="姓名" prop="name" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="性别" prop="sex" v-bind:rules="rules.sex")
        el-radio-group(v-model="formModel.sex")
          el-radio(label="男")
          el-radio(label="女")
      el-form-item(label="密码" prop="password" v-bind:rules="rules.password")
        el-input(v-model="formModel.password" type="password")
      el-form-item(label="确认密码" prop="confirmPassword" v-bind:rules="rules.confirmPassword")
        el-input(v-model="formModel.confirmPassword" type="password")
      el-form-item(label="岗位名称")
        el-select(v-model="formModel.position" placeholder="请选择岗位名称")
          el-option(label="岗位一" value="1")
          el-option(label="岗位二" value="2")
      el-form-item(label="状态")
        el-switch(v-model="formModel.available" on-text="" off-text="" on-value="1" off-value="0")

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
        rules: {
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
        },
        dataUrl: usersURL
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
      console.log('[userAdd.vue created] this.formModel:', this.formModel)
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      hello() {
        alert('dfdf')
      },
      open(title) {
        console.log('[userAdd.vue methods] formModel', this.formModel)
        this.$refs.kalixDialog.open(title)
      },
      refreshData() {
        this.$emit('refreshData')
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
