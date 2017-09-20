<!--
描述：获奖信息-新增组件
开发人：fj
开发日期：2017年9月20日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="award"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")

      div.s-flex
       el-form-item.s-flex_item(label="展赛" prop="competitionId" label-width="140px")
          kalix-competition-select(style="width:100%"  v-model="formModel.competitionId" v-bind:multiple="false"
          v-on:competitionSelected="onCompetitionSelected")
       el-form-item.s-flex_item(label="展赛类型" prop="competitionType" label-width="140px")
          el-input(v-model="formModel.competitionType")
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
  import Dialog from '@/components/custom/baseDialog.vue'
  import {AwardURL} from '../config.toml'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import CompetitionSelect from '@/components/biz/competitionselect/competitionselect'
  import EventBus from 'common/eventbus'
  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      },
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        rules: {
          competitionId: [{required: true, message: '请选择展赛名称', trigger: 'blur'}]
        },
        targetURL: AwardURL
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixCompetitionSelect: CompetitionSelect
    },
    methods: {
      onCompetitionSelected(competition) {
        console.log('++++++++----------:', competition.type)
        this.competitionType = '123'
        EventBus.$emit('updateAwardModel', competition)
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
