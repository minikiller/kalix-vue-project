<!--
描述：红头文件预览
开发人：桑杨
开发日期：2017年12月22日
-->
<template lang="pug">
  div.rhf-container
    div.rhf-tt {{formModel.docCaption}}
    div.rhf-hd
      div.rhf-hd_wrapper
        div.fl.number {{formModel.businessNo}}
        div.fr.issuer 签发人：
          span.issuer-name 郑立国
    div.rhf-bd(ref="rhfDd")
      div.rhf-article()
        div.title {{formModel.title}}
        div.content {{formModel.docContent}}
      div.rhf-ft(ref="rhfFt")
        div.rhf-aside
          div 吉林动画学院
          div {{formModel.creationDate | formatLocalDate}}
        div.rhf-footnote
          div.rhf-footnote_cell
            div.fl 抄送：学校领导，学校各单位、部门。
          div.rhf-footnote_cell
            div.fl.org-name 吉林动画学院校务部
            div.fr.pub-date 2017年 X月 X日印发
</template>
<script type="text/ecmascript-6">
  import FormModel from './redHeadDocumentModel'
  import {formatDate} from 'common/typeFormat'

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
    },
    data() {
      return {}
    },
    filters: {
      formatLocalDate(val) {
        return formatDate(new Date(val), 'yyyy年MM月dd日')
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  mainContainer()
    width 790px
    margin 0 auto

  .rhf-container
    width 1000px
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
      font-size 60px
      color #ff0000
      text-align center
      font-family '宋体'
      line-height 3em
      min-height 195px
      padding-top 20px

    .rhf-hd
      mainContainer()
      position relative
      z-index 1
      font-size 16px
      line-height 2
      .rhf-hd_wrapper
        padding 0 1em
        border-bottom 2px solid #ff0000
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
      padding-top 249px
      padding-bottom 191px
      border 1px solid #cccccc

    .rhf-ft
      position absolute
      width 100%
      bottom 0
      left 0

    .rhf-article
      mainContainer()
      font-size 16px
      line-height 2em
      padding 2em 16px
      font-family '宋体'
      overflow hidden
      box-sizing border-box
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
      mainContainer()
      box-sizing border-box
      text-align right
      font-size 16px
      line-height 2
      padding 1.5em 1em

    .rhf-footnote
      mainContainer()
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
