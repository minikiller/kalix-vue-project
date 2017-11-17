<!--
描述：我的首页-即时通讯-环信示例
开发人：hqj
开发日期：2017年11月15日
-->
<template lang="pug">
  div.el-form.easemobtest(v-show="visible")
    el-form
      div.s-flex
        el-form-item.s-flex_item(label="用户名" label-width="100px")
          el-input(v-model="user.userName")
        el-form-item.s-flex_item(label="密码" label-width="100px")
          el-input(v-model="user.pass")
      el-button(type="primary" v-on:click="onLogin") 登录
</template>

<script type="text/ecmascript-6">
  import './easemobWebSDK'

  export default {
    data() {
      return {
        visible: false,
        user: {
          userName: 'hqj',
          pass: 'hqj'
        },
        conn: {}
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      onLogin() {
        let options = {
          apiUrl: window.WebIM.config.apiURL,
          user: this.user.userName,
          pwd: this.user.pass,
          appKey: window.WebIM.config.appkey,
          success: () => {
            alert('ok')
          }
        }
        window.conn.open(options)
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus">
  .easemobtest
    position: absolute;
    background-color #ffffff
    top: 0
    left 0
    width 100%
    height 100%
</style>
