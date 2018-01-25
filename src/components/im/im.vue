<template lang="pug">
  div.im-main(v-bind:class="bindCls")
    transition(name="ima2")
      div.im2(v-if="isMini")
        div.im-btn-restore(v-on:click="onRestorem")
        user-avatar(cls="mini")
    transition(name="ima")
      div.im(v-if="!isMini")
        // 侧栏
        kalix-side-bar(ref="sideBar")
        // 主内容区
        div.im-wrapper
          div.im-cantainer
            div.im-btn-min(v-on:click="onMinimum")
            // 设置
            kalix-operation(v-show="footerBars[3].isSelect")
            // 组织机构
            org-list(v-show="footerBars[1].isSelect")
            // 消息列表
            message-list(v-show="footerBars[0].isSelect")
          div.panel_footer
            im-footer-bar(v-for='bar in footerBars' v-bind:key="bar.type" v-bind:data="bar" v-on:click="onFooterBarClick(bar)")
</template>
<script type="text/ecmascript-6">
  import ImState from './imState'
  import KalixSideBar from './sideBar'
  import MessageList from './messageList'
  import KalixOperation from './operation'
  import UserAvatar from './userAvatar'
  import OrgList from './orgList'
  import ImFooterBar from './imFooterBar'

  export default {
    data() {
      return {
        isMini: false,
        showState: ImState.original,
        footerBars: [
          {type: 'contact', isSelect: true},
          {type: 'conversation', isSelect: false},
          {type: 'plugin', isSelect: false},
          {type: 'setup', isSelect: false}
        ]
      }
    },
    mounted() {
      this.$myConsoleLog('IM', 'mounted', '#008B45')
      if (this.$route.name !== 'home') {
        this.moveLeft()
      }
    },
    activated() {
      this.$myConsoleLog('IM', 'activated', '#000080')
      this.footerBars = [
        {type: 'contact', isSelect: true},
        {type: 'conversation', isSelect: false},
        {type: 'plugin', isSelect: false},
        {type: 'setup', isSelect: false}
      ]
    },
    methods: {
      onFooterBarClick(bar) {
        this.footerBars.map(e => {
          if (e === bar) {
            e.isSelect = true
          } else {
            e.isSelect = false
          }
        })
      },
      onRestorem() {
        this.isMini = false
        this.original()
      },
      onMinimum() {
        console.log('最小化')
        this.isMini = true
        this.mini()
      },
      original() {
        this.showState = ImState.original
      },
      moveLeft() {
        this.showState = ImState.moveLeft
      },
      hidden() {
        this.showState = ImState.hidden
      },
      mini() {
        this.showState = ImState.mini
      }
    },
    computed: {
      bindCls() {
        console.log('%cthis.showState', 'color:#009999', this.showState)
        let cls = ''
        switch (this.showState) {
          case ImState.original:
            cls = ''
            break
          case ImState.moveLeft:
            cls = 'move-left'
            break
          case ImState.hidden:
            cls = 'hide'
            break
          case ImState.mini:
            cls = 'mini'
            break
        }
        // return (this.isMini ? 'mini' : '')
        return cls
      },
      styleObject() {
        let style = {}
        if (this.user.avatar) {
          style = {
            backgroundImage: `url('${this.user.avatar}')`
          }
        }
        return style
      }
    },
    watch: {
      showState(oldValue, newValue) {
        console.log('%cnewValue', 'color:#003399', newValue)
      }
    },
    components: {
      KalixSideBar,
      MessageList,
      KalixOperation,
      UserAvatar,
      OrgList,
      ImFooterBar
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  .im-main
    position absolute
    width 288px
    top 5%
    height 80%
    left 50%
    margin-left -504px
    &.mini
      animation f1 .3s linear
      animation-fill-mode forwards
    &.move-left
      margin-left -605px
    &.hide
      opacity 0
    .im2
      /*height 100%*/
      padding 15px
      text-align center
      box-sizing border-box
      background-color #ae935c
      .im-btn-restore
        position absolute
        top 0
        right 0
        width 26px
        height 26px
        background url("./icon-min.png") #ae935c 50% 50% no-repeat
        cursor pointer
        transition background-color .5s
        border-radius 0 0 0 10px
        &:hover
          background-color #7d5f21
          border-radius 0

      .user_info
        .avatar
          width 58px
          height 58px
          border-radius 50%
          overflow hidden
          background url(user-3.png) 50% 50% no-repeat
          background-size cover
          border 1px solid #ffffeb
        .user_name
          font-size 14px
          color #ffffff
          margin-top 8px

  .im
    height 100%
    .im-cantainer
      position absolute
      top 0
      bottom 70px
      left 0
      width 100%
      background-color #ffffeb
      border-radius 4px 4px 0 0
      .im-btn-min
        position absolute
        top 0
        right 0
        width 26px
        height 26px
        background url("./icon-min.png") #ae935c 50% 50% no-repeat
        border-radius 0 4px
        cursor pointer
        transition background-color .5s
        &:hover
          background-color #7d5f21

    .panel_footer
      position absolute
      box-sizing border-box
      width 100%
      bottom 0
      left 0
      border 1px solid #e6dbb1
      background url("./nav_tab_item_bg.png") 50% 0 repeat-x
      border-radius: 0 0 $borderRadius $borderRadius
      display flex
      box-orient horizontal

  .ima-enter-active
    transition all .1s

  .ima-leave-active
    transition all .1s .1s

  .ima-enter,
  .ima-leave-active
    opacity 0

  @keyframes f1
    60%
      left 0
      top 0
      margin-left 0
      width 288px
    100%
      left 0
      top 0
      margin-left 0
      width 90px

</style>
