<!--
描述：人员管理-会议室申请-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院会议室申请表
    el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title")
      el-input(v-model="formModel.title" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth" prop="orgId")
        kalix-org-select(v-model="formModel.orgId"  readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" v-bind:label-width="labelWidth" prop="targetDuty")
        kalix-meeting-room-select(v-model="formModel.meetingroomId" readonly)
    el-form-item(label="会议名称" v-bind:label-width="labelWidth" prop="meetingTopic")
      el-input(v-model="formModel.meetingTopic" readonly)
    div.s-flex_item
      el-form-item(label="使用时间" v-bind:label-width="labelWidth" prop="meetingDate")
        div.s-flex
          div.s-flex_item
            kalix-date-picker(v-model="formModel.meetingDate" placeholder="选择会议日期" v-bind:editable="false" readonly)
          div.s-flex_item.no-link
            el-form-item(label="" v-bind:label-width="labelWidth0"  prop="beginTime")
              el-time-picker(v-model="formModel.beginTime" style="margin-left:1px;width:180px"   readonly)
          div.s-flex_item.no-link
            el-form-item(label="" v-bind:label-width="labelWidth0"  prop="endTime")
              el-time-picker(v-model="formModel.endTime" placeholder="选择结束时间" style="width:180px"  readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="参会人员" v-bind:label-width="labelWidth" prop="participant" )
        el-input-number(v-model="formModel.participant" v-bind:min="1" v-bind:max="10" style="width:100%" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="宣传需求" v-bind:label-width="labelWidth" prop="requireType" )
        kalix-dict-select(v-model="formModel.requireType" appName="oa" dictType="会议需求类型" style="width:100%" readonly)
    el-form-item(label="主持人" v-bind:label-width="labelWidth" prop="host")
      el-input(v-model="formModel.host" readonly)
</template>

<script type="text/ecmascript-6">
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import MeetingRoomSelect from '@/components/biz/select/MeetingRoomSelect'
  import DatePicker from '@/components/biz/date/datepicker'
  export default {
    props: ['formModel'],
    data() {
      return {
        targetURL: '',
        readonly: true,
        meetingTypeName: ''
      }
    },
    created() {
      this.labelWidth = '110px'
      this.labelWidth0 = '0px'
    },
    components: {
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect,
      KalixMeetingRoomSelect: MeetingRoomSelect,
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker      // KalixDictSelect: BaseDictSelect
    },
    methods: {}
  }
</script>
