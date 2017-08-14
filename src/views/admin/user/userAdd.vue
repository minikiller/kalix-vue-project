<template lang="pug">
  div.user-add
    kalix-dialog(ref="kalixDialog" v-bind:form-model="formModel")
      div(slot="dialogFormSlot")
        el-form-item(label="类型" prop="name" v-bind:rules="formRules.name")
          el-input(v-model="formModel.name")
        el-form-item(label="标签名" prop="label" v-bind:rules="formRules.label")
          el-input(v-model="formModel.label")
        el-form-item(label="工号" prop="code")
          el-input(v-model="formModel.code")
        el-form-item(label="登录名" prop="loginName")
          el-input(v-model="formModel.loginName")
        el-form-item(label="姓名" prop="name")
          el-input(v-model="formModel.name")
        el-form-item(label="性别" prop="sex")
          el-input(v-model="formModel.sex")
        el-form-item(label="密码" prop="password")
          el-input(v-model="formModel.password")
        el-form-item(label="确认密码" prop="confirmPassword")
          el-input(v-model="formModel.confirmPassword")
        el-form-item(label="邮箱" prop="email")
          el-input(v-model="formModel.email")
        el-form-item(label="岗位名称" prop="position")
          el-input(v-model="formModel.position")
        el-form-item(label="电话号码" prop="phone")
          el-input(v-model="formModel.phone")
        el-form-item(label="手机号" prop="mobile")
          el-input(v-model="formModel.mobile")
        el-form-item(label="状态" prop="available")
          el-input(v-model="formModel.available")
</template>
<script type="text/ecmascript-6">
  import Dialog from './baseDialog.vue'

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
          name: [{required: true, message: '请输入 name', trigger: 'blur'}],
          sex: [{required: true, message: '请输入 sex', trigger: 'blur'}],
          password: [{required: true, message: '请输入 password', trigger: 'blur'}],
          confirmPassword: [{required: true, message: '请输入 confirmPassword', trigger: 'blur'}],
          email: [{required: true, message: '请输入 email', trigger: 'blur'}],
          position: [{required: true, message: '请输入 position', trigger: 'blur'}],
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
