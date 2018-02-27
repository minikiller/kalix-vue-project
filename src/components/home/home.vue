<!--
描述：系统首页组件
开发人：桑杨
开发日期：2017年7月14日
-->

<template lang="pug">
  div.home(id="kalixHome" v-bind:style="setBackground()")
    div.btn-full_screent(v-if="!isFullScreen" v-on:click="onFullScreent") 全屏
    div.btn-full_screent(v-else v-on:click="onFullScreent") 还原
    div.imin
      div.wallpaper-ctrl
        span.wallpaperImg.pre(v-on:click="onChangeBackgroundImg(false)" title="点击切换背景图片")
        span.wallpaperImg.next(v-on:click="onChangeBackgroundImg(true)" title="点击切换背景图片")
    kalix-im(ref="kalixIm")
    kalix-dock(v-on:onClickMac="onClickMac")
    component(v-bind:is="item.view" v-bind:ref="key" v-if="plankList"
    v-for="(item,key) in plankList"
    v-bind:key="item.title")
    component(v-bind:is="which_to_show" ref="bizTable")
</template>

<script type="text/ecmascript-6">
  import KalixIm from '@/components/im/im'
  import KalixDock from '@/components/dock/dock'
  import Navigater from '@/components/navigater/navigater'
  import Welcome from '@/views/admin/welcome'
  import Cache from '@/common/cache.js'
  import EventBus from 'common/eventbus'
  import GroupPanel from '@/components/panel/groupPanel.vue'
  import ImState from '../im/imState'

  const _import = require('@/api/_import_' + process.env.NODE_ENV)

  let content = {
    Welcome
  }

  export default {
    data() {
      return {
        isFullScreen: false,
        currentBackgroundImg: 8,
        name: 'kalixHome',
        isSmall: false,
        which_to_show: 'Welcome',
        themeValue: null,
        plankList: {},
        imState: ImState.original
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {'$route': 'fetchData'},
    activated() {
      EventBus.$on('ON_CLOSE_BASETABLE', this.onCloseBaseTable)
      EventBus.$on('ON_CLICK_GROUP_CELL', this.onClickGroupCell)
      EventBus.$on('ON_GROUP_PANEL_CLOSE', this.onGroupPanelClose)
      EventBus.$on('Kalix_Logout', () => {
        this.plankList = {}
        this.activePlank = ''
      })
    },
    methods: {
      onGroupPanelClose() {
        this.$refs.kalixIm.original()
      },
      onFullScreent() {
        this.isFullScreen = !this.isFullScreen
        this.isFullScreen ? this._requestFullScreen() : this._exitFullscreen()
      },
      _requestFullScreen() {
        // 进入全屏
        let de = document.documentElement
        if (de.requestFullscreen) {
          de.requestFullscreen()
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen()
        } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen()
        }
      },
      _exitFullscreen() {
        // 退出全屏
        let de = document
        if (de.exitFullscreen) {
          de.exitFullscreen()
        } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen()
        } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen()
        }
      },
      onChangeBackgroundImg(flag) {
        let beginIndex = 0
        let endIndex = 9
        flag ? this.currentBackgroundImg++ : this.currentBackgroundImg--
        this.currentBackgroundImg > endIndex && (this.currentBackgroundImg = beginIndex)
        this.currentBackgroundImg < beginIndex && (this.currentBackgroundImg = endIndex)
      },
      onCloseBaseTable() {
        this.$router.push({path: '/'})
        this.which_to_show = ''
        this.$refs.kalixIm.original()
      },
      onClickGroupCell(item) {
        if (this.$refs[this.activePlank]) {
          this.$refs[this.activePlank][0].min()
        }
        this.$refs.kalixIm.moveLeft()
      },
      /**
       * 点击 Duck 图标
       * @param item
       */
      onClickMac(item) {
        this.which_to_show = ''
        if (this.$refs[this.activePlank] && this.activePlank !== item.id) {
          this.$refs[this.activePlank][0].min()
        }
        // 修改 im 组件状态
        this.$refs.kalixIm.hidden()
        this.activePlank = item.id
        if (!this.plankList[item.id]) {
          this.$set(this.plankList, item.id, {
            view: require('@/components/panel/groupPanel.vue').default
          })
        }
        setTimeout(() => {
          this.$refs[item.id][0].open(item)
        }, 20)
      },
      setBackground() {
        return {'background-image': `url("/static/images/im/${this.currentBackgroundImg}.jpg")`}
      },
      initTheme() {
        this.themeValue = Cache.get('styleTheme')
        if (!this.themeValue) {
          let url = `/camel/rest/system/preferences/${Cache.get('loginname')}`
          this.$http.get(url).then(res => {
            if (res && res.data && res.data.theme) {
              this.themeValue = res.data.theme
              Cache.save('styleTheme', this.themeValue)
              this.$refs.kalixHeader.setTheme(this.themeValue)
            } else {
              Cache.save('styleTheme', 'theme-triton')
              this.$refs.kalixHeader.setTheme('theme-triton')
            }
          })
        } else {
          Cache.save('styleTheme', this.themeValue)
          this.$refs.kalixHeader.setTheme(this.themeValue)
        }
      },
      setSmall(e) {
        this.isSmall = e
      },
      fetchData() {
        let app = this.$route.params.app // 应用名称
        let fun = this.$route.params.fun // 功能名称
        this.$myConsoleLog('fetchData app:', app)
        this.$myConsoleLog('fetchData fun:', fun)
        if (fun !== undefined) {
          this.which_to_show = _import(`${app}/${fun.toLowerCase()}/${fun.toLowerCase()}`)
          // setTimeout(() => {
          //   console.log('bizTable', this.$refs.bizTable)
          //   this.$refs.bizTable.open()
          // }, 20)
        } else {
          this.which_to_show = (content[fun]) ? fun : ''
        }
        // console.log('%capp', 'color:#550000', app)
        // console.log('%cfun', 'color:#550000', fun)
        // this.initTheme()
      },
      changeTheme(value) {
        this.themeValue = value
        this.$http.request({
          method: 'PUT',
          url: `/camel/rest/system/preferences/${Cache.get('loginname')}`,
          params: {
            key: 'theme',
            value: value
          }
        }).then(res => {
//          if (res.data.success) {
//            // 修改成功
//          }
        })
        Cache.save('styleTheme', value)
      }
    },
    components: {
      KalixIm,
      KalixDock,
      GroupPanel,
      KalixNav: Navigater,
      Welcome: Welcome,
      KalixContent: content // 动态显示组件
    }
  }
</script>

<style lang="stylus">
  @import "./home.styl"
  @import "~@/assets/stylus/theme/theme.styl"
  .home
    position relative
    overflow hidden

  .imin
    position absolute
    width 288px
    top 5%
    height 80%
    left 50%
    margin-left -666px
    .wallpaper-ctrl
      position absolute
      top -30px
      .wallpaperImg
        width: 19px;
        height: 19px;
        margin: 0 3px;
        overflow: hidden;
        background: url(http://w.qq.com/css/image/arrow.png) no-repeat;
        display: inline-block;
        text-decoration: none;
        cursor pointer
        &.pre
          background-position: -2px -2px;
        &.next
          background-position: -25px -2px;

  /* “全屏”按钮 */
  .btn-full_screent
    position absolute
    background-color #000000
    color #ffffff
    cursor pointer
    top 10px
    right 10px
    font-size 20px
    padding 8px 10px
    border-radius 5px
    border 1px solid #0a0a0a
    box-shadow 0 0 7px rgba(0, 0, 0, 0.51)

</style>
