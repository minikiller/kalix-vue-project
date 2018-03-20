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
            label.s-check__label.link-btn(for="menuChk")
              input.s-check(type="checkbox" id="menuChk"
              v-on:change="menuChkChange" v-model="headerMenuChk")
              i(v-bind:class="{'el-icon-d-arrow-left':!menuChk,'el-icon-d-arrow-right':menuChk}")
            div.s-flex_item
              div.s-flex.menu-main(v-bind:class="{'open':menuIsOpen}" v-on:mouseover="onOpenMenu(true)"  v-on:mouseout="onOpenMenu(false)")
                ul.menu(ref="ulMenu")
                  li(v-for="item in menuList")
                    router-link.link-btn(tag="div" v-bind:to="{path:'/'+item.id}")
                      i(:class="bindClass(item.iconCls)")
                      | {{item.text}}
                div.aside-btn(v-if="isShowAsideBtn")
                  div.line
                  div.arrow
                    div.arrow-mn
                  div.line
            ul.aside
              li(v-if="isShowMessage")
                el-badge(v-if="msgCount > 0" v-bind:value="msgCount")
                  el-button(icon="el-icon-message" v-on:click="onMsgClick") 消息
                el-button(v-else= icon="el-icon-message" v-on:click="onMsgClick" style="margin-top:10px;") 消息
              li(v-if="isFlowCommand")
                el-dropdown(v-on:command="onFlowCommand" style="margin-top:10px;")
                  el-button
                    | 待办工作
                    i.el-icon-arrow-down.el-icon--right
                  el-dropdown-menu(slot="dropdown")
                    el-dropdown-item 待办流程
              li
                el-dropdown(v-on:command="handleCommand")
                  div.s-flex.el-dropdown-link
                    div.avatar-wrapper
                      div.avatar(v-bind:style="styleObject")
                      span.user-name {{userName}}
                    i.el-icon-caret-bottom.el-icon--right
                  el-dropdown-menu(slot="dropdown")
                    el-dropdown-item(command="changeInfo") 修改个人信息
                    el-dropdown-item(command="changePwd") 修改密码
                    el-dropdown-item(command="logout") 退出
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
        icon: '',
        menuIsOpen: false,
        isShowAsideBtn: false,
        isShowMessage: false,
        isFlowCommand: false
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
      window.onresize = () => {
        this._setAsideBtn()
      }
    },
    methods: {
      // 展开导航按钮
      onOpenMenu(flag) {
        this.isShowAsideBtn && (this.menuIsOpen = flag)
      },
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
          this._setAsideBtn()
          this._setTopBtns()
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
              toolListData = response.data
              this.menuList = toolListData
              Cache.save('toolListData', JSON.stringify(toolListData))
              this._setAsideBtn()
              this._setTopBtns()
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
          if (res && res.data && res.data.success && res.data.tag) {
            this.msgCount = res.data.tag
          } else {
            clearInterval(window.msgTask)
          }
        })
        this.$http.get(msgURL).then(res => {
          //  获取最新消息
          if (res && res.data.tag && res.data.success && res.data.tag.length) {
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
          } else {
            clearInterval(window.msgTask)
          }
        })
      },
      onChangeTheme() {
        this.$emit('onChangeTheme', this.themeValue)
      },
      // 计算 ulMenu 高度，决定 menu 是否带有展开功能
      _setAsideBtn() {
        setTimeout(() => {
          this.isShowAsideBtn = (this.$refs.ulMenu.clientHeight > 64)
        }, 20)
      },
      // 判断是否显示快捷按钮
      _setTopBtns() {
        // 是否显示 消息 按钮
        this.isShowMessage = this._chkShortcutBtn('common')

        // 是否显示 待办工作 按钮
        this.isFlowCommand = this._chkShortcutBtn('oa')
      },
      _chkShortcutBtn(_itemId) {
        let items = this.menuList.filter(item => {
          return item.id === _itemId
        })
        this._getDict(_itemId)
        return (items.length > 0)
      },
      // 获取快捷按钮对应的数据字典
      _getDict(_id) {
        const DictURL = `/camel/rest/${_id}/dicts`
        const DictKey = `${_id.toUpperCase()}-DICT-KEY`
        if (!Cache.get(DictKey)) {
          const data = {
            page: 1,
            start: 0,
            limit: 200,
            sort: '[{\'property\': \'value\', \'direction\': \'ASC\'}]'
          }
          this.axios.get(DictURL, {
            params: data
          }).then(response => {
            if (response.data) {
              Cache.save(DictKey, JSON.stringify(response.data.data))
              console.log(`dict cached under key ${DictKey}`, response.data)
            }
          })
        }
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
