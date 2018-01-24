<template lang="pug">
  div.im-box
    div.im-hd
      div.im-hd_title 设置
    div.im-bd
      div.panel_body
        div.group
          div.row.clearfix
            user-avatar(v-bind:user="user" cls="operation")
        div.group.clickAble
          div.row(v-on:click="onUpdateUserInfo") 修改个人信息
            span.more_icon
        div.group.clickAble
          div.row(v-on:click="onUpdatePwd") 修改密码
            span.more_icon
        div.group.clickAble
          div.row.loginout(v-on:click="logout") 退出
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import EventBus from 'common/eventbus'
  import {logoutURL} from 'config/global.toml'
  import UserAvatar from './userAvatar'

  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {
            userName: ''
          }
        }
      }
    },
    methods: {
      logout() {
        this.axios.get(logoutURL, {}).then(response => {
          Cache.clear()
          EventBus.$emit('Kalix_Logout')
          this.navTabSelected = 'contact'
          this.$router.push({path: '/login'})
        })
      },
      /**
       * 修改密码
       */
      onUpdatePwd() {
        this.$router.push({path: '/admin/updatepwd'})
      },
      /**
       * 修改个人信息
       */
      onUpdateUserInfo() {
        this.$router.push({path: '/admin/updateinfo'})
      }
    },
    components: {
      UserAvatar
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .im-box
    height 100%
    display flex
    flex-direction column
    .im-hd
      width 100%
      height 55px
      background-color #ae935c
      display flex
      border-radius $borderRadius $borderRadius 0 0
      border 1px solid #a8925f
      border-bottom 1px solid #cbbb7a
      box-sizing border-box
      .im-hd_title
        line-height 55px
        text-align center
        flex 1
        color #ffffff
    .im-bd
      width 100%
      overflow auto
      flex 1
      box-sizing border-box
      border-left 1px solid #cbbb7a
      border-right 1px solid #cbbb7a
      background-color #ffffeb
      &::-webkit-scrollbar
        width 4px
        height 4px
        background-color #ffffff
      &::-webkit-scrollbar-thumb
        border-radius 4px
        background-color #999999

    .group
      padding: 10px;
      & > .row
        border-left: 1px solid #AFC8E2;
        border-right: 1px solid #AFC8E2;
        border-bottom: 1px solid #AFC8E2;
        padding: 10px;
        background: #fff
        &:first-child
          border-top: 1px solid #AFC8E2;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px
        &:last-child
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px
        .cloumn
          float: left
      .profile_signature
        line-height: 22px;
        overflow: hidden;

    .more_icon
      float: right;
      width: 16px;
      height: 16px;
      background: url(./open_arrow.png) no-repeat center;
      background-size: 100% 100%;
      margin-left: 10px
    .loginout
      background #f74634 !important
      background linear-gradient(#f74634, #ce2715) !important
      text-shadow 0 0 10px #969696
      color #fff
      text-align center
      cursor pointer
    .clickAble
      cursor pointer
    .clearfix:after
      content: " ";
      display: block;
      clear: both;
      visibility: hidden;
      line-height: 0;
      height: 0;
      font-size: 0;

</style>
