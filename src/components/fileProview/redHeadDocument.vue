<!--
描述：红头文件预览
开发人：桑杨
开发日期：2017年12月22日
-->
<template lang="pug">
  div.rhf-container
    div.rhf-tt
    div.rhf-hd
      div.fl.number 吉动院字〔2017〕X号
      div.fr.issuer 签发人：
        span.issuer-name 郑立国
    div.rhf-bd(ref="rhfDd")
      div.rhf-article()
        div.title {{formModel.name}}
        div.content {{formModel.content}}
      div.rhf-ft(ref="rhfFt")
        div.rhf-aside
          div 吉林动画学院
          div 2017年X月Ｘ日
        div.rhf-footnote
          div.rhf-footnote_cell
            div.fl 抄送：学校领导，学校各单位、部门。
          div.rhf-footnote_cell
            div.fl.org-name 吉林动画学院校务部
            div.fr.pub-date 2017年 X月 X日印发
</template>
<script type="text/ecmascript-6">
  import FormModel from './redHeadDocumentModel'

  export default {
    props: {
      formModel: {
        type: Object,
        default: Object.assign({}, FormModel)
      }
    },
    mounted() {
      // 重置文档内容区底部距离
      this.$refs.rhfDd.style.paddingBottom = this.$refs.rhfFt.offsetHeight + 'px'
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .rhf-container
    width 790px
    margin 0 auto
    font-family '仿宋'
    position relative
    min-height 100%
    .fl
      float left
    .fr
      float right

    .rhf-tt
      position relative
      z-index 1
      font-size 65px
      color #ff0000
      text-align center
      font-family '宋体'
      line-height 3em
      min-height 195px

    .rhf-hd
      position relative
      z-index 1
      border-bottom 2px solid #ff0000
      font-size 16px
      padding 0 1em
      line-height 2
      overflow hidden
      .issuer-name
        font-family '楷体'

    .rhf-bd
      position absolute
      top 0
      left 0
      width 100%
      min-height 100%
      box-sizing border-box
      padding-top 229px
      padding-bottom 191px

    .rhf-ft
      position absolute
      width 100%
      bottom 0
      left 0

    .rhf-article
      font-size 16px
      line-height 2em
      padding 1.5em 16px
      font-family '宋体'
      .title
        margin 0 auto 30px
        font-size 25px
        font-weight 800
        text-align center
        line-height 30px
      .content
        margin 0 auro
        line-height 35px
    .rhf-aside
      text-align right
      font-size 16px
      line-height 2
      padding 1.5em 1em

    .rhf-footnote
      border-top 2px solid #000000
      border-bottom 2px solid #000000
      margin-bottom 2.5em

    .rhf-footnote_cell
      overflow hidden
      font-size 16px
      padding 0 1em
      line-height 2.2em

    .rhf-footnote_cell
      & + .rhf-footnote_cell
        border-top 1px solid #000000

</style>
