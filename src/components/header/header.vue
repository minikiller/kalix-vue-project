<!--
描述：系统头部组件
开发人：桑杨
开发日期：2017年7月14日
-->

<template lang="pug">
  div#ToolBar
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
              el-button(icon="message" @click="onMsgClick") 消息
          li
            el-dropdown(@command="handleCommand")
              div.s-flex.el-dropdown-link {{userName}}  &nbsp;
                div.avatar
                  img(v-bind:src="icon" v-show="icon.length > 0")
                i.el-icon-caret-bottom.el-icon--right
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(command="changeInfo") 个人信息修改
                el-dropdown-item(command="changePwd") 修改密码
                el-dropdown-item(command="logout") 登出
          li
            el-select(v-model="themeValue" placeholder="请选择" v-bind:style="{width:'80px'}")
              el-option(v-for="item in themeOptions" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import router from 'router'
  import Cache from 'common/cache'
  import {applicationURL, logoutURL, msgCountURL, msgURL} from 'config/global.toml'
  import {getCookie, isEmptyObject} from 'common/util'

  export default {
    props: {
      menuChk: {
        default: false
      }
    },
    data() {
      return {
        name: 'kalixHeader',
        isPollMsg: false, // 是否进行消息轮询
        userName: Cache.get('user_name'),
        menuList: [],
        themeOptions: [
          {value: '选项1', label: '浅蓝'},
          {value: '选项2', label: '黑色'},
          {value: '选项3', label: '深蓝'},
          {value: '选项4', label: '蓝灰'},
          {value: '选项5', label: '经典'},
          {value: '选项6', label: '灰色'}
        ],
        themeValue: '浅蓝',
        headerMenuChk: this.menuChk,
        msgCount: 0,
        icon: ''
      }
    },
    watch: {'$route': 'initMenu'},
    mounted() {
      this.initMenu()
    },
    methods: {
      initMenu() {
        let d = new Date()
        let cd = d.getTime()
        let toolListData = {}

        if (Cache.get('toolListData')) {
          toolListData = JSON.parse(Cache.get('toolListData'))
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
              this.menuList = response.data
              toolListData.data = this.menuList
              Cache.save('toolListData', JSON.stringify(toolListData.data))
            }
          })
        }
        if (this.isPollMsg) {
          this.pollMsg()
        }
        this.icon = this.decode(getCookie('currentUserIcon')) // 如果为null，则取默认的图标
        if (this.icon === 'null') {
          this.icon = ''
        }
      },
      onMsgClick() {
        this.$router.push({path: `/common/receiver`})
      },
      decode(s) {
        return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
      },
      pollMsg() { // 消息通知轮询
        let that = this
        that.getMsg()
        setInterval(function () {
          that.getMsg()
        }, 10000)
      },
      handleCommand(command) {
        switch (command) {
          case 'changeInfo' :
            this.$message('click on item ' + 'aaa')
            break
          case 'changePwd' :
            this.$message('click on item ' + 'bbb')
            break
          case 'logout' :
            Vue.axios.get(logoutURL, {}).then(response => {
              Cache.clear()
              router.push({path: '/login'})
            })
            break
        }
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
          this.msgCount = res.data.tag
        })
        this.$http.get(msgURL).then(res => {
          //  获取最新消息
          if (res.data.tag.length > 0) {
            let msg = JSON.parse(res.data.tag)
            this.$notify({
              title: msg.title,
              message: msg.content,
              type: 'success',
              duration: 10000,
              onClick() {
                this.$router.push({path: `/common/receiver`})
              }
            })
          }
        })
      }
    },
    components: {},
    computed: {
      classObject(e) {
        return {
          'iconfont': true
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "./header.styl"
  .avatar
    background url('./default_user.png') 50% 50% no-repeat
    background-size contain
</style>
