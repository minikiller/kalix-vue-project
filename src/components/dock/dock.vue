<template lang="pug">
  keep-alive
    div.dock(id="dock" v-bind:class="cls")
      div.dock-bg
      div.dock-wrapper(id="macAvatars")
        div.dock-mac_avatar(v-for="(item,index) in menuList" v-on:click="selectMac(item)")
          div.mac(v-bind:class="bindCls(item.id)")
          div.text {{item.text}}
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import {applicationURL} from 'config/global.toml'
  import {isEmptyObject} from 'common/util'
  import Cookie from 'js-cookie'
  import EventBus from 'common/eventbus'
  import $ from 'jquery'
  import _ from 'underscore'

  export default {
    data() {
      return {
        menuList: [],
        cls: ''
      }
    },
    created() {
      this.initMenu()
    },
    mounted() {
      setTimeout(() => {
        this.init()
      }, 200)
    },
    methods: {
      setVisible() {
        this.cls = ''
      },
      setHide() {
        this.cls = 'hide'
      },
      init() {
        let $lis = $('#macAvatars > .dock-mac_avatar')
        let $wrapper = $('#kalixHome')

        $wrapper.mousemove(e => {
          let hs = []
          $lis.each((i, item) => {
            let imgX = $(item).offset().left + $(item).width() / 2
            let imgY = $(item).offset().top + $(item).height() / 2
            let a = imgX - e.clientX
            let b = imgY - e.clientY
            let c = Math.sqrt(a * a + b * b)
            hs.push({id: i, val: c})
          })
          let minVal = _.min(hs, item => {
            return item.val
          })
          $($lis).removeClass('current prev next prev_prev next_next')
          if (minVal.val < 60) {
            if ($('#dock').hasClass('hide')) {
              $('#dock').addClass('visible')
            }
            $($lis[minVal.id])
              .addClass('current')
              .prev().addClass('prev')
              .prev().addClass('prev_prev')
              .end()
              .end()
              .next().addClass('next')
              .next().addClass('next_next')
          } else {
            if ($('#dock').hasClass('hide')) {
              $('#dock').removeClass('visible')
            }
          }
        })
      },
      initMenu() {
        let d = new Date()
        let cd = d.getTime()
        let toolListData = {}
        if (Cache.get('toolListData')) {
          toolListData = JSON.parse(Cache.get('toolListData'))
          EventBus.$emit('toolListDataComplete', toolListData[0].id)
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
          this.$http.get(applicationURL, {
            params: data
          }).then(response => {
            if (response && response.data) {
              this.menuList = response.data
              console.log('this.menuList：', this.menuList)
              toolListData = this.menuList
              this.$myConsoleLog(' [Dock] this.menuList ', this.menuList, '#8B4513')
              Cache.save('toolListData', JSON.stringify(toolListData))
              if (toolListData.length && toolListData[0].id) {
                EventBus.$emit('toolListDataComplete', toolListData[0].id)
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
      decode(s) {
        if (s) {
          return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
        }
        return 'null'
      },
      bindCls(i, cls) {
        return 'mac-' + i
      },
      selectMac(item) {
        this.$emit('onClickMac', item)
      }
    },
    activated() {
      this.initMenu()
      setTimeout(() => {
        this.init()
      }, 200)
      EventBus.$on('ON_ORI_BASETABLE', this.setVisible)
      EventBus.$on('ON_MAX_BASETABLE', this.setHide)
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  $macAvatarW = 50px
  $macAvatarH = 70px
  $macAvatarFontSize = 12px
  .dock
    position: absolute
    bottom 0
    left 50%
    height 82px
    z-index: 4000;
    transition all .5s
    transform translate3d(-50%, 0, 0)
    user-select none
    &.hide
      transform translate3d(-50%, 100%, 0)
      &.visible
        transform translate3d(-50%, 0, 0)
    .dock-bg
      position absolute
      bottom 0
      left 0
      width 100%
      height 82px
      color: #fff;
      background: url("./icon/dock_bg.png") 50% 0 repeat-x;
      border-radius 4px 4px 0 0
      background-size 100% 100%
    .dock-wrapper
      position relative
      align-items flex-end
      justify-content center
      display flex
      height 70px
      padding 8px 40px 4px
      font-size 0
      .dock-mac_avatar
        margin 0 20px
        text-align: center;
        display: inline-block;
        width $macAvatarW
        height $macAvatarH
        transition: all .3s;
        box-sizing: border-box;
        cursor: pointer;
        color #ffffff
        border-radius 12px
        font-size $macAvatarFontSize

        &.current
          macAvatarStyle(120%)

        &.prev,
        &.next
          macAvatarStyle(50%)

        &.prev_prev,
        &.next_next
          macAvatarStyle(10%)
        .mac
          position: relative;
          width 100%
          margin 0
          background no-repeat 50% 50%
          background-size cover
          &:after
            content ''
            display block
            padding-top 100%
          &:before
            position absolute
          &.mac-admin
            background-image: url('./icon/icon-mac-admin.png')
          &.mac-common
            background-image: url('./icon/icon-mac-common-home.png')
          &.mac-oa
            background-image: url('./icon/icon-mac-oa.png')
          &.mac-art
            background-image: url('./icon/icon-mac-art.png')
          &.mac-schedule
            background-image: url('./icon/icon-mac-schedule.png')
          &.mac-research
            background-image: url('./icon/icon-mac-research.png')

        .text
          color #3b3b3b
          overflow hidden
          margin 7px -20px 0
          white-space nowrap
          text-overflow ellipsis
          line-height 1
</style>
