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
    <!--component(:is="which_to_show")-->
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/header/header'
  import Nav from '@/components/nav/nav'

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
    methods: {
      setSmall(e) {
        this.isSmall = e
      },
      fetchdata() {
        let app = this.$route.params.app
        console.log(app)
//        this.which_to_show = (_components[app]) ? app : 'Welcome'
      }
    },
    components: {
      KalixHeader: Header,
      KalixNav: Nav
    }
  }

</script>

<style scoped lang="stylus">
  @import "./home.styl"
</style>
