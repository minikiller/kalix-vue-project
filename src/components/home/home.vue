<!--
描述：系统首页组件
开发人：桑杨
开发日期：2017年7月14日
-->
<template lang="pug">
  div.home
    kalix-header(:menuChk="isSmall" v-on:onSmall="setSmall")
    div.s-flex.container
      kalix-nav(:menuChk="isSmall")
      div.s-flex_item.article
        component(:is="which_to_show")
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/header/header'
  import Navigater from '@/components/navigater/navigater'
  import Welcome from '@/views/admin/welcome'
  //  import user from '@/views/admin/user'
  //  var mmc = user
  let content = {
    Welcome
  }

  export default {
    data() {
      return {
        name: 'kalixHome',
        isSmall: false,
        which_to_show: 'Welcome'
      }
    },
    mounted() {
      this.fetchdata()
    },
    watch: {'$route': 'fetchdata'},
    methods: {
      setSmall(e) {
        this.isSmall = e
      },
      fetchdata() {
        let app = this.$route.params.app // 应用名称
        let fun = this.$route.params.fun // 功能名称
        if (fun !== undefined) {
          this.which_to_show = require(`@/views/${app}/${fun.toLowerCase()}/${fun.toLowerCase()}`)
        } else {
          this.which_to_show = (content[fun]) ? fun : 'Welcome'
        }
      }
    },
    components: {
      KalixHeader: Header,
      KalixNav: Navigater,
      Welcome: Welcome,
      KalixContent: content // 动态显示组件
    }
  }

</script>

<style scoped lang="stylus">
  @import "./home.styl"
</style>
