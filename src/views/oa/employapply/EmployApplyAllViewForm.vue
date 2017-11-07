<!--
描述：办公自动化-入职申请-查看组件
开发人：hqj
开发日期：2017年11月6日
-->

<template lang="pug">
  div.el-form.kalix-form-table
    div.table-title 吉林动画学院入职申请表
    | {{formModel.candidateId}}
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="名称" v-bind:label-width="labelWidth" prop="title")
        el-input(v-model="formModel.title" readonly)
      // el-form-item.s-flex_item.kalix-form-table-td(label=" 创建时间" prop="creationDate" v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.creationDate" style="width:100%" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.orgName" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="申请时间" prop="applyDate" v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.applyDate" style="width:100%" readonly)
    // div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="人员类别" prop="personCategory" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.personCategory|getDictName('OA','招聘人员类别')" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="应聘岗位" prop="position" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.position" readonly)
    // div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="xm" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.xm" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.sex|getDictName('OA','性别')" readonly)
    // div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="年龄" prop="age" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.age" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="联系电话" prop="tel" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.tel" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请人" prop="createBy" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.createBy" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="分院领导审批" prop="branchSchoolLeader" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.branchSchoolLeader" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="校领导审批" prop="schoolLeader" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.schoolLeader" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="人力资源部长签字" prop="manpower" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.manpower" readonly)
    div.table-title 应聘人员信息
    kalix-candidate-view-form(v-bind:formModel.sync="candidateFormModel" v-bind:isRequest="true" v-bind:bizId="formModel.candidateId")
    template(v-if="formModel.personCategory === 1")
      div.table-title 面试情况
      kalix-interview-view-form(v-bind:formModel.sync="interviewFormModel" v-bind:isRequest="true" v-bind:bizId="formModel.candidateId")
    template(v-else-if="formModel.personCategory === 2")
      div.table-title 面试情况
      kalix-interview-view-form(v-bind:formModel.sync="interviewFormModel" v-bind:isRequest="true" v-bind:bizId="formModel.candidateId")
      div.table-title 试讲情况-->
      kalix-lecture-view-form(v-bind:formModel.sync="lectureFormModel" v-bind:isRequest="true" v-bind:bizId="formModel.candidateId")
    template(v-else-if="formModel.personCategory === 3")
      div.table-title 试讲情况
      kalix-lecture-view-form(v-bind:formModel.sync="lectureFormModel" v-bind:isRequest="true" v-bind:bizId="formModel.candidateId")
</template>

<script type="text/ecmascript-6">
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'
  import candidateFormModel from '../candidate/model'
  import CandidateViewForm from '../candidate/CandidateViewForm.vue'
  import interviewFormModel from '../interview/model'
  import InterviewViewForm from '../interview/InterviewViewForm.vue'
  import lectureFormModel from '../lecture/model'
  import LectureViewForm from '../lecture/LectureViewForm.vue'

  export default {
    props: ['formModel'],
    data() {
      return {
        candidateFormModel: Object.assign({}, candidateFormModel),
        interviewFormModel: Object.assign({}, interviewFormModel),
        lectureFormModel: Object.assign({}, lectureFormModel),
        labelWidth: '130px'
      }
    },
    components: {
      KalixDateTimePicker: DateTimePicker,
      KalixCandidateViewForm: CandidateViewForm,
      KalixInterviewViewForm: InterviewViewForm,
      KalixLectureViewForm: LectureViewForm
    }
  }
</script>
