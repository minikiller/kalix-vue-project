<template lang="pug">
  div.user-add
    kalix-dialog(ref="kalixDialog" v-bind:form-model="formModel")
      div(slot="dialogFormSlot")
        el-form-item(label="类型" prop="name" v-bind:rules="formRules.name")
          el-input(v-model="formModel.name")
        el-form-item(label="密码" prop="password" v-bind:rules="rules.password")
          el-input(v-model="formModel.password"  type="password")
        el-form-item(label="确认密码" prop="confirmPassword" v-bind:rules="rules.confirmPassword")
          el-input(v-model="formModel.confirmPassword"  type="password")
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
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formModel.confirmPassword !== '') {
//            this.$refs.kalixDialog.validateField('checkPass')
            console.log(this.$refs.kalixDialog.$refs.form)
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
