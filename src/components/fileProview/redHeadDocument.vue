<!--
描述：红头文件预览
开发人：桑杨
开发日期：2017年12月22日
-->
<template lang="pug">
  div.rhf-container
    div.rhf-tt {{formModel.title}}
    div.rhf-hd
      div.fl.number 吉动院字〔2017〕X号
      div.fr.issuer 签发人：
        span.issuer-name {{formModel.name}}
    div.rhf-bd(ref="rhfDd")
      div.rhf-article() {{formModel.content}}
        p   “红头文件”并非法律用语，是老百姓对“各级政府机关（多指中央一级）下发的带有大红字标题和红色印章的文件”的俗称。从制定机关的权限来看，行政法规的制定机关是国务院，规章的制定机关是31个省、自治区、直辖市人民政府，19个较大的市人民政府，以及国务院各部门、各直属机构和具有行政管理职责的直属事业单位。而一般“红头文件”，有行政管理权的行政机关在行政管理工作需要时就可以制定。可见，“红头文件”实际上有广义与狭义之分。广义的“红头文件”就是从字面理解的带红头和红色印章的，既包括行政机关直接针对特定公民和组织而制发的文件，也包括行政机关不直接针对特定公民和组织而制发的文件，以及行政机关内部因明确一些工作事项而制发的文件。狭义的“红头文件”是专指行政机关针对不特定的公民和组织而制发的文件，这类文件对公众有约束力、涉及到他们的权利和义务，也就是法律用语所称的行政法规、规章以外的其他具有普遍约束力的规范性文件。公众所关心关注的，应该是指狭义上的“红头文件”。现在大多公司将其作为机密文件，任职文件，紧急文件的别称。
        p   1、严格执行规范性文件制定程序。为了规范规章、法规的制定程序，国务院颁布了《规章制定程序条例》，许多部门也制定了本部门的规章制定办法，对于规范性文件的制定也应符合一定的操作规程，经历必要的程序和合理的步骤，使行政机关这种抽象行政行为做到针对性强，更加科学合理。
        p   2、落实公开、公正制度。在制定规范性文件时应广泛听取各方面的意见，涉及对外有普遍约束力的规范性文件还应当听取管理相对人的意见，增加规范性文件的透明度。规范性文件形成后还应及时公布，便于贯彻执行，更有利于群众的参与和监督。
        p   3、严格划分制定权限。对不属本级管理的事务不得越权制定文件，对需要部门协调的及时相互沟通，对属于上级权限的应及时请示，对本部门需要创立规章的不应以规范性文件代替，同时在制定规范性文件时应当加强内部职能部门的协调，建立严格的会签制度，对涉及法规性内容应当有法制工作部门的意见。
        p   4、加强对规范性文件的监督检查。对于规范性文件的监督有行政监督、司法监督和社会监督。上级行政机关应经常检查所属部门制定的规范性文件，对不合法的文件应当撤销或变更。行政机关内部法制工作机构应当定期对本部门的文件进行清理，建立规范性文件报送备案制度。
        p   在司法监督中，人民法院对审理案件中具体行政行为依据的规范性文件应当严格鉴别和判断，对于不合法的规范性文件不予采信，同时可以采用司法建议方式向规范性文件制定单位及其上级机关提出修改建议，促进行政机关及时纠正。
        p   在贯彻规范性文件时，要经常听取下级、社会各界对执行规范性文件的意见，发现有违法或者有不合理问题时应当及时修正。规范性文件修改、制定的及时性正是加强行政管理所需要的。因此行政机关应当在搞好调查研究的同时，进一步完善规范性文件的制定，为贯彻法律、法规、行政规章服务。
        p   规范性文件是行政管理中的重要依据，制定和完善规范性文件的创制制度有利于我国行政法制规范化的建设，因此 定规范性文件应当纳入法制的轨道。
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
