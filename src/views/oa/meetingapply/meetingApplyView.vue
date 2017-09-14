<!--
描述：人员管理-会议申请-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="meetapply"
  v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  ref="kalixBizDialog"
  v-bind:isView="readonly"
  )
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院会议申请表
      el-form-item(label="名称" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.orgName" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.meetingroomId" readonly)
      el-form-item(label="会议议题" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingTopic" readonly)
      el-form-item(label="会议议程" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingAgenda" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="开始时间" v-bind:label-width="labelWidth")
          el-input(v-bind:value="getDatetime(formModel.beginTime)" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="结束时间" v-bind:label-width="labelWidth")
          el-input(v-bind:value="getDatetime(formModel.endTime)" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="会议类型" v-bind:label-width="labelWidth")
          el-input(v-bind:value="getMeetingTypeName(formModel.meetingType)" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="会议纪要人员" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.meetingSummaryPersonName" readonly)
      el-form-item(label="重要出席人" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.importantAttendeesName" readonly)
      el-form-item(label="其他出席人" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.otherAttendeesName" readonly)
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserSelect from '@/components/biz/userselect/userselect'
  import Cache from 'common/cache'
  import {formatDate} from 'common/typeFormat'
  //  import {usersURL} from 'views/admin/config.toml'

  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        targetURL: '',
        readonly: true,
        meetingTypeName: ''
      }
    },
    created() {
      this.labelWidth = '110px'
      console.log('[meetingApplyView.vue created] this.formModel:', this.formModel)
      console.log('[meetingApplyView.vue created] this.formModel.meetingType', this.formModel.meetingType)
      this.getMeetingTypeName()
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect
    },
    methods: {
      getMeetingTypeName(meetingType) {
        const dict = JSON.parse(Cache.get('OA-DICT-KEY'))
        let item = dict.find(e => {
          return e.type === '会议类型' && e.value === meetingType
        })
        if (item) {
          return item.label
        }
        return ''
      },
      getDatetime(val) {
        let date = new Date(val)
        return formatDate(date, 'yyyy年MM月dd日 hh时mm分')
      }
    }
  }
</script>
