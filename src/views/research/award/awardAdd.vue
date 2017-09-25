<!--
描述：获奖信息-新增组件
开发人：fj
开发日期：2017年9月20日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="award"
  ref="kalixBizDialog"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")

      div.s-flex
       el-form-item.s-flex_item(label="展赛" prop="competitionId" label-width="140px")
          kalix-competition-select(style="width:100%"  v-model="formModel.competitionId" v-bind:multiple="false"
          v-on:competitionSelected="onCompetitionSelected")
       el-form-item.s-flex_item(label="展赛类型" prop="competitionType" label-width="140px")
          kalix-dict-select(v-model="formModel.competitionType" style="width:100%" appName="research"
          v-bind:disabled="true" dictType="展赛类型")
      div.s-flex
        el-form-item.s-flex_item(label="报名ID" prop="signupId" label-width="140px")
          el-input(v-model="formModel.signupId")
        el-form-item.s-flex_item(label="获奖人" prop="awardname" label-width="140px" )
          el-input(v-model="formModel.awardname")
      div.s-flex
        el-form-item.s-flex_item(label="获奖级别" prop="awardLevel" label-width="140px")
          el-input(v-model="formModel.awardLevel")
        el-form-item.s-flex_item(label="备注" prop="remark" label-width="140px")
          el-input(v-model="formModel.remark")
 </template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {AwardURL} from '../config.toml'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import CompetitionSelect from '@/components/biz/competitionselect/competitionselect'
  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          competitionId: [{required: true, message: '请选择展赛名称', trigger: 'blur'}]
        },
        targetURL: AwardURL
      }
    },
    created() {
      console.log('created FormModel', FormModel)
      console.log('created this.formModel', this.formModel)
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixCompetitionSelect: CompetitionSelect
    },
    methods: {
      onCompetitionSelected(competition) {
        console.log('++++++++----------:', competition.type)
        this.formModel.competitionType = competition.type
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~@/assets/stylus/color.styl"
  .dd
    width 50px
  .line
    height 1px
    background-color br_color3
    margin-bottom 20px
</style>
