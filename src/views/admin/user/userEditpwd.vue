<template lang="pug">
  div.user-add
    kalix-dialog(ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
      div(slot="dialogFormSlot")
        el-form-item(label="原密码" prop="oldPassword" v-bind:rules="rules.oldPassword")
          el-input(v-model="formModel.oldPassword" type="password" )
        el-form-item(label="新密码" prop="password" v-bind:rules="rules.password")
          el-input(v-model="formModel.password"  type="password")
        el-form-item(label="确认密码" prop="confirmPassword" v-bind:rules="rules.confirmPassword")
          el-input(v-model="formModel.confirmPassword"  type="password")
</template>

<script type="text/ecmascript-6">
  import Dialog from '../../../components/custom/baseDialog.vue'
  import {userURL} from 'config/global.toml'
  import Cache from 'common/cache'
  export default {

    props: {
    },
    data() {
      var validateOldPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'))
        } else {
          this.axios.request({
            method: 'GET',
            url: userURL + '/' + Cache.get('id') + '/password/' + this.formModel.oldPassword,
            data: this.formModel,
            params: {}
          }).then(response => {
            if (response.data) {
              callback()
            } else {
              callback(new Error('旧密码错误'))
            }
          }).catch(() => {
          })
        }
      }

      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formModel.confirmPassword !== '') {
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
        targetURL: userURL,
        formModel: {
        },
        rules: {
          oldPassword: [{validator: validateOldPassword, required: true, trigger: 'blur'}],
          password: [
            {validator: validatePassword, trigger: 'blur', required: true}
          ],
          confirmPassword: [
            {validator: validateConfirmPassword, trigger: 'blur', required: true}
          ]
        }
      }
    },
    created() {
//      console.log('this.formRules.name:', this.formRules.name)
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      open() {
        this.formModel.id = Cache.get('id')
        this.$refs.kalixBizDialog.open('', true)
      }
    }
  }
</script>
