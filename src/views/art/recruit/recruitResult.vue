<template lang="pug">
  div.art-result(v-bind:class="result.type")
    div.wrapper
      i.icon(v-bind:class="result.icon")
    div.title {{result.title}}
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        result: {
          title: '',
          cls: ''
        }
      }
    },
    mounted() {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
      let key = this.$route.params.key
      let params = {
        success: {
          type: 'success',
          title: '提交成功！',
          icon: 'iconfont icon-schedule-task-complete'
        },
        error: {
          type: 'error',
          title: '提交失败！',
          icon: 'iconfont icon-schedule-task-failure'
        },
        close: {
          type: 'close',
          title: '谢谢再见！',
          icon: 'iconfont icon-schedule-planmanager-personal'
        }
      }
      this.result = params[key]
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .art-result
    max-width 640px
    margin 0 auto
    box-sizing border-box
    text-align center
    .wrapper
      position relative
      &:before
        content ''
        display block
        padding-top 50%
      .icon
        position absolute
        top: 50%
        left 50%
        transform: translate3d(-50%, -50%, 0)
        font-size 100px
        color #ffffff
      .title
        font-size 24x
        margin-top 30px
    &.success
      .icon
        color rgb(67, 132, 52)
    &.error
      .icon
        color rgb(255, 0, 51)
    &.close
      .icon
        color rgb(0, 124, 199)
</style>
