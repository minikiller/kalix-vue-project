<!--
描述：人员管理-会议申请-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="meetapply" ref="kalixBizDialog"
  v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院会议申请表
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth")
          el-select(v-model="formModel.orgId" placeholder="请选择申请部门" style="width:100%")
            el-option(v-for="item in orgNameOptions" v-bind:key="item.id" v-bind:label="item.name" v-bind:value="item.id")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" v-bind:label-width="labelWidth")
          el-select(v-model="formModel.meetingroomId" placeholder="请选择会议地点" style="width:100%")
            el-option(v-for="item in meetingRoomOptions" v-bind:key="item.id"
            v-bind:label="item.name"
            v-bind:value="item.id")
      el-form-item(label="会议议题" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingTopic")
      el-form-item(label="会议议程" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingAgenda")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="开始时间" v-bind:label-width="labelWidth")
          el-date-picker(v-model="beginTime" type="datetime" placeholder="选择开始时间" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="结束时间" v-bind:label-width="labelWidth")
          el-date-picker(v-model="endTime" type="datetime" placeholder="选择结束时间" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="会议类型" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.meetingType" appName="oa" dictType="会议类型"
          style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议纪要人员" v-bind:label-width="labelWidth")
          kalix-user-select(v-bind:params="params" style="width:100%"
          v-model="meetingSummaryPerson" v-bind:multiple="multiple" placeholder="请输入会议纪要人员")
      el-form-item(label="重要出席人" v-bind:label-width="labelWidth")
        kalix-user-select(v-bind:params="params" style="width:100%"
        v-model="importantAttendees" v-bind:multiple="multiple" placeholder="请输入重要出席人")
      el-form-item(label="其他出席人" v-bind:label-width="labelWidth")
        kalix-user-select(v-bind:params="params" style="width:100%"
        v-model="otherAttendees" v-bind:multiple="multiple" placeholder="请输入其他出席人")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserSelect from '@/components/biz/userselect/userselect'
  import Cache from 'common/cache'
  import {MeetingApplyURL} from '../config.toml'
  import {formatDate} from 'common/typeFormat'

  const DATE_FORMAT_STRING = 'yyyy-MM-dd hh:mm:ss'
  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        params: {},
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        targetURL: MeetingApplyURL,
        multiple: true,
        orgName: '',
        orgNameOptions: [],
        beginTime: '',
        endTime: '',
        meetingRoom: '',
        meetingRoomOptions: [],
        meetingSummaryPerson: [],
        importantAttendees: [],
        otherAttendees: []
      }
    },
    created() {
      console.log('[meetingApplyAdd.vue created] this.formModel:', this.formModel)
      this.labelWidth = '110px'
      this.meetingRoomOptions = JSON.parse(Cache.get(`${'MeetingRooms'.toUpperCase()}-KEY`))
      this.orgNameOptions = JSON.parse(Cache.get(`${'UserOrgs'.toUpperCase()}-KEY`))
      console.log('[this.formModel.meetingroomId]', this.formModel.meetingroomId)
//      this.meetingRoom = this.formModel.meetingroomId
    },
    methond() {
      this.formModel.title = '吉林动画学院会议申请表'
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect
    },
    methods: {},
    watch: {
      beginTime(newValue) {
        this.formModel.beginTime = formatDate(newValue, DATE_FORMAT_STRING)
      },
      endTime(newValue) {
        this.formModel.endTime = formatDate(newValue, DATE_FORMAT_STRING)
      },
      orgName(newValue) {
        this.formModel.orgId = newValue
        let item = this.orgNameOptions.find(e => {
          return e.id === newValue
        })
        this.formModel.orgName = item.name
      },
      meetingSummaryPerson(newValue) {
        this.formModel.meetingSummaryPerson = newValue.join(',')
      },
      importantAttendees(newValue) {
        this.formModel.importantAttendees = newValue.join(',')
      },
      otherAttendees(newValue) {
        this.formModel.otherAttendees = newValue.join(',')
      }
    }
  }
</script>

<style lang="stylus">

  borderStyle = 1px solid #000000

  .kalix-form-table
    border 1px solid #000000
    & > div
      border-bottom borderStyle
      &:last-child
        border-bottom 0
    .table-title
      text-align center
      font-size 18px
      font-weight bold
      padding 10px 0px
    .el-form-item
      margin-bottom 0
      .el-form-item__label
        border-right borderStyle
      .el-input__inner
        border 0
    .kalix-form-table-td
      border-left borderStyle
      &:first-child
        border-left none
</style>
