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
        el-form-item.s-flex_item(label="昵称" label-width="100px")
          el-input(v-model="user.nickName")
      el-button(type="primary" v-on:click="onRegister") {{lan.signUp}}

      div.s-flex
        el-form-item.s-flex_item(label="用户名" label-width="100px")
          el-input(v-model="user.userName")
        el-form-item.s-flex_item(label="密码" label-width="100px")
          el-input(v-model="user.pass")
      el-button(type="primary" v-on:click="onLogin") {{lan.signIn}}
      el-switch(v-model="isToken" active-text="使用token" inactive-text="非token")
      el-button(type="primary" v-on:click="onLogout") 退出

      el-button(type="primary" v-on:click="getFriendList") 获取好友
      div 好友
      ul(v-if="roster.length")
        li(v-for="ro in roster" v-bind:key="ro.jid") {{ro.name}}
      div(v-if="!roster.length")
        div 你还没有任何好友
      div.s-flex
        el-form-item(label="好友账号" label-width="100px")
          el-input(v-model="memberAccount" placeholder="请输入需要添加好友账号")
        el-form-item(label="验证信息" label-width="100px")
          el-input(v-model="validateMessage" placeholder="请输入验证信息")
      el-button(type="primary" v-on:click="addMember") 添加好友

      div.s-flex
        el-button(type="primary" v-on:click="getGroupList") 获取群组
      div 群组
      ul(v-if="roster.length")
        li(v-for="ro in roster" v-bind:key="ro.jid") {{ro.name}}
      div(v-if="!roster.length")
        div 你还没有添加任何组群
</template>

<script type="text/ecmascript-6">
  import lan from 'config/language'
  import './easemobWebSDK'
  import Message from 'common/message'

  export default {
    data() {
      return {
        lan: lan,
        visible: false,
        user: {
          userName: 'hqj',
          pass: 'hqj',
          nickName: 'hqj'
        },
        isToken: false,
        roster: [],
        memberAccount: '',
        validateMessage: '加个好友呗!我是...',
        groups: []
      }
    },
    components: {},
    methods: {
      show() {
        this.visible = true
      },
      // 注册
      onRegister() {
        let options = {
          username: this.user.userName,
          password: this.user.pass,
          nickname: this.user.nickName,
          appKey: window.WebIM.config.appkey,
          success: () => {
            Message.success(lan.signUpSuccessfully)
          },
          error: err => {
            Message.error('注册失败：ErrType[' + err.type + '],原因' + err.data)
          },
          apiUrl: window.WebIM.config.apiURL
        }
        window.conn.registerUser(options)
      },
      // 登录
      onLogin() {
        let key = btoa(this.user.userName)
        let myCookieKey = 'webim_' + key
        let localToken = window.WebIM.utils.getCookie()[myCookieKey]
        alert('localToken====' + localToken)
        // alert('登录' + localStorage.token)
        let options = {}
        if (this.isToken) {
          options = {
            apiUrl: window.WebIM.config.apiURL,
            user: this.user.userName,
            accessToken: localToken,
            appKey: window.WebIM.config.appkey,
            success: token => {
              Message.success('登录成功,access_token:' + localToken)
              this.getFriendList()
              this.getGroupList()
            },
            error: err => {
              alert(err)
            }
          }
        } else {
          options = {
            apiUrl: window.WebIM.config.apiURL,
            user: this.user.userName,
            pwd: this.user.pass,
            appKey: window.WebIM.config.appkey,
            success: token => {
              let encryptUsername = btoa(this.user.userName)
              let accessToken = token.access_token
              alert('登录成功,access_token:' + accessToken)
              window.WebIM.utils.setCookie('webim_' + encryptUsername, token, 1)
              this.getFriendList()
              this.getGroupList()
            },
            error: err => {
              alert(err)
            }
          }
        }
        window.conn.open(options)
      },
      // 退出
      onLogout() {
        window.conn.close()
        this.roster = []
        this.groups = []
      },
      // 获取好友列表
      getFriendList() {
        this.roster = []
        window.conn.getRoster({
          success: roster => {
            // 获取好友列表，并进行好友列表渲染，roster格式为：
            /** [
             {
               jid:'asemoemo#chatdemoui_test1@easemob.com',
               name:'test1',
               subscription: 'both'
             }
             ]
             */
            for (let i = 0, l = roster.length; i < l; i++) {
              let ros = roster[i]
              // ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
              if (ros.subscription === 'both' || ros.subscription === 'to') {
                this.roster.push(ros)
              }
            }
          },
          error: err => {
            alert('获取好友失败')
            console.log(err)
          }
        })
      },
      // 添加好友
      addMember() {
        if (!this.memberAccount) {
          Message.error(this.lan.username + this.lan.notEmpty)
          return
        }
        if (this.memberAccount === this.user.userName) {
          Message.error(this.lan.addFriendSelfInvalid)
          return
        }
        if (this.roster[this.memberAccount] === 1) {
          Message.error(this.memberAccount + ' ' + this.lan.addFriendRepeat)
          return
        }

        if (window.WebIM.config.isWindowSDK) {
          window.WebIM.doQuery('{"type":"addFriend","to":"' + this.memberAccount + '","message":"' + this.user.userName + this.lan.request + '"}',
            function success(str) {
              Message.success(this.lan.contact_added)
            },
            function failure(errCode, errMessage) {
              Message.error('addMember:' + errCode + ' ' + errMessage)
            })
        } else {
          window.conn.subscribe({
            to: this.memberAccount,
            // Demo里面接收方没有展现出来这个message，在status字段里面
            // message: this.user.userName + this.lan.request
            message: this.validateMessage
          })
          Message.success('你的好友添加请求已经发送成功，正在等待对方确认。')
        }
      },
      // 列出当前登录用户加入的所有群组
      getGroupList() {
        this.groups = []
        window.conn.getGroup({
          success: resp => {
            console.log('Response: ', resp)
            this.groups = resp.data
          },
          error: e => {
            console.log(e)
          }
        })
      }
    }
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
