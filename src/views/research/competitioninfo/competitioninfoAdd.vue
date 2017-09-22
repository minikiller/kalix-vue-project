<!--
描述：人员管理-学生维护-新增组件
开发人：fj
开发日期：2017年9月05日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="competitionInfo"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="展赛名称" prop="name" v-bind:rules="rules.name" label-width="140px" )
          el-input(v-model="formModel.name" )
        div.dd
        el-form-item.s-flex_item(label="展赛地点" prop="address" label-width="140px")
          el-input(v-model="formModel.address" )
      div.s-flex
        el-form-item.s-flex_item(label="展赛类别" prop="type" label-width="140px")
          kalix-dict-select(v-model="formModel.type" style="width:100%" appName="research" dictType="展赛类型")
        div.dd
        el-form-item.s-flex_item(label="联系人" prop="contactor" label-width="140px")
          el-input(v-model="formModel.contactor")
      div.s-flex
        el-form-item.s-flex_item(label="联系人电话" prop="phone" label-width="140px")
          el-input(v-model="formModel.phone")
        div.dd
        el-form-item.s-flex_item(label="联系人邮箱" prop="email" label-width="140px")
          el-input(v-model="formModel.email")
      div.s-flex
        el-form-item.s-flex_item(label="征集开始时间" prop="collectionStartTime" label-width="140px")
          kalix-date-picker(v-model="formModel.collectionStartTime")
        div.dd
        el-form-item.s-flex_item(label="征集结束时间" prop="collectionEndTime" label-width="140px")
          // el-date-picker(v-model="collectionEndTime" type="date" placeholder="选择结束时间"  style="width:100%")
          kalix-date-picker(v-model="formModel.collectionEndTime")
      div.s-flex
        el-form-item.s-flex_item(label="初评开始时间" prop="preEvalStartTime" label-width="140px")
          // el-date-picker(v-model="preEvalStartTime" type="date" placeholder="选择开始时间" style="width:100%")
          kalix-date-picker(v-model="formModel.preEvalStartTime")
        div.dd
        el-form-item.s-flex_item(label="初评结束时间" prop="preEvalEndTime" label-width="140px")
          // el-date-picker(v-model="preEvalEndTime" type="date" placeholder="选择结束时间" style="width:100%")
          kalix-date-picker(v-model="formModel.preEvalEndTime")
      div.s-flex
        el-form-item.s-flex_item(label="终评开始时间" prop="lastEvalStartTime" label-width="140px")
          // el-date-picker(v-model="lastEvalStartTime" type="date" placeholder="选择开始时间" style="width:100%" )
          kalix-date-picker(v-model="formModel.lastEvalStartTime")
        div.dd
        el-form-item.s-flex_item(label="终评结束时间" prop="lastEvalEndTime" label-width="140px")
          // el-date-picker(v-model="lastEvalEndTime" type="date" placeholder="选择结束时间" style="width:100%" )
          kalix-date-picker(v-model="formModel.lastEvalEndTime")
      div.s-flex
        el-form-item.s-flex_item(label="作品内容要求" prop="contentNeed" label-width="140px")
          el-input(type="textarea" v-model="formModel.contentNeed")
        div.dd
        el-form-item.s-flex_item(label="作品技术要求" prop="technologyNeed" label-width="140px")
          el-input(type="textarea" v-model="formModel.technologyNeed")
      div.s-flex
        el-form-item.s-flex_item(label="详细信息" prop="detail" label-width="140px")
          el-input(type="textarea" v-model="formModel.detail")
        div.dd
        el-form-item.s-flex_item(label="备注" prop="remark" label-width="140px")
          el-input(type="textarea" v-model="formModel.remark")
      div.s-flex
        el-form-item.s-flex_item(label="报名表样式" prop="signupStyle" label-width="140px")
          kalix-upload(v-model="formModel.signupStyle" v-bind:isImage="false" v-bind:readonly="true")
</template>

<script type="text/ecmascript-6">
  import {FormModel} from './model.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {CompetitionInfoURL} from '../config.toml'
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
    created() {
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixDatePicker: DatePicker
    },
    methods: {},
    watch: {}
  }
</script>
<style scoped lang="stylus">
  .dd
    width 50px
</style>
