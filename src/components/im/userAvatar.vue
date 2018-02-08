<template lang="pug">
  keep-alive
    div.user-avatar(v-on:click="click" v-bind:class="cls")
      div.avatar(v-bind:style="styleObject")
      div.user-name {{user.userName}}
      div.user-org 动画研究院
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import Cookie from 'js-cookie'
  import EventBus from 'common/eventbus'

  export default {
    props: {
      cls: {
        type: String,
        default: 'comm'
      },
      userObjB: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        user: {
          userName: '',
          avatar: ''
        }
      }
    },
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        this.user.userName = Cache.get('user_name')
        this.user.avatar = this.decode(Cookie.get('currentUserIcon')) === 'null' ? '' : this.decode(Cookie.get('currentUserIcon'))
        if (this.userObjB) {
          this.user.avatar = this.userObjB.avatar
          this.user.userName = this.userObjB.userName
        }
      },
      click() {
        EventBus.$emit('UserAvatarClick')
      },
      decode(s) {
        if (s) {
          return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
        }
        return 'null'
      }
    },
    activated() {
      this.getUser()
    },
    computed: {
      styleObject() {
        let style = {}
        if (this.user.avatar) {
          style = {
            backgroundImage: `url('${this.user.avatar}')`
          }
        }
        return style
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .user-avatar
    display flex
    justify-content flex-start
    align-items center
    font-size 0
    padding 0 14px
    .avatar
      position relative
      display block
      border-radius 50%
      overflow hidden
      background url('images/default_user.png') 50% 50% no-repeat
      background-size cover
    .user-org
      display none
    &.comm
      cursor pointer
      .avatar
        width 30px
        height 30px
        margin-right 9px
        border 1px solid #ffffeb
      .user-name
        font-size 14px
        color #ffffff
    &.operation
      .avatar
        margin 8px !important
        width 40px
        height 40px
      .user-name
        font-size 22px
        line-height 22px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    &.info
      text-align center
      padding 21px 0 13px
      display block
      .avatar
        display inline-block
        width 81px
        height 81px
        border 0
        margin 0
      .user-name,
      .user-org
        font-size 14px
        line-height 14px
      .user-name
        margin-top 11px
        font-weight bold
        color #ffffff
      .user-org
        display block
        margin-top 5px
        color #c5ac71
    &.mini
      padding 0
      display block
      .avatar
        display inline-block
        margin 0
        width 42px
        height 42px
      .user-name
        margin-top 12px
        font-size 14px
        color #fff
</style>
