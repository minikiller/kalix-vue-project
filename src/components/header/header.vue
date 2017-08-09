<!--
描述：系统头部组件
开发人：桑杨
开发日期：2017年7月14日
-->
<template lang="pug">
  div#ToolBar
    div.s-flex.bd
      div.logo(:class="{'smail':menuChk}")
        img(src="./logo_oa_horizontal.png")
      div.s-flex_item.s-flex.mn
        ul.s-flex_item.menu
          li
            label.s-check__label.link-btn(for="menuChk")
              input.s-check(type="checkbox" id="menuChk" v-on:change="menuChkChange" v-model="menuChk")
            i.el-icon-d-arrow-left
          li(v-for="item in menuList")
            router-link.link-btn(tag="div" :to="{path:'/'+item.id}")
              i(:class="bindClass(item.iconCls)")
              |{{item.text}}
        ul.aside
          li
            el-button(type="text" icon="message") 0
          li
            el-dropdown(@command="handleCommand")
              span.el-dropdown-link 管理员
                i.el-icon-caret-bottom.el-icon--right
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(command="changeInfo") 个人信息修改
                el-dropdown-item(command="changePwd") 修改密码
                el-dropdown-item(command="logout") 登出
          li
            el-button(type="text" icon="close") 0
          li
            el-select(v-model="themeValue" placeholder="请选择" :style="{width:'80px'}")
              el-option(v-for="item in themeOptions" :key="item.value" :label="item.label" :value="item.value")
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import router from 'router'
  import Cache from 'common/cache'
  import {cacheTime, applicationURL, logoutURL} from 'config/global.toml'

  export default {
    props: {
      menuChk: {
        default: false
      }
    },
    data() {
      return {
        name: 'kalixHeader',
        menuList: [],
        themeOptions: [
          {value: '选项1', label: '浅蓝'},
          {value: '选项2', label: '黑色'},
          {value: '选项3', label: '深蓝'},
          {value: '选项4', label: '蓝灰'},
          {value: '选项5', label: '经典'},
          {value: '选项6', label: '灰色'}
        ],
        themeValue: '浅蓝'
      }
    },
    mounted() {
      let d = new Date()
      let cd = d.getTime()
      let toolListData = {}

      if (Cache.get('toolListData')) {
        toolListData = JSON.parse(Cache.get('toolListData'))
      }
      if (toolListData.createDate && (toolListData.createDate - cd) < cacheTime && toolListData.data) {
        this.menuList = toolListData.data
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
          this.menuList = response.data
          let nowDate = new Date()
          toolListData.data = this.menuList
          toolListData.createDate = nowDate.getTime()
          Cache.save('toolListData', JSON.stringify(toolListData))
        })
      }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'changeInfo' :
            this.$message('click on item ' + 'aaa')
            break
          case 'changePwd' :
            this.$message('click on item ' + 'bbb')
            break
          case 'logout' :
            Vue.axios.get(logoutURL, {
            }).then(response => {
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
        this.$emit('setSmail', this.menuChk)
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
</style>
