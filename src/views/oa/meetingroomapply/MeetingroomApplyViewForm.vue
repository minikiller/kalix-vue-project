<!--
描述：人员管理-会议室申请-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院会议室申请表
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="名称" prop="title" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="创建时间" prop="creationDate" v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.creationDate" style="width:100%" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.orgName" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="申请时间" prop="applyDate" v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.applyDate" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="会议时间" prop="meetingDate" v-bind:label-width="labelWidth")
        | &nbsp;&nbsp {{formModel.meetingDateStr}} {{formModel.beginTimeStr}} - {{formModel.endTimeStr}}
      el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" prop="meetingroomName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.meetingroomName" readonly)
    el-form-item(label="会议名称" prop="meetingTopic" v-bind:label-width="labelWidth")
      el-input(v-model="formModel.meetingTopic" readonly)
    el-form-item(label="会议内容" prop="meetingAgenda" v-bind:label-width="labelWidth")
      el-input(v-model="formModel.meetingAgenda" type="textarea" v-bind:rows="3" readonly)
    el-form-item(label="参会人员" prop="participant" v-bind:label-width="labelWidth")
      el-input(v-model="formModel.participant" type="textarea" v-bind:rows="2" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="主持人" prop="host" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.host" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="参会人数" prop="attendance" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.attendance" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="协调人" prop="securityPerson" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.securityPerson" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="协调人电话" prop="securityTel" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.securityTel" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请人电话" prop="operatorPhone" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.operatorPhone" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="宣传需求" prop="requireType" v-bind:label-width="labelWidth")
        <!--kalix-dict-select(v-model="formModel.requireType" appName="oa" dictType="会议需求类型" )-->
        el-input(v-bind:value="formModel.requireType|getDictName('OA','会议需求类型')" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="是否周历" prop="weekCalander" v-bind:label-width="labelWidth")
        div(style="text-align:center")
          el-switch(v-model="formModel.weekCalander" active-text="是" inactive-text="否" disabled)
      el-form-item.s-flex_item.kalix-form-table-td(label="设备要求" prop="equipmentRequirement" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.equipmentRequirement" readonly)
    template(v-if="formModel.weekCalander")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学年" prop="schoolYear" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.schoolYear" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="学期" prop="term" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.term" readonly)
      el-form-item(label="学周" prop="week" v-bind:label-width="labelWidth")
        <!--kalix-dict-select(v-model="formModel.week" appName="oa" dictType="学周")-->
        el-input(v-bind:value="formModel.week|getDictName('OA','学周')" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="行政事务办主管" prop="schoolAdminUser" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.schoolAdminUser" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="校务部" prop="schoolUser" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.schoolUser" readonly)
</template>

<script type="text/ecmascript-6">
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'
//  import BaseDictSelect from '@/components/custom/baseDictSelect'

  export default {
    props: ['formModel'],
    data() {
      return {
        labelWidth: '110px'
      }
    },
    components: {
      KalixDateTimePicker: DateTimePicker
//      KalixDictSelect: BaseDictSelect
    },
    methods: {}
  }
</script>
