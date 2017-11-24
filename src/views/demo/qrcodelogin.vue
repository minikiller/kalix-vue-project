<template lang="pug">
  div.qrcode-login
    div.title 欢迎，登录中请稍后……
</template>
<script type="text/ecmascript-6">
  import Login from 'api/login'
  import Cache from 'common/cache'
  import {mapMutations} from 'vuex'

  export default {
    methods: {
      ...mapMutations({setSaveLogin: 'saveLogin'}),
      login() {
        let username = '郑立国'
        let password = '123'
        Login.remoteLogin({
          username,
          password
        }).then(data => {
          if (data.success) {
            Cache.save('id', data.user.id)
            Cache.save('access_token', data.access_token)
            Cache.save('user_token', data.user.token)
            Cache.save('user_name', data.user.name)
            Cache.save('loginname', username)
            this.setSaveLogin({
              access_token: data.access_token,
              user_name: data.user.name,
              user_token: data.user.token,
              user_id: data.user.id,
              user_login_name: username
            })
            this.$router.push({path: `/demo/sealapplyfrom`})
          }
        })
      }
    },
    mounted() {
      setTimeout(() => {
        this.login()
      }, 500)
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .qrcode-login
    .title
      position fixed
      top 40%
      left 0
      width 100%
      font-size 18px
      text-align center
</style>
