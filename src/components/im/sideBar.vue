<!--
描述：即时通讯-侧栏
开发人：桑杨
开发日期：2018年1月15日
-->
<template lang="pug">
  div.side_bar(v-bind:class="{'show':isShow}")
    div.side_bar_close(v-on:click="close")
    user-avatar(cls="info")
    div.side_list
      side-bar-list-item(v-for="item in items" v-bind:item="item" v-bind:key="item.text")
</template>
<script type="text/ecmascript-6">
  import UserAvatar from './userAvatar'
  import SideBarListItem from './sideBarListItem'
  import EventBus from 'common/eventbus'

  export default {
    data() {
      return {
        isShow: false,
        items: [
          {text: '首页', isSelect: true, icon: 'item_home'},
          {text: '历史纪录', isSelect: false, icon: 'item_history'},
          {text: '个人设置', isSelect: false, icon: 'item_setup'},
          {text: '收藏', isSelect: false, icon: 'item_collect'},
          {text: '编辑', isSelect: false, icon: 'item_edit'}
        ]
      }
    },
    activated() {
      EventBus.$on('UserAvatarClick', this.userAvatarClick)
    },
    methods: {
      userAvatarClick() {
        this.show()
      },
      styleObject() {
        let style = {}
        if (this.icon) {
          style = {
            backgroundImage: `url('${this.user.icon}')`
          }
        }
        return style
      },
      close() {
        this.isShow = false
      },
      show() {
        this.isShow = true
      }
    },
    components: {
      UserAvatar,
      SideBarListItem
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .side_bar
    position absolute
    top 0
    left 0
    width 90%
    height 100%
    overflow hidden
    border-radius 4px 0 0 4px
    background url("./side_bar-bg.png") 0 0 repeat
    transition transform .5s
    &.show
      transform translate3d(-100%, 0, 0)
    .side_bar_close
      width 26px
      height 26px
      position absolute
      top 0px
      left 0px
      border-radius 4px 0 0 0
      background 50% 50% no-repeat url("./icon-close.png")
      cursor pointer
      transition background-color 0.2s
      &:hover
        background-color #7b6a48
    .side_list
      border solid #625833
      border-width 1px 0
</style>
