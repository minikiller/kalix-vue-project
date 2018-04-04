<!--
描述：办公自动化-会议室申请-add组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院会议室申请表
      el-form-item(label="名称" prop="title" v-bind:rules="rules.title" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgId" v-bind:rules="rules.orgId" v-bind:label-width="labelWidth")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" prop="meetingroomId" v-bind:rules="rules.meetingroomId" v-bind:label-width="labelWidth")
          kalix-meeting-room-select(v-model="formModel.meetingroomId")
      div.s-flex
        el-form-item(label="会议时间" prop="meetingDate" v-bind:rules="rules.meetingDate" v-bind:label-width="labelWidth")
          div.s-flex
            div.s-flex_item
              <!--kalix-date-picker(v-model="meetingDate" placeholder="选择会议日期" v-bind:editable="false" v-on:change="getMeetingDate")-->
              el-date-picker(v-model="meetingDate" placeholder="选择会议日期" v-bind:editable="false" v-on:change="getMeetingDate")
            div.s-flex_item.no-link
              el-form-item(label="" prop="beginTime" v-bind:rules="rules.beginTime" v-bind:label-width="labelWidth0")
                el-time-picker(v-model="beginTime" placeholder="选择开始时间" v-bind:editable="false" v-on:change="getStartTime" style="margin-left:1px;width:180px")
            div.s-flex_item.no-link
              el-form-item(label="" prop="endTime" v-bind:rules="rules.endTime" v-bind:label-width="labelWidth0")
                el-time-picker(v-model="endTime" placeholder="选择结束时间" v-bind:editable="false" v-on:change="getEndTime" style="width:180px")
      el-form-item(label="会议名称" prop="meetingTopic" v-bind:rules="rules.meetingTopic" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingTopic")
      el-form-item(label="会议内容" prop="meetingAgenda" v-bind:rules="rules.meetingAgenda" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingAgenda" type="textarea" v-bind:rows="3")
      el-form-item(label="参会人员" prop="participant" v-bind:rules="rules.participant" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.participant" type="textarea" v-bind:rows="2")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="主持人" prop="host" v-bind:rules="rules.host" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.host")
        el-form-item.s-flex_item.kalix-form-table-td(label="参会人数" prop="attendance" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.attendance" v-bind:min="1" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="协调人" prop="securityPerson" v-bind:rules="rules.securityPerson" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.securityPerson")
        el-form-item.s-flex_item.kalix-form-table-td(label="协调人电话" prop="securityTel" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.securityTel")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请人电话" prop="operatorPhone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.operatorPhone")
        el-form-item.s-flex_item.kalix-form-table-td(label="宣传需求" prop="requireType" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.requireType" appName="oa" dictType="会议需求类型")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="是否周历" prop="weekCalander" v-bind:label-width="labelWidth")
          div(style="text-align:center")
            el-switch.s-flex_item(v-model="formModel.weekCalander" active-text="是" inactive-text="否" v-on:change="switchChange")
        el-form-item.s-flex_item.kalix-form-table-td(label="设备要求" prop="equipmentRequirement" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.equipmentRequirement")
      template(v-if="formModel.weekCalander")
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="学年" prop="schoolYear" v-bind:rules="rules.schoolYear" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.schoolYear" disabled)
          el-form-item.s-flex_item.kalix-form-table-td(label="学期" prop="term" v-bind:rules="rules.term" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.term" disabled)
        el-form-item(label="学周" prop="week" v-bind:rules="rules.week" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.week" appName="oa" dictType="学周")
</template>

<script type="text/ecmascript-6">
  import {MeetingroomApplyURL} from '../config.toml'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import MeetingRoomSelect from '@/components/biz/select/MeetingRoomSelect'
  import DatePicker from '@/components/biz/date/datepicker'
  import FormModel from './model'
  import {formatDate} from 'common/typeFormat'

  export default {
    data() {
      var validateMeetingDate = (rule, value, callback) => {
        if (this.meetingDate === '' || this.meetingDate === null) {
          callback(new Error('请选择会议日期'))
        } else {
          callback()
        }
      }
      var validateBeginTime = (rule, value, callback) => {
        if (this.beginTime === '' || this.beginTime === null) {
          callback(new Error('请选择开始时间'))
        } else {
          callback()
        }
      }
      var validateEndTime = (rule, value, callback) => {
        if (!this.formModel.meetingroomId) {
          this.endTime = ''
          callback(new Error('请先选择会议地点！'))
          return
        }
        if (this.meetingDate === '' || this.meetingDate === null) {
          this.endTime = ''
          callback(new Error('请先选择会议日期！'))
          return
        }
        if (this.beginTime === '' || this.beginTime === null) {
          this.endTime = ''
          callback(new Error('请先选择开始时间！'))
          return
        }
        if (this.endTime === '' || this.endTime === null) {
          callback(new Error('请选择结束时间'))
        } else if (this.beginTime >= this.endTime) {
          callback(new Error('结束时间需大于开始时间'))
        } else {
          const _data = {
            jsonStr: {'meetingroomId': this.formModel.meetingroomId, 'meetingDateStr': this.formModel.meetingDateStr},
            page: 1,
            start: 0,
            limit: 200,
            sort: ''
          }
          this.axios.get(MeetingroomApplyURL, {params: _data}).then(response => {
            this.meetingRoomApplyList = response.data.data
            let tempDate = ''
            let tempDate2 = ''
            let hasConfic = false
            for (let i = 0; i < this.meetingRoomApplyList.length; i++) {
              tempDate = formatDate(new Date(this.meetingRoomApplyList[i].meetingDate), 'yyyy-MM-dd ')
              tempDate2 = formatDate(new Date(this.meetingDate), 'yyyy-MM-dd ')
              console.log('tempDate', tempDate)
              console.log('tempDate2', tempDate2)
              if (this.meetingRoomApplyList[i].status !== 3) { // 非中止的
                // 缺少条件非(status===2（结束）且 流程结果不同意)
                if (tempDate2 === tempDate) {
                  console.log('endTimeOK is ok')
                  if (formatDate(new Date(this.endTime), 'hh:mm:ss ') <= this.meetingRoomApplyList[i].beginTime) {
                  } else if (formatDate(new Date(this.beginTime), 'hh:mm:ss ') >= this.meetingRoomApplyList[i].endTime) {
                  } else {
                    hasConfic = true
                    this.openMessage(this.meetingRoomApplyList[i].beginTime, this.meetingRoomApplyList[i].endTime)
                    callback(new Error('会议时间与其他会议冲突'))
                  }
                }
              }
            }
            if (!hasConfic) {
              callback()
            }
          })
        }
      }
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          meetingroomId: [{type: 'number', required: true, message: '请选择会议地点', trigger: 'change'}],
          meetingDate: [{type: 'date', required: true, validator: validateMeetingDate, trigger: 'change'}],
          beginTime: [{type: 'date', required: true, validator: validateBeginTime, trigger: 'change'}],
          endTime: [{type: 'date', required: true, validator: validateEndTime, trigger: 'change'}],
          meetingTopic: [{required: true, message: '请输入会议名称', trigger: 'blur'}],
          meetingAgenda: [{required: true, message: '请输入会议内容', trigger: 'blur'}],
          participant: [{required: true, message: '请输入参会人员', trigger: 'blur'}],
          host: [{required: true, message: '请输入主持人', trigger: 'blur'}],
          securityPerson: [{required: true, message: '请输入协调人', trigger: 'blur'}],
          schoolYear: [{required: true, message: '学年不能为空', trigger: 'blur'}],
          term: [{required: true, message: '学期不能为空', trigger: 'blur'}],
          week: [{type: 'number', required: true, message: '请选择学周', trigger: 'change'}]
        },
        targetURL: MeetingroomApplyURL,
        beginTime: '',
        endTime: '',
        meetingDate: '',
        meetingRoomApplyList: [],
        labelWidth: '110px',
        labelWidth0: '0px'
      }
    },
    components: {
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect,
      KalixMeetingRoomSelect: MeetingRoomSelect,
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    },
    created() {
    },
    //    watch: {
//      formModel: {
//        handler: 'listen',
//        // 深度观察
//        deep: true
//      }
//    },
    methods: {
      init(dialogOptions, row) {
        // 编辑查看
        if (row) {
          this.meetingDate = row.meetingDateStr
          this.beginTime = new Date(this.meetingDate + ' ' + row.beginTimeStr)
          this.endTime = new Date(this.meetingDate + ' ' + row.endTimeStr)
        } else { // 新增
          this.meetingDate = ''
          this.beginTime = ''
          this.endTime = ''
        }
      },
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      },
      getStartTime(val) {
        this.formModel.beginTime = formatDate(new Date(val), 'hh:mm:ss')
        this.formModel.beginTimeStr = formatDate(new Date(val), 'hh:mm:ss')
      },
      getEndTime(val) {
        this.formModel.endTime = formatDate(new Date(val), 'hh:mm:ss')
        this.formModel.endTimeStr = formatDate(new Date(val), 'hh:mm:ss')
      },
      getMeetingDate(val) {
        let meetingDate = formatDate(new Date(val), 'yyyy-MM-dd')
        this.formModel.meetingDate = meetingDate + ' 00:00:00'
        this.formModel.meetingDateStr = meetingDate
      },
      openMessage(val1, val2) {
        this.$alert('已存在' + val1 + '—' + val2 + '时段的会议！', '冲突信息', {
          confirmButtonText: '确定'
        })
      },
      switchChange(newStatus) {
        if (newStatus) {
          let nowDate = new Date()
          let nowYear = nowDate.getFullYear()
          let nowMonth = nowDate.getMonth() + 1
          if (nowMonth > 1 && nowMonth < 8) {
            this.formModel.schoolYear = (nowYear - 1).toString() + '-' + nowYear.toString() + '学年'
            this.formModel.term = '第二学期'
          } else {
            if (nowMonth > 7) {
              this.formModel.schoolYear = nowYear.toString() + '-' + (nowYear + 1).toString() + '学年'
            } else {
              this.formModel.schoolYear = (nowYear - 1).toString() + '-' + nowYear.toString() + '学年'
            }
            this.formModel.term = '第一学期'
          }
        } else {
          this.formModel.schoolYear = ''
          this.formModel.term = ''
          this.formModel.week = null
        }
      }
    }
  }
</script>

<style lang="stylus">
  .no-link
    .el-form-item
      .el-form-item__content
        border-left 0 !important
</style>
