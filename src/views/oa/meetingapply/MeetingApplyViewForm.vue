<template lang="pug">
  div.kalix-form-table
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
  import {formatDate} from 'common/typeFormat'
  import Cache from 'common/cache'

  export default {
    props: ['formModel'],
    created() {
      this.labelWidth = '110px'
      this.getMeetingTypeName()
    },
    methods: {
      getDatetime(val) {
        let date = new Date(val)
        return formatDate(date, 'yyyy年MM月dd日 hh时mm分')
      },
      getMeetingTypeName(meetingType) {
        const dict = JSON.parse(Cache.get('OA-DICT-KEY'))
        let item = dict.find(e => {
          return e.type === '会议类型' && e.value === meetingType
        })
        if (item) {
          return item.label
        }
        return ''
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
