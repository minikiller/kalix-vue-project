<!--
描述：人员管理-会议申请-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="meetapply"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院会议申请表
      el-form-item(label="名称" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth")
          kalix-select(v-model="formModel.orgId" placeholder="请选择申请部门" style="width:100%"
          v-on:change="orgOnChange" appName="USERORGS")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" v-bind:label-width="labelWidth")
          kalix-select(v-model="formModel.meetingroomId" placeholder="请选择会议地点" style="width:100%"
          appName="MEETINGROOMS")
      el-form-item(label="会议议题" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingTopic")
      el-form-item(label="会议议程" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingAgenda")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="开始时间" v-bind:label-width="labelWidth")
          el-date-picker(v-model="beginTime" v-on:change="onBeginTimeChange" type="datetime" placeholder="选择开始时间" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="结束时间" v-bind:label-width="labelWidth")
          el-date-picker(v-model="endTime" v-on:change="onEndTimeChange" type="datetime" placeholder="选择结束时间" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="会议类型" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.meetingType" appName="oa" dictType="会议类型"
          style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议纪要人员" v-bind:label-width="labelWidth")
          kalix-user-select(v-bind:params="params" style="width:100%"
          v-on:userSelected="onMeetingSummaryPersonSelected"
          v-bind:defaultIds="formModel.meetingSummaryPerson"
          v-bind:defaultNames="formModel.meetingSummaryPersonName"
          v-bind:multiple="multiple"
          v-model="meetingSummaryPerson"
          placeholder="请输入会议纪要人员")
      el-form-item(label="重要出席人" v-bind:label-width="labelWidth")
        kalix-user-select(v-bind:params="params" style="width:100%"
        v-on:userSelected="onImportantAttendeesSelected"
        v-bind:defaultIds="formModel.importantAttendees"
        v-bind:defaultNames="formModel.importantAttendeesName"
        v-model="importantAttendees"
        v-bind:multiple="multiple"
        placeholder="请输入重要出席人")
      el-form-item(label="其他出席人" v-bind:label-width="labelWidth")
        kalix-user-select(v-bind:params="params" style="width:100%"
        v-on:userSelected="onOtherAttendeesSelected"
        v-bind:defaultIds="formModel.otherAttendees"
        v-bind:defaultNames="formModel.otherAttendeesName"
        v-model="otherAttendees"
        v-bind:multiple="multiple"
        placeholder="请输入其他出席人")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserSelect from '@/components/biz/userselect/userselect'
  import BaseSelect from '@/components/custom/baseSelect'
  //  import _ from 'underscore'
  import {MeetingApplyURL} from '../config.toml'
  //  import {isEmptyObject} from 'common/util'

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
        title: '吉林动画学院会议申请表',
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
        meetingSummaryPersonObj: [],
        importantAttendees: [],
        otherAttendees: []
      }
    },
    created() {
      this.labelWidth = '110px'
      console.log('%c[meetingApplyAdd.vue created] this.formModel:', 'color:#3f3fff', this.formModel)
      console.log('%c[meetingApplyAdd.vue created] this.formModel.title:', 'color:#3f3fff', this.formModel.title)
      if (!this.formModel.title) {
        this.formModel.title = this.title
      } else {
        let that = this
        setTimeout(() => {
          that.beginTime = that.formModel.beginTime
          that.endTime = that.formModel.endTime
        }, 20)
      }
//      console.log('%c[meetingApplyAdd.vue created] !this.formModel.endTime:', 'color:#f0be03', this.formModel.endTime)
    },
    mounted() {
      console.log('%c[meetingApplyAdd.vue mounted] this.formModel:', 'color:#f04adb', this.formModel)
      console.log('%c[meetingApplyAdd.vue mounted] this.formModel.title:', 'color:#f04adb', this.formModel.title)
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect,
      KalixSelect: BaseSelect
    },
    methods: {
      _getUsers(users) {
        let ids = []
        let names = []
        users.forEach(item => {
          ids.push(item.id)
          names.push(item.name)
        })
        return {ids: ids.join(','), names: names.join(',')}
      },
      onMeetingSummaryPersonSelected(items) {
        const users = this._getUsers(items)
        this.formModel.meetingSummaryPerson = users.ids
        this.formModel.meetingSummaryPersonName = users.names
      },
      onImportantAttendeesSelected(items) {
        const users = this._getUsers(items)
        this.formModel.importantAttendees = users.ids
        this.formModel.importantAttendeesName = users.names
      },
      onOtherAttendeesSelected(items) {
        const users = this._getUsers(items)
        this.formModel.otherAttendees = users.ids
        this.formModel.otherAttendeesName = users.names
      },
      orgOnChange(item) {
        this.formModel.orgName = item.name
      },
      onBeginTimeChange(value) {
        this.formModel.beginTime = value
        console.log('%c[meetingApplyAdd.vue] onBeginTimeChange:', 'color:#04fadb', value)
      },
      onEndTimeChange(value) {
        this.formModel.endTime = value
      }
    },
    watch: {
      tt(nv, ov) {
        console.log('%c[meetingApplyAdd.vue watch] this.tt nv:', 'color:#f04adb', nv)
        console.log('%c[meetingApplyAdd.vue watch] this.tt ov:', 'color:#f04adb', ov)
      }
    }
  }
</script>
