<!--
描述：系统首页组件
开发人：桑杨
开发日期：2017年7月14日
-->
<template lang="pug">
  div.home
    kalix-header(:menuChk="isSmall" @onSmall="setSmall")
    div.s-flex.container
      kalix-nav(:menuChk="isSmall")
      div.s-flex_item.article
        component(:is="which_to_show")
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/header/header'
  import Nav from '@/components/nav/nav'
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
        let name = this.$route.params.name
        let app = this.$route.params.app
        if (app !== undefined) {
          this.which_to_show = require(`@/views/${name}/${app}`)
        } else {
          this.which_to_show = (content[app]) ? app : 'Welcome'
        }
      }
    },
    components: {
      KalixHeader: Header,
      KalixNav: Nav,
      Welcome: Welcome,
      KalixContent: content // 动态显示组件
    }
  }

</script>

<style scoped lang="stylus">
  @import "./home.styl"
</style>
