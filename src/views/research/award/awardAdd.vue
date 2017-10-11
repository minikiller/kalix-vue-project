<!--
描述：获奖信息-新增组件
开发人：fj
开发日期：2017年9月20日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="award"
  ref="kalixBizDialog"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛" prop="competitionId"
        v-bind:rules="rules.competitionId" label-width="140px" )
          kalix-competition-select(style="width:100%" v-model="competitionInfo" v-bind:multiple="false"
          v-bind:objectsUrl="objectsUrl" v-bind:objectIds.sync="formModel.competitionId" v-on:objectSelected="onCompetitionSelected")
        el-form-item.s-flex_item(label="展赛类别" prop="competitionType" label-width="140px")
          el-input(v-bind:value="formModel.competitionType|getDictName('research','展赛类别')" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="获奖人" prop="awardname" label-width="140px")
          kalix-competition-select(style="width:100%" v-model="signup" v-bind:multiple="false"
          v-bind:params="selectParams"
          v-bind:objectsUrl="signupUrl" v-bind:objectIds.sync="formModel.signupId")
        el-form-item.s-flex_item(label="获奖级别" prop="awardLevel" label-width="140px")
          el-input(v-model="formModel.awardLevel")
      div.s-flex
        el-form-item.s-flex_item(label="备注" prop="remark" label-width="140px")
          el-input(v-model="formModel.remark")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {AwardURL, CompetitionInfoURL, SignupURL} from '../config.toml'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import CompetitionSelect from '@/components/custom/baseObjectSelect'
  export default {
    data() {
      return {
        competitionInfo: null,
        signup: null,
        formModel: Object.assign({}, FormModel),
        rules: {
          competitionId: [{required: true, message: '请选择展赛名称', trigger: 'blur'}]
        },
        targetURL: AwardURL,
        objectsUrl: CompetitionInfoURL,
        signupUrl: SignupURL,
        selectParams: {}
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
        console.log('formModel.competitionId', this.formModel.competitionId)
        this.selectParams = {competitionId: this.formModel.competitionId}
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
