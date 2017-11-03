<!--
描述：办公自动化-会议室申请-add组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院会议室申请表
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth" prop="orgId" v-bind:rules="rules.orgId")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" v-bind:label-width="labelWidth" prop="targetDuty" v-bind:rules="rules.meetingroomId")
          kalix-meeting-room-select(v-model="formModel.meetingroomId")
      el-form-item(label="会议名称" v-bind:label-width="labelWidth" prop="meetingTopic" v-bind:rules="rules.meetingTopic")
        el-input(v-model="formModel.meetingTopic")
      el-form-item(label="宣传需求" v-bind:label-width="labelWidth" prop="requireType" v-bind:rules="rules.requireType")
        kalix-dict-select(v-model="formModel.requireType" appName="oa" dictType="会议需求类型")
      el-form-item(label="主持人" v-bind:label-width="labelWidth" prop="host" v-bind:rules="rules.host")
        el-input(v-model="formModel.host")
      el-form-item(label="会议日期" v-bind:label-width="labelWidth" prop="meetingDate" v-bind:rules="rules.meetingDate")
        kalix-date-picker(v-model="formModel.meetingDate")
      el-form-item(label="参会人员" v-bind:label-width="labelWidth" prop="participant" v-bind:rules="rules.participant")
        el-input(v-model="formModel.participant")
</template>

<script type="text/ecmascript-6">
  import {MeetingroomApplyURL} from '../config.toml'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import MeetingRoomSelect from '@/components/biz/select/MeetingRoomSelect'
  import DatePicker from '@/components/biz/date/datepicker'
  import FormModel from './model'

  export default {
    created() {
      this.labelWidth = '110px'
    },
    data() {
      return {
        targetURL: MeetingroomApplyURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          meetingTopic: [{required: true, message: '请输入会议名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          content: [{type: 'string', required: true, message: '请输入申请事由', trigger: 'blur'}],
          targetDuty: [{type: 'string', required: true, message: '请选择审批领导职务', trigger: 'change'}]
        }
      }
    },
    methods: {
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      }
    },
    components: {
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect,
      KalixMeetingRoomSelect: MeetingRoomSelect,
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    }
  }
</script>

<style scoped lang="stylus">

</style>
