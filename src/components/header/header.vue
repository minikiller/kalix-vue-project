<!--
描述：系统头部组件
开发人：冯伟斌
开发日期：2017年10月24日
-->

<template lang="pug">
  div
    div.toolBar
      div.toolbar-wrapper
        div.s-flex.bd
          div.logo(:class="{'small':menuChk}")
            img(src="./logo_oa_horizontal.png")
          div.s-flex_item.s-flex.mn
            ul.s-flex_item.menu
              li
                label.s-check__label.link-btn(for="menuChk")
                  input.s-check(type="checkbox" id="menuChk"
                  v-on:change="menuChkChange" v-model="headerMenuChk")
                  i(v-bind:class="{'el-icon-d-arrow-left':!menuChk,'el-icon-d-arrow-right':menuChk}")
              li(v-for="item in menuList")
                router-link.link-btn(tag="div" v-bind:to="{path:'/'+item.id}")
                  i(:class="bindClass(item.iconCls)")
                  | {{item.text}}
            ul.aside
              li
                el-badge(:value="msgCount")
                  el-button(icon="el-icon-message" v-on:click="onMsgClick") 消息
              li
                el-dropdown(v-on:command="onFlowCommand" style="margin-top:10px;")
                  el-button
                    | 待办工作
                    i.el-icon-arrow-down.el-icon--right
                  el-dropdown-menu(slot="dropdown")
                    el-dropdown-item 待办流程
                    // el-dropdown-item 流程-2
                    // el-dropdown-item 流程-3
              li
                el-dropdown(v-on:command="handleCommand")
                  div.s-flex.el-dropdown-link
                    div.avatar-wrapper
                      div.avatar(v-bind:style="styleObject")
                      span.user-name {{userName}}
                    i.el-icon-caret-bottom.el-icon--right
                  el-dropdown-menu(slot="dropdown")
                    el-dropdown-item(command="changeInfo") 个人信息修改
                    el-dropdown-item(command="changePwd") 修改密码
                    el-dropdown-item(command="logout") 登出
              li(v-if="false")
                el-select(v-model="themeValue" v-on:change="onChangeTheme" placeholder="请选择" v-bind:style="{width:'100px'}")
                  el-option(v-for="item in themeOptions" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
    user-editpwd(ref="userEditpwd")
    user-edit(ref="userEdit")
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import router from 'router'
  import Cache from 'common/cache'
  import {applicationURL, logoutURL, msgCountURL, msgURL, userURL} from 'config/global.toml'
  import {isEmptyObject} from 'common/util'
  import Cookie from 'js-cookie'
  import UserEditpwd from 'views/admin/user/userEditpwd.vue'
  import UserEdit from 'views/admin/user/userEdit.vue'
  import EventBus from 'common/eventbus'

  export default {
    props: {
      styleTheme: {
        type: String,
        default: ''
      },
      menuChk: {
        default: false
      }
    },
    data() {
      return {
        name: 'kalixHeader',
        isPollMsg: true, // 是否进行消息轮询
        userName: '',
        singleLogin: true,
        menuList: [],
        themeOptions: [
          {value: 'theme-triton', label: '浅蓝'},
          {value: 'theme-aria', label: '黑色'},
          {value: 'theme-neptune', label: '深蓝'},
          {value: 'theme-crisp', label: '蓝灰'},
          {value: 'theme-classic', label: '经典'},
          {value: 'theme-gray', label: '灰色'}
        ],
        themeValue: '',
        headerMenuChk: this.menuChk,
        msgCount: 0,
        icon: ''
      }
    },
    watch: {
      '$route': 'initMenu'
    },
    activated() {
      this.userName = Cache.get('user_name')
      if (this.singleLogin) {
        this.checkLogin()
      }
      console.log('header is activated')
//      this.$nextTick(() => {
//        console.log('user name cache is ' + this.userName)
//      })
    },
    deactivated() {
      console.log('header is deactivated')
    },
    mounted() {
      this.initMenu()
    },
    methods: {
      setTheme(theme) {
        if (theme) {
          this.themeValue = theme
        }
      },
      initMenu() {
        let d = new Date()
        let cd = d.getTime()
        let toolListData = {}
        if (Cache.get('toolListData')) {
          toolListData = JSON.parse(Cache.get('toolListData'))
          if (toolListData.length && toolListData[0].id) {
            EventBus.$emit('toolListDataComplete', toolListData[0].id)
          }
        }
        if (!isEmptyObject(toolListData)) {
          this.menuList = toolListData
        } else {
          const data = {
            _dc: cd,
            page: 1,
            start: 0,
            limit: 25
          }
          Vue.axios.get(applicationURL, {
            params: data
          }).then(response => {
            if (response && response.data) {
              console.log('[toolListData] data:', response.data)
              this.menuList = response.data
              toolListData = this.menuList
              Cache.save('toolListData', JSON.stringify(toolListData))
              // EventBus.$emit('toolListDataComplete', toolListData[0].id)
              if (toolListData.length && toolListData[0].id) {
                this.$router.push({
                  path: `/${toolListData[0].id}/`
                })
              }
            }
          })
        }
        if (this.isPollMsg) {
          this.pollMsg()
        }
        this.icon = this.decode(Cookie.get('currentUserIcon')) // 如果为null，则取默认的图标
        if (this.icon === 'null') {
          this.icon = ''
        } else {

        }
      },
      onMsgClick() {
        this.$router.push({path: `/common/receiver`})
      },
      decode(s) {
        if (s) {
          return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
        }
        return 'null'
      },
      checkLogin() {
        clearInterval(this.islogin)
        this.islogin = setInterval(() => {
          let lastLoginTime = Cache._getLocal('lastLoginTime')
          let sessionLatLoginTime = Cache.get('lastLoginTime')
          if (lastLoginTime !== null && sessionLatLoginTime !== lastLoginTime) {
            clearInterval(this.islogin)
            this.doLogout()
          }
        }, 3000)
      },
      pollMsg() { // 消息通知轮询
        let that = this
        that.getMsg()
        clearInterval(window.msgTask)
        window.msgTask = setInterval(() => {
          if (!Cache.get('id')) {
            clearInterval(window.msgTask)
          } else {
            this.getMsg()
          }
        }, 60000)
      },
      handleCommand(command) {
        console.log(' ===== handleCommand ===== ')
        switch (command) {
          case 'changeInfo' :
//            let formData = new FormData()
//            formData.append('jsonStr', encodeURIComponent(JSON.stringify(Cache.get('id'))))
//            formData.append('jsonStr', '{"id":"' + JSON.stringify(Cache.get('id')) + '"}')
            let _data = {
              jsonStr: '{"id":' + JSON.stringify(Cache.get('id')) + '}'
            }
            this.$http.request(userURL, {
              params: _data
            }).then(res => {
              console.log(res)
              if (res.data.data && res.data.data.length) {
                this.$refs.userEdit.open(res.data.data[0])
              }
            })
            break
          case 'changePwd' :
//            this.$message('click on item ' + 'bbb')
            this.$refs.userEditpwd.open('')
            break
          case 'logout' :
            this.doLogout()
            break
        }
      },
      doLogout() {
        Vue.axios.get(logoutURL, {}).then(response => {
          Cache.clear()
          Cache._clearLocal()
          router.push({path: '/login'})
        })
      },
      onFlowCommand(command) {
        console.log(' ===== 代办流程 ===== ')
        // 代办流程
        this.$router.push({path: `/oa/Task`})
      },
      bindClass(e) {
        return e
      },
      menuChkChange() {
        this.$emit('onSmall', this.headerMenuChk)
      },
      getMsg() {
        //  消息通知
        this.$http.get(msgCountURL).then(res => {
          //  获取消息数量
          if (res && res.data && res.data.tag) {
            this.msgCount = res.data.tag
          }
        })
        this.$http.get(msgURL).then(res => {
          //  获取最新消息
          if (res && res.data.tag && res.data.tag.length) {
            let msg = JSON.parse(res.data.tag)
            let headerNotif = this.$notify({
              title: msg.title,
              message: msg.content,
              type: 'success',
              duration: 10000,
              onClick: () => {
                this.$router.push({path: `/common/receiver`})
                headerNotif.close()
              }
            })
          }
        })
      },
      onChangeTheme() {
        this.$emit('onChangeTheme', this.themeValue)
      }
    },
    components: {
      UserEditpwd,
      UserEdit
    },
    computed: {
      classObject(e) {
        return {
          'iconfont': true
        }
      },
      styleObject() {
        console.log('this.formModel1', this.icon)
        let style = {}
        if (this.icon) {
          style = {
            backgroundImage: `url('${this.icon}')`
          }
        }
        return style
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "./header.styl"
  .avatar
    background url('./default_user.png') 50% 50% no-repeat
    background-size cover
    overflow height
</style>
