<!--
描述：用户登录组件
开发人：桑杨
开发日期：2017年7月14日
-->
<template lang="pug">
  div.login
    div.form
      div.logo
      el-form.demo-ruleForm(:model="loginForm" :rules="rules" ref="loginForm" label-width="100px")
        el-form-item(label="账号" prop="name")
          el-input(v-model="loginForm.name")
        el-form-item(label="密码" prop="pass")
          el-input(type="password" v-model="loginForm.pass" auto-complete="off")
        el-form-item(label=" ")
          el-button(type="primary" @click="onSubmit('loginForm')" size="large" class="btn-submit") 立即登录
</template>

<script type="text/ecmascript-6">
  import Router from 'router'
  import Store from 'store'
  import Message from 'common/message'
  import {baseUrl, loginUrl} from 'config/global.toml'

  var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      callback()
    }
  }
  export default {
    data() {
      return {
        name: 'Login Form',
        loginForm: {
          name: '',
          pass: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        let that = this
        console.log(baseUrl + loginUrl)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.request({
              method: 'POST',
              url: baseUrl + loginUrl,
              transformRequest: [(data) => {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                'username': that.loginForm.name,
                'password': that.loginForm.pass
              }
            }).then(response => {
              console.log(response.data)
              let data = response.data
              if (data.success) {
                sessionStorage.setItem('id', data.user.id)
                sessionStorage.setItem('access_token', data.access_token)
                sessionStorage.setItem('user_token', data.user.token)
                console.log(data.access_token)
                Store.commit({
                  type: 'saveLogin',
                  access_token: data.access_token,
                  user_name: data.user.name,
                  user_token: data.user.token,
                  user_id: data.user.id
                })

                Router.push({path: '/'})
              } else {
                Message.error(data.message)
              }
            }).catch(error => {
              Message.error(error.message)
            })
          } else {
            return false
          }
        })
      }
    },
    components: {},
    computed: {}
  }
</script>

<style scoped lang="stylus">
  @import "login.styl"
</style>
