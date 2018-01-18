<template lang="pug">
  div.im-main(v-bind:class="bindCls")
    transition(name="ima2")
      div.im2(v-if="isMini")
        div.im-btn-restore(v-on:click="onRestorem")
        div.user_info
          div.avatar_wrapper
            div.avatar(v-bind:style="styleObject")
          div.user_name {{userName}}
    transition(name="ima")
      div.im(v-if="!isMini")
        // 侧栏
        kalix-side-bar(v-bind:isShow="isShowSideBar" v-bind:user="user")
        // 主内容区
        div.im-wrapper
          div.im-cantainer
            div.im-btn-min(v-on:click="onMinimum")
            // 设置
            kalix-oeration(v-show="navTabSelected === 'setup'")
            // 组织机构
            div.im-box(v-show="navTabSelected === 'conversation'")
              div.im-hd
                div.avatar_wrapper(v-on:click="onOpenUserInfo")
                  div.avatar(v-bind:style="styleObject")
                  div.text {{userName}}
              div.im-bd
                ul.group_list.member_group_list
                  li.list_group.clearfix(v-bind:key="item.id" v-for="(item,index) in treeData" v-bind:class="{'active':item.active}")
                    div.list_group_title.list_group_white_title.list_arrow_right(v-on:click="selectItem(item,index)")
                      span {{item.name}}
                      span.onlinePercent 6/34
            // 消息列表
            div.im-box(v-show="navTabSelected === 'contact'")
              div.im-hd
                div.avatar_wrapper(v-on:click="onOpenUserInfo")
                  div.avatar(v-bind:style="styleObject")
                  div.text {{userName}}
              div.im-bd
                ul.user-list(id="user-list-session")
                  li.user-list_item
                    div.user_avatar_wrapper
                      img.avatar(src="/static/images/im/user-1.png")
                    div.user-list_item_main
                      p.member_nick user
                      p.member_msg.text_ellipsis 消息
                    div.time 16:25
                  li.user-list_item
                    div.user_avatar_wrapper
                      img.avatar(src="/static/images/im/user-2.png")
                    div.user-list_item_main
                      p.member_nick 用户2
                      p.member_msg.text_ellipsis 《参加全国大学生竞赛》
                    div.time 16:25
                  li.user-list_item
                    div.user_avatar_wrapper
                      img.avatar(src="/static/images/im/sys-message.png")
                    div.user-list_item_main
                      p.member_nick 实时消息
                      p.member_msg.text_ellipsis 参加今天的下午5点会
                    div.time 16:25
                  li.user-list_item
                    div.user_avatar_wrapper
                      img.avatar(src="/static/images/im/user-file.png")
                    div.user-list_item_main
                      p.member_nick 审批文件
                      p.member_msg.text_ellipsis 《参加全国大学生竞赛》
                    div.time 16:25
          div.panel_footer
            div.nav_tab
              ul.nav_tab_head
                li.contact(v-on:click="onNavTabClick('contact')" v-bind:class="{'selected':navTabSelected === 'contact'}")
                  div.icon
                li.conversation(v-on:click="onNavTabClick('conversation')" v-bind:class="{'selected':navTabSelected === 'conversation'}")
                  div.icon
                li.plugin(v-on:click="onNavTabClick('plugin')" v-bind:class="{'selected':navTabSelected === 'plugin'}")
                  div.icon
                li.setup(v-on:click="onNavTabClick('setup')" v-bind:class="{'selected':navTabSelected === 'setup'}")
                  div.icon
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import Cookie from 'js-cookie'
  import ImState from './imState'
  import KalixSideBar from './sideBar'
  import KalixMessageList from './messageList'
  import KalixOeration from './operation'

  export default {
    data() {
      return {
        isMini: false,
        isShowSideBar: false,
        userName: '',
        treeData: [],
        navTabSelected: 'contact',
        showState: ImState.original,
        user: {
          userName: ''
        }
      }
    },
    activated() {
      this.navTabSelected = 'contact'
      this.user.userName = Cache.get('user_name')
      this.icon = this.decode(Cookie.get('currentUserIcon')) === 'null' ? '' : this.decode(Cookie.get('currentUserIcon'))
      this.getData()
    },
    methods: {
      onRestorem() {
        this.isMini = false
        this.original()
      },
      onMinimum() {
        console.log('最小化')
        this.isMini = true
        this.mini()
      },
      decode(s) {
        if (s) {
          return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
        }
        return 'null'
      },
      onOpenUserInfo() {
        console.log('this.isShowSideBar', this.isShowSideBar)
        this.isShowSideBar = !this.isShowSideBar
      },
      onNavTabClick(value) {
        this.navTabSelected = value
      },
      /**
       * 获取组织机构
       *
       */
      getData() {
        let url = '/camel/rest/orgs?node=root'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.analyze(res.data.children[0])
        })
      },
      /**
       * 分解对象
       * @param arr
       */
      analyze(arr) {
        if (arr.children && arr.children.length > 0) {
          arr.children.forEach(item => {
            this.$set(item, 'active', false)
            this.treeData.push(item)
            this.analyze(item)
          })
        }
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
        if (this.icon) {
          style = {
            backgroundImage: `url('${this.icon}')`
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
      KalixMessageList,
      KalixOeration
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
    .panel_footer
      position absolute
      box-sizing border-box
      width 100%
      bottom 0
      left 0
      border 1px solid #e6dbb1
      background url("./nav_tab_item_bg.png") 50% 0 repeat-x
      border-radius: 0 0 $borderRadius $borderRadius
      .nav_tab
        ul
          display flex
          box-orient horizontal
          li
            position: relative;
            overflow: hidden;
            flex: 1;
            display flex
            height: 68px;
            color: #ccc;
            font-size: 0px;
            text-align: center;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            &:before
              top 0
              left 0
              position absolute
              display block
              content ''
              width 1px
              height 100%
              background-image url("./nav_tab_item_border.png")
            &:first-child
              border-radius: 0 0 0 $borderRadius
              &:before
                visibility hidden
            &:last-child
              border-radius: 0 0 $borderRadius 0
            .icon
              display: inline-block;
              width: 34px;
              height: 34px;
              background-size: 100% 100%
            span
              display: block;
              position: relative;
              bottom: 2px;
              width: 100%;
              font-size: 12px;

            &.contact .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_conversation.png)
            }

            &.conversation .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_contact.png)
            }

            &.plugin .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_plugin.png)
            }

            &.setup .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_setup.png)
            }

            &.selected.contact .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_conversation_selected.png)
            }

            &.selected.conversation .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_contact_selected.png)
            }

            &.selected.plugin .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_plugin_selected.png)
            }

            &.selected.setup .icon {
              background-image: url(http://w.qq.com/css/image/tab_icon_setup_selected.png)
            }

    .avatar_wrapper
      display flex
      justify-content flex-start
      align-items center
      font-size 0
      cursor pointer
      padding 0 14px
      .avatar
        display block
        width 30px
        height 30px
        border-radius 50%
        overflow hidden
        margin-right 9px
        background url('./default_user.png') 50% 50% no-repeat
        background-size cover
        overflow hidden
        border 1px solid #ffffeb
      .text
        display block
        font-size 14px
        color #ffffff

    /* 用户列表 */
    .user-list
      .user-list_item
        height 70px
        width 100%
        padding 0 20px
        background url("./user-item-bg.png") 50% 0 repeat-x
        border-bottom 1px solid #f0ebca
        box-sizing border-box
        cursor pointer
        &.selected
          background-image url("./user-item-bg.png")
        .user_avatar_wrapper
          display inline-block
          margin-right 8px
          margin-top 15px
          position relative
          float left
          .avatar
            width 40px
            height 40px
            border-radius 50%
            border 1px solid #dddddd
          .badge
            position absolute
            display inline-block
            top -6px
            right -2px
            width 14px
            height 14px
            font-size 12px
            color #ffffff
            text-align center
            line-height 14px
            border-radius 50%
            border 1px solid #fff
            background-color #ff3b2f
            .badge-text
              transform scale(0.8333)
        .user-list_item_main
          display inline-block
          float left
          margin 0
          margin-top 15px
          width 134px
          .member_nick
            height: 16px;
            line-height: 16px;
            overflow: hidden;
            margin-top 6px;
          .member_msg
            font-size: 12px;
            line-height 14px
            color: #898a93;
            margin-top 2px
            text_ellipsis()

        .time
          display inline-block
          float right
          margin-top 21px
          margin-left 8px
          font-size 14px;
          color #bcbdc0
    .list_group
      cursor: pointer
      &:first-child
        .list_group_title
          border-top: 0
      &.active
        .list_group_body
          display block
        .list_arrow_right
          background-image: url(http://w.qq.com/css/image/open_arrow_fire.png)
      .list_group_body
        display none
      .list_arrow_right
        background url(http://w.qq.com/css/image/open_arrow.png) no-repeat 12px
        background-size 14px 14px
      .list_group_title
        padding .65em 28px .75em
        border-top 1px solid #ccc
        .onlinePercent
          color #808080
          font-size 12px
          float right
          line-height 20px
    /* 设置 */
    .label
      color: #666;
      float: left;
      width: 80px;
    .more_icon
      float: right;
      width: 16px;
      height: 16px;
      background: url(http://w.qq.com/css/image/open_arrow.png) no-repeat center;
      background-size: 100% 100%;
      margin-left: 10px
    .active
      .more_icon
        background: url(http://w.qq.com/css/image/open_arrow_fire.png) no-repeat center !important;
        background-size: 100% 100% !important

    .profile_signature
      line-height: 22px;
      overflow: hidden;

  /*ima2*/
  /*ima*/
  /*.mini-enter-active,*/
  /*.mini-leave-active*/

  /*.min-enter,*/
  /*.min-leave-active*/
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
