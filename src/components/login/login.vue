<!--
描述：用户登录组件
开发人：桑杨
开发日期：2017年7月14日
-->

<template lang="pug">
  div.login(data-logig)
    div.from-warpper
      div.form
        div.logo
        el-form.loginForm(v-bind:model="loginForm" v-bind:rules="rules" ref="loginForm")
          div.error(v-if="errorFlag") {{errorMessage}}
          el-form-item.kalix-form-item(prop="name")
            el-input(v-model="loginForm.name" placeholder="账号" ref="loginFormName")
              i.icon-user(slot="prefix")
          el-form-item.kalix-form-item(prop="pass")
            el-input(type="password" v-model="loginForm.pass" placeholder="密码" auto-complete="off")
              i.icon-lock(slot="prefix")
          el-form-item(label="")
            el-button.btn-submit(type="primary" v-on:click="onSubmit('loginForm')" size="large") 登录
</template>

<script type="text/ecmascript-6">
  //  import Router from 'router'
  import {mapMutations} from 'vuex'
  import Message from 'common/message'
  import Cache from 'common/cache'
  import Login from 'api/login'
  import EventBus from 'common/eventbus'

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
        },
        errorFlag: false,
        errorMessage: ''
      }
    },
    activated() {
      this.loginForm = {name: '', pass: ''}
      EventBus.$on('ElFormItem.validateField', () => {
//        console.log('el.form.item.validateField')
      })
    },
    mounted() {
      this.tabInput()
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
//                console.log('access token is: ', data.access_token)
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
                this.$refs.loginFormName.focus()
                Message.error(data.message)
              }
            }).catch(error => {
              this.$refs.loginFormName.focus()
              Message.error(error.message)
            })
          } else {
            return false
          }
        })
      },
      tabInput() {
        let ipts = document.getElementsByClassName('el-input__inner')
        for (let i = 0; i < ipts.length; i++) {
          ipts[i].addEventListener('keydown', e => {
            if (e.keyCode === 13) {
              if (ipts[i + 1]) {
                ipts[i + 1].focus()
              } else {
                document.getElementsByClassName('btn-submit')[0].focus()
              }
            }
          })
        }
      }
    },
    components: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="stylus">
  // .el-form-item.is-error .el-input__inner
  .login[data-logig]
    .btn-submit
      background url("./button-bg.png") 50% 50% no-repeat;
      border none
      color #5c4611
    .icon-user,
    .icon-lock
      display block
      width 21px
      height 100%
      background 50% 50% no-repeat
    .icon-user
      background-image url("./icon-user.png")
    .icon-lock
      background-image url("./icon-lock.png")
    .kalix-form-item
      margin-bottom 36px
      .el-input__inner
        border-color #d8dce5 !important
      &.is-success
        .el-input__inner
          border-color #d8dce5 !important
      &.is-error
        .el-input__inner
          border-color #bca878 !important
          box-shadow 0px 0px 6px rgba(188, 168, 120, 0.46)
        .el-form-item__error
          padding 0 0 0 22px
          line-height: 32px;
          background url("./icon-warning.png") 0 50% no-repeat
          color: #fe00000
</style>
<style scoped lang="stylus">
  @import "./login.styl"
</style>
