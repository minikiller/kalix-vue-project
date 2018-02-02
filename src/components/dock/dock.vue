<template lang="pug">
  keep-alive
    div.dock(id="dock")
      div.dock-bg
      div.dock-wrapper(id="macAvatars")
        div.dock-mac_avatar(v-for="(item,index) in menuList"
        v-bind:class="bindCls(item.id,item.iconCls)"
        v-on:click="selectMac(item)")
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
        menuList: []
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
            $($lis[minVal.id])
              .addClass('current')
              .prev().addClass('prev')
              .prev().addClass('prev_prev')
              .end()
              .end()
              .next().addClass('next')
              .next().addClass('next_next')
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
              toolListData = this.menuList
              this.$myConsoleLog(' [Dock] this.menuList ', this.menuList, '#8B4513')
              Cache.save('toolListData', JSON.stringify(toolListData))
              EventBus.$emit('toolListDataComplete', toolListData[0].id)
              this.$router.push({
                path: `/${toolListData[0].id}/`
              })
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
        return cls + ' ' + i
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
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"

  .dock
    position: absolute
    bottom 0
    left 50%
    height 65px
    z-index: 4000;
    transform translate3d(-50%, 0, 0)
    .dock-bg
      position absolute
      bottom 0
      left 0
      width 100%
      height 65px
      color: #fff;
      background: url("./dock_bg.png") 50% 0 repeat-x;
      border-radius 4px 4px 0 0
    .dock-wrapper
      position relative
      align-items flex-end
      justify-content center
      display flex
      height 50px
      padding 8px 40px 0
      font-size 0
      .dock-mac_avatar
        margin 0 11px
        text-align: center;
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height 50px
        font-size: 26px;
        transition: all .3s;
        box-sizing: border-box;
        cursor: pointer;
        color #ffffff
        border-radius 12px
        text-shadow 8px 9px 13px rgba(0, 0, 0, 0.57)
        &.current
          macAvatarStyle(100%)

        &.prev,
        &.next
          macAvatarStyle(70%)

        &.prev_prev,
        &.next_next
          macAvatarStyle(30%)

        &.icon-admin
          background-color #fe82b4
        &.icon-common-home
          background-color #94dffe
        &.icon-oa
          background-color #f7bb25
        &.icon-art
          background-color #25f7b1
        &.icon-schedule
          background-color #ccadfb
        &.icon-research
          background-color #fc7146

</style>
