<!--
描述：系统首页组件
开发人：桑杨
开发日期：2017年7月14日
-->

<template lang="pug">
  div.home(v-bind:class="themeValue")
    kalix-header(
    v-bind:reqUrl="applicationURL"
    ref="kalixHeader"
    v-on:onClickChangePwd="changePwd"
    v-on:onClickUpdateUserInfo="updateUserInfo")
    user-editpwd(ref="userEditpwd")
    user-edit(ref="userEdit")
    div.s-flex.container
      kalix-navigate(v-bind:cacheTime="7200000" v-bind:url="systemApplicationsBaseURL")
      div.s-flex_item.article
        component(:is="which_to_show")
</template>
<script type="text/ecmascript-6">
  import Header from '@/components/header/header'
  import Navigater from '@/components/navigater/navigater'
  import Welcome from '@/views/admin/welcome'
  import Cache from '@/common/cache.js'
  import UserEditpwd from 'views/admin/user/userEditpwd.vue'
  import UserEdit from 'views/admin/user/userEdit.vue'
  import {cacheTime, applicationURL, systemApplicationsBaseURL, userURL} from 'config/global.toml'

  console.log('cacheTime:', cacheTime)
  const _import = require('@/api/_import_' + process.env.NODE_ENV)

  let content = {
    Welcome
  }

  export default {
    data() {
      return {
        name: 'kalixHome',
        isSmall: false,
        which_to_show: 'Welcome',
        themeValue: null,
        applicationURL: applicationURL,
        cacheTime: cacheTime,
        systemApplicationsBaseURL: systemApplicationsBaseURL
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {'$route': 'fetchData'},
    methods: {
      initTheme() {
        this.themeValue = Cache.get('styleTheme')
        if (!this.themeValue) {
          let url = `/camel/rest/system/preferences/${Cache.get('loginname')}`
          this.$http.get(url).then(res => {
            if (res && res.data && res.data.theme) {
              this.themeValue = res.data.theme
              Cache.save('styleTheme', this.themeValue)
              // this.$refs.kalixHeader.setTheme(this.themeValue)
            } else {
              Cache.save('styleTheme', 'theme-triton')
              // this.$refs.kalixHeader.setTheme('theme-triton')
            }
          })
        } else {
          Cache.save('styleTheme', this.themeValue)
          // this.$refs.kalixHeader.setTheme(this.themeValue)
        }
      },
      setSmall(e) {
        this.isSmall = e
      },
      fetchData() {
        let app = this.$route.params.app // 应用名称
        let fun = this.$route.params.fun // 功能名称
        if (fun !== undefined) {
          this.which_to_show = _import(`${app}/${fun.toLowerCase()}/${fun.toLowerCase()}`)
        } else {
          this.which_to_show = (content[fun]) ? fun : 'Welcome'
        }
        this.initTheme()
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
      },
      changePwd(txt) {
        let _data = {
          jsonStr: '{"id":' + JSON.stringify(Cache.get('id')) + '}'
        }
        this.$http.request(userURL, {
          params: _data
        }).then(res => {
          console.log(res)
          if (res.data.data && res.data.data.length) {
            this.$refs.userEdit.open(res.data.data[0])
          }
        })
      },
      updateUserInfo(row) {
        this.$refs.userEdit.open(row)
      }
    },
    components: {
      KalixHeader: Header,
      KalixNavigate: Navigater,
      Welcome: Welcome,
      KalixContent: content, // 动态显示组件
      UserEditpwd,
      UserEdit
    }
  }
</script>
<style lang="stylus">
  @import "./home.styl"
  @import "~@/assets/stylus/theme/theme.styl"
</style>
