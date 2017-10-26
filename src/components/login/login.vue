<!--
描述：用户登录组件
开发人：桑杨
开发日期：2017年7月14日
-->

<template lang="pug">
  div.login
    div.from-warpper
      div.form
        div.logo
        el-form.loginForm(v-bind:model="loginForm" v-bind:rules="rules" ref="loginForm" label-width="100px")
          el-form-item(label="账号" prop="name")
            el-input(v-model="loginForm.name")
          el-form-item(label="密码" prop="pass")
            el-input(type="password" v-model="loginForm.pass" auto-complete="off")
          el-form-item(label=" ")
            el-button.btn-submit(type="primary" v-on:click="onSubmit('loginForm')" size="large") 立即登录
</template>

<script type="text/ecmascript-6">
  //  import Router from 'router'
  import {mapMutations} from 'vuex'
  import Message from 'common/message'
  import Cache from 'common/cache'
  import Login from 'api/login'

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
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    activated() {
      this.loginForm = {name: '', pass: ''}
    },
    methods: {
      ...mapMutations({setSaveLogin: 'saveLogin'}),
      onSubmit(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Login.remoteLogin({
              'username': that.loginForm.name,
              'password': that.loginForm.pass
            }).then(data => {
              if (data.success) {
                Cache.save('id', data.user.id)
                Cache.save('access_token', data.access_token)
                Cache.save('user_token', data.user.token)
                Cache.save('user_name', data.user.name)
                Cache.save('loginname', that.loginForm.name)
                console.log('access token is: ', data.access_token)
                this.setSaveLogin({
                  access_token: data.access_token,
                  user_name: data.user.name,
                  user_token: data.user.token,
                  user_id: data.user.id,
                  user_login_name: that.loginForm.name
                })
//                Router.push({path: '/'})
                this.$router.push({path: '/'})
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
  @import "./login.styl"
</style>
