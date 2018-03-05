<!--
描述：我的首页-通讯录
开发人：yangz
开发日期：2018年01月25日
-->
<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.address-row(:gutter="0")
        el-col.address-col(:span="6" style="padding:8px 0 8px 8px;")
          kalix-nav-menu(title="分组列表"
            v-bind:toolbarBtnList="toolbarBtnList" v-bind:menuUrl="targetUrl"
            v-bind:paramStr="paramStr" v-on:menuItem="getMenuItem")
        el-col.address-col(:span="18")
</template>

<script type="text/ecmascript-6">
  import BaseNavMenu from '@/components/custom/baseNavMenu'
  import Cache from 'common/cache'
  import {AddressGroupURL} from '../config.toml'
  export default {
    created() {
    },
    data() {
      return {
        toolbarBtnList: [
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        paramStr: `{'userId': ` + Cache.get('id') + `}`,
        targetUrl: AddressGroupURL + '/all'
      }
    },
    components: {
      KalixNavMenu: BaseNavMenu
    },
    methods: {
      getMenuItem(val) {
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/color.styl"
  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box

  .address-row
    height 100%
    .address-col
      height 100%
      box-sizing border-box
  .address-wrapper
    margin -10px 0
    .kalix-wrapper
      bottom 0 !important
</style>
