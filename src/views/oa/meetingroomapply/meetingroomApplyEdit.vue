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
      div.s-flex_item
        el-form-item(label="使用时间" v-bind:label-width="labelWidth" prop="meetingDate" v-bind:rules="rules.meetingDate")
          div.s-flex
            div.s-flex_item
              el-date-picker(v-model="meetingDate" placeholder="选择会议日期" v-bind:editable="false" v-on:change="getMeetingDate")
            div.s-flex_item.no-link
              el-form-item(label="" v-bind:label-width="labelWidth0"  prop="beginTime" v-bind:rules="rules.beginTime" )
                el-time-picker(v-model="beginTime" placeholder="选择开始时间" style="margin-left:1px;width:180px"  v-bind:editable="false" v-on:change="getStartTime")
            div.s-flex_item.no-link
              el-form-item(label="" v-bind:label-width="labelWidth0"  prop="endTime" v-bind:rules="rules.endTime")
                el-time-picker(v-model="endTime" placeholder="选择结束时间" style="width:180px" v-bind:editable="false" v-on:change="getEndTime")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="参会人员" v-bind:label-width="labelWidth" prop="participant" v-bind:rules="rules.participant")
          el-input-number(v-model="formModel.participant" v-bind:min="1" v-bind:max="10" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="宣传需求" v-bind:label-width="labelWidth" prop="requireType" v-bind:rules="rules.requireType")
          kalix-dict-select(v-model="formModel.requireType" appName="oa" dictType="会议需求类型" style="width:100%")
      el-form-item(label="主持人" v-bind:label-width="labelWidth" prop="host" v-bind:rules="rules.host")
        el-input(v-model="formModel.host")
      el-form-item(label="是否周历" v-bind:label-width="labelWidth" prop="weekCalander" )
        el-radio-group(v-model="formModel.weekCalander")
          el-radio(label="是")
          el-radio(label="否")
</template>

<script type="text/ecmascript-6">
  import {MeetingroomApplyURL} from '../config.toml'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import MeetingRoomSelect from '@/components/biz/select/MeetingRoomSelect'
  import FormModel from './model'
  import {formatDate} from 'common/typeFormat'

  export default {
    created() {
      this.labelWidth = '110px'
      this.labelWidth0 = '0px'
    },
    data() {
      var validateMeetingDate = (rule, value, callback) => {
        if (this.meetingDate === '' || this.meetingDate === null) {
          callback(new Error('请选择会议日期'))
        } else {
          this.meetingDateOK = true
          callback()
        }
      }
      var validateBeginTime = (rule, value, callback) => {
        if (this.beginTime === '' || this.beginTime === null) {
          callback(new Error('请选择开始时间'))
        } else {
          this.beginTimeOK = true
          callback()
        }
      }
      var validateEndTime = (rule, value, callback) => {
        if (this.endTime === '' || this.endTime === null) {
          callback(new Error('请选择结束时间'))
        } else if (this.beginTime >= this.endTime) {
          callback(new Error('结束时间需大于开始时间'))
        } else if (this.meetingDateOK && this.beginTimeOK) {
          this.axios.get(MeetingroomApplyURL, {}).then(response => {
            this.meetingRoomApplyList = response.data.data
            let tempDate = ''
            let tempDate2 = ''
            let hasConfic = false
            for (let i = 0; i < this.meetingRoomApplyList.length; i++) {
              tempDate = formatDate(new Date(this.meetingRoomApplyList[i].meetingDate), 'yyyy-MM-dd ')
              tempDate2 = formatDate(new Date(this.meetingDate), 'yyyy-MM-dd ')
              console.log('tempDate', tempDate)
              console.log('tempDate2', tempDate2)
              if (this.meetingRoomApplyList[i].status !== 0) {
                if (tempDate2 === tempDate) {
                  console.log('endTimeOK is ok')
                  if (formatDate(new Date(this.endTime), 'hh:mm:ss ') <= this.meetingRoomApplyList[i].beginTime) {
                  } else if (formatDate(new Date(this.beginTime), 'hh:mm:ss ') >= this.meetingRoomApplyList[i].endTime) {
                  } else {
                    hasConfic = true
                    this.openMessage(this.meetingRoomApplyList[i].beginTime, this.meetingRoomApplyList[i].endTime)
                    callback(new Error('会议时间与其他会议冲突'))
                  }
                } else {
                }
              } else {
              }
            }
            if (!hasConfic) {
              callback()
            }
          })
        }
      }
      return {
        targetURL: MeetingroomApplyURL,
        formModel: Object.assign({}, FormModel),
        beginTime: '',
        endTime: '',
        meetingDate: '',
        meetingDateOK: false,
        beginTimeOK: false,
        meetingRoomApplyList: [],
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          meetingTopic: [{required: true, message: '请输入会议名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          content: [{type: 'string', required: true, message: '请输入申请事由', trigger: 'blur'}],
          targetDuty: [{type: 'string', required: true, message: '请选择审批领导职务', trigger: 'change'}],
          participant: [{type: 'number', required: true, message: '请选择参会人数', trigger: 'change'}],
          meetingDate: [
            {required: true, type: 'date', validator: validateMeetingDate, trigger: 'change'}
          ],
          beginTime: [
            {required: true, type: 'date', validator: validateBeginTime, trigger: 'change'}
          ],
          endTime: [
            {required: true, type: 'date', validator: validateEndTime, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      init(dialogOption) {
        this.beginTime = dialogOption.row.beginTimeStr
        this.endTime = dialogOption.row.endTimeStr
        this.meetingDate = dialogOption.row.meetingDateStr
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
      validateField: function validateField(prop, cb) {
//        var field = this.fields.filter(function (field) {
//          return field.prop === prop;
//        })[0];
//        if (!field) {
//          throw new Error('must call validateField with valid prop string!');
//        }
//
//        field.validate('', cb);cb
      }
//      listen(newVal, oldVal) {
//        console.log('223222222222222333333333', newVal.endTime)
//      }
    },
    components: {
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect,
      KalixMeetingRoomSelect: MeetingRoomSelect,
      KalixDialog: Dialog
    }
//    watch: {
//      formModel: {
//        handler: 'listen',
//        // 深度观察
//        deep: true
//      }
//    }
  }
</script>

<style lang="stylus">
  .no-link
    .el-form-item
      .el-form-item__content
        border-left 0 !important
</style>
