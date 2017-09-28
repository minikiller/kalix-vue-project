<!--
描述：人员管理-学生维护-新增组件
开发人：fj
开发日期：2017年9月05日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="competitionInfo" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛名称" prop="name" v-bind:rules="rules.name" label-width="120px" )
          el-input(v-model="formModel.name" )
        div.dd
        el-form-item.s-flex_item(label="展赛类别" prop="type" label-width="120px")
          kalix-dict-select(v-model="formModel.type" appName="research" dictType="展赛类别" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="展赛地址" prop="address" label-width="120px")
          el-input(v-model="formModel.address" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="联系人员" prop="contactor" label-width="120px")
          el-input(v-model="formModel.contactor" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="联系电话" prop="phone" label-width="120px")
          el-input(v-model="formModel.phone" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="联系邮箱" prop="email" label-width="120px")
          el-input(v-model="formModel.email" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="征集开始时间" prop="collectionStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.collectionStartTime" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="征集结束时间" prop="collectionEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.collectionEndTime" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="初评开始时间" prop="preEvalStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.preEvalStartTime" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="初评结束时间" prop="preEvalEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.preEvalEndTime" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="终评开始时间" prop="lastEvalStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.lastEvalStartTime" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="终评结束时间" prop="lastEvalEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.lastEvalEndTime" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="展览开始时间" prop="compStartTime" label-width="120px")
          kalix-date-picker(v-model="formModel.compStartTime" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="展览结束时间" prop="compEndTime" label-width="120px")
          kalix-date-picker(v-model="formModel.compEndTime" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="作品内容要求" prop="contentNeed" label-width="120px")
          el-input(type="textarea" v-model="formModel.contentNeed" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="作品技术要求" prop="technologyNeed" label-width="120px")
          el-input(type="textarea" v-model="formModel.technologyNeed" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="展赛详细信息" prop="detail" label-width="120px")
          el-input(type="textarea" v-model="formModel.detail" style="width:100%")
        div.dd
        el-form-item.s-flex_item(label="展赛备注说明" prop="remark" label-width="120px")
          el-input(type="textarea" v-model="formModel.remark" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item(label="报名表样式" prop="signupStyle" label-width="120px")
          kalix-upload(v-model="formModel.signupStyle" v-bind:isImage="false" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {CompetitionInfoURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入展赛名称', trigger: 'blur'}]
        },
        targetURL: CompetitionInfoURL
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixDatePicker: DatePicker
    },
    created() {
    },
    watch: {},
    methods: {}
  }
</script>
<style scoped lang="stylus">
  .dd
    width 50px
</style>
