<!--
描述：我的首页-即时通讯-环信示例
开发人：hqj
开发日期：2017年11月15日
-->
<template lang="pug">
  div.el-form.easemobtest(v-show="visible")
    el-form
      el-tabs
        el-tab-pane(v-bind:label="lan.signUp")
          el-form-item(label="用户名" label-width="100px")
            el-input(v-model="user.userName")
          el-form-item(label="密码" label-width="100px")
            el-input(v-model="user.pass")
          el-form-item(label="昵称" label-width="100px")
            el-input(v-model="user.nickName")
          el-button(type="primary" v-on:click="onRegister") {{lan.signUp}}
        el-tab-pane(v-bind:label="lan.signIn")
          el-form-item(label="用户名" label-width="100px")
            el-input(v-model="user.userName")
          el-form-item(label="密码" label-width="100px")
            el-input(v-model="user.pass")
          el-button(type="primary" v-on:click="onLogin") {{lan.signIn}}
          el-switch(v-model="isToken" active-text="使用token" inactive-text="非token")
          br
          br
          el-button(type="primary" v-on:click="onLogout") 退出
        el-tab-pane(label="获取好友")
          el-button(type="primary" v-on:click="getFriendList") 获取好友
          div 好友列表
          ul(v-if="roster.length")
            <!--li(v-for="ro in roster" v-bind:key="ro.jid" v-on:click="getFriend(ro)") {{ro.name}}-->
            li(v-for="ro in roster" v-bind:key="ro.jid" v-on:click="myChatTest(ro)") {{ro.name}}
          div(v-if="!roster.length")
            div 你还没有任何好友
        el-tab-pane(label="添加好友")
          el-form-item(label="好友账号" label-width="100px")
            el-input(v-model="memberAccount" placeholder="请输入需要添加好友账号")
          el-form-item(label="验证信息" label-width="100px")
            el-input(v-model="validateMessage" placeholder="请输入验证信息")
          el-button(type="primary" v-on:click="addMember") 添加好友
        el-tab-pane(label="获取群组")
          el-button(type="primary" v-on:click="getGroupList") 获取群组
          div 群组列表(点击某一群组可以查询群组成员、群组黑名单、获取群组信息)
          ul(v-if="groups.length")
            li(v-for="gr in groups" v-bind:key="gr.groupid" v-on:click="getGroupMember(gr)") {{gr.groupname}}
          div(v-if="!roster.length")
            div 你还没有添加任何群组
          br
          br
          div 群组成员
          ul(v-if="groupMembers.length")
            li(v-for="grme in groupMembers" v-bind:key="grme.member" v-on:click="getFriend(grme)") {{grme.member}}
          div(v-if="!groupMembers.length")
            div 无成员
          br
          br
          div 群组黑名单
          br
          br
          div 获取群组信息
          div
        el-tab-pane(label="添加/修改群组")
          el-form-item(label="群组账号" label-width="100px")
            el-input(v-model="memberAccount" placeholder="请输入需要添加群组账号")
          el-form-item(label="验证信息" label-width="100px")
            el-input(v-model="validateMessage" placeholder="请输入验证信息")
          el-button(type="primary") 添加群组
          el-button(type="primary") 修改群组
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
        groups: [],
        groupMembers: []
      }
    },
    mounted() {
      this.$msgbox({
        title: '对方收到请求加为好友',
        confirmButtonText: '同意',
        cancelButtonText: '拒绝'
      })
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
        this.groupMembers = []
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
      getFriend(data) {
        if (data.name) {
          alert(data.name)
        } else if (data.member) {
          alert(data.member)
        }
      },
      // 聊天
      myChatTest(data) {
        // 单聊
        this.sendPrivateText(data)
//        this.sendPrivateAudio(data)
//        this.sendPrivateVideo(data)
      },
      // 单聊发送文本消息
      sendPrivateText(data) {
        // 生成本地消息id
        let id = window.conn.getUniqueId()
        // 创建文本消息
        /* eslint-disable */
        let msg = new window.WebIM.message('txt', id)
        let msgContent = '你好，有空聊一下么'
        msg.set({
          // 消息内容
          msg: msgContent,
          // 接收消息对象(用户id)
          to: data.jid,
          roomType: false,
          success: (id, serverMsgId) => {
            console.log('send private text Success')
            Message.success('send private text Success')
          },
          fail: (e) => {
            console.log('Send private text error')
            Message.error('Send private text error')
          }
        })
        msg.body.chatType = 'singleChat'
        window.conn.send(msg.body)
      },
      // 单聊发送音频消息
      sendPrivateAudio(data) {
        // 生成本地消息id
        let id = window.conn.getUniqueId()
        // 创建音频消息
        let msg = new window.WebIM.message('audio', id)
        // 选择音频的input
//        let input = document.getElementById('audio')
        let input = null
        // 将音频转化为二进制文件
        let file = window.WebIM.utils.getFileUrl(input)
        let allowType = {
          'mp3': true,
          'amr': true,
          'wmv': true
        }
        if (file.filetype.toLowerCase() in allowType) {
          let option = {
            apiUrl: window.WebIM.config.apiURL,
            file: file,
            // 接收消息对象
            to: data.name,
            roomType: false,
            chatType: 'singleChat',
            // 消息上传失败
            onFileUploadError: () => {
              console.log('onFileUploadError')
            },
            // 消息上传成功
            onFileUploadComplete: () => {
              console.log('onFileUploadComplete')
            },
            // 消息发送成功
            success: () => {
              console.log('Success')
            },
            flashUpload: window.WebIM.flashUpload
          }
          msg.set(option)
          window.conn.send(msg.body)
        }
      },
      // 单聊发送视频消息
      sendPrivateVideo(data) {
        // 生成本地消息id
        let id = window.conn.getUniqueId()
        // 创建视频消息
        let msg = new WebIM.message('video', id)
        // 选择视频的input
//        let input = document.getElementById('video')
        let input = null
        // 将视频转化为二进制文件
        let file = window.WebIM.utils.getFileUrl(input)
        let allowType = {
          'mp4': true,
          'wmv': true,
          'avi': true,
          'rmvb': true,
          'mkv': true
        }
        if (file.filetype.toLowerCase() in allowType) {
          let option = {
            apiUrl: window.WebIM.config.apiURL,
            file: file,
            // 接收消息对象
            to: data.name,
            roomType: false,
            chatType: 'singleChat',
            // 消息上传失败
            onFileUploadError: () => {
              console.log('onFileUploadError')
            },
            // 消息上传成功
            onFileUploadComplete: () => {
              console.log('onFileUploadComplete')
            },
            // 消息发送成功
            success: () => {
              console.log('Success')
            },
            flashUpload: windwo.WebIM.flashUpload
          }
          msg.set(option)
          window.conn.send(msg.body)
        }
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
          window.WebIM.doQuery('{"type":"addMember","to":"' + this.memberAccount + '","message":"' + this.user.userName + this.lan.request + '"}',
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
        if (window.WebIM.config.isWindowSDK) {
          window.WebIM.doQuery('{"type":"getGroupList"}',
            function success(str) {
              let rooms = []
              if (str) {
                /* eslint-disable */
                rooms = eval('(' + str + ')')
              }
              console.log(rooms)
              Message.success(rooms)
            },
            function failure(errCode, errMessage) {
              Message.error('getGroupList:' + errCode + ' ' + errMessage)
            })
        } else {
          window.conn.getGroup({
            success: resp => {
              console.log('Response: ', resp)
              this.groups = resp.data
            },
            error: e => {
              console.log(e)
              Message.error(e)
            }
          })
        }
      },
      // 查询群组成员
      getGroupMember(data) {
        this.groupMembers = []
        let pageNum = 1, pageSize = 1000;
        window.conn.listGroupMember({
          pageNum: pageNum,
          pageSize: pageSize,
          groupId: data.groupid,
          success: resp => {
            let result = resp.data
            this.groupMembers = result.filter(item => {
              return item.member
            })
          },
          error: function (e) {
            console.log(e)
            Message.error(e)
          }
        });
      },
      // 获取群组黑名单
      getGroupBlackList(data) {
        let option = {
          roomId: data.groupid,
          success: list => {
            console.log('Get group black list: ', list)
          },
          error: () => {
            console.log('Get group black list error.')
          }
        }
        conn.getGroupBlacklist(option);
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
