<!--
左侧菜单组件，点击菜单时传递菜单节点对象
add by yangz
-->
<template lang="pug">
  div.kalix-article
    div.kalix-wrapper
      div.kalix-wrapper-hd
        i.tit_icon.iconfont.icon-application-management
        | {{title}}
      div.kalix-wrapper-bd
        kalix-tool-bar(v-if="isShowToolBar"
          v-bind:toolbarBtnList="toolbarBtnList"
          v-on:onToolBarClick="onToolBarClick"
          v-on:onCheckBtnList="onCheckBtnList")
        div.kalix-navmenu-container
          el-menu(v-on:select="handleSelect")
            <!--el-menu-item(v-for="item in menuItems" key="item.id" v-bind:index="item.id+'##'+item.name+'##'+item.code")-->
            el-menu-item(v-for="item in menuItems" key="item.id" v-bind:index="JSON.stringify(item)")
              i(v-bind:class="item.iconCls")
              span(slot="title")
                | {{item.text}}

</template>

<script type="text/ecmascript-6">
  import BaseToolBar from './baseToolBar'
  export default {
    name: 'baseNavMenu',
    props: {
      title: {  // 菜单面板标题名
        type: String,
        required: true
      },
      toolbarBtnList: {   //  toolBar 中按钮数组
        type: Array,
        default: () => {
          return []
        }
      },
      menuUrl: {
        type: String,
        required: true
      },
      basePath: {
        type: String
      },
      paramStr: {
        type: String
      }
    },
    components: {
      KalixToolBar: BaseToolBar
    },
    data() {
      return {
        isShowToolBar: true,
        menuItems: []
      }
    },
    mounted() {
      this.getMenu()
    },
    methods: {
      onCheckBtnList(flag) {
        this.isShowToolBar = flag
      },
      onToolBarClick(btnId) {
        this.onRefreshClick()
      },
      onRefreshClick() { // 刷新按钮点击事件
        this.getMenu()
      },
      handleSelect(key, keyPath) {
        this.$emit('menuItem', JSON.parse(key))
      },
      getMenu() {
        this.axios.get(this.menuUrl, {
          params: this.paramStr
        }).then(response => {
          if (response.data) {
            this.menuItems = response.data.children
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseNavMenu"
</style>
