<!--
描述：办公自动化-面试管理-新增组件
开发人：hqj
开发日期：2017年11月1日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="interview" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      template(v-if="formModel.whichInterview === 'first'")
        el-form-item.s-flex_item(label="应聘者姓名" prop="candidateId" v-bind:rules="rules.candidateId" v-bind:label-width="labelWidth")
          el-select(v-model='formModel.candidateId' v-bind:placeholder="candidate.placeholder" v-on:focus="focus")
            el-option(v-for="item in candidate.items" v-bind:key="item.candidateId" v-bind:label="item.xm" v-bind:value="item.candidateId")
        el-form-item.s-flex_item(label="初试时间" prop="dateFirst" v-bind:rules="rules.dateFirst" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.dateFirst" style="width:100%")
        el-form-item.s-flex_item(label="初试面试官" prop="interviewerFirst" v-bind:rules="rules.interviewerFirst" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.interviewerFirst")
        el-form-item.s-flex_item(label="初试面试内容" prop="interviewContentFirst" v-bind:rules="rules.interviewContentFirst" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.interviewContentFirst")
        el-form-item.s-flex_item(label="初试面试结果" prop="passFirst" v-bind:rules="rules.passFirst" v-bind:label-width="labelWidth")
          // el-checkbox(v-model="formModel.passFirst") 初试是否通过
          el-switch.s-flex_item(v-model="formModel.passFirst" active-text="通过" inactive-text="不通过")
      template(v-else-if="formModel.whichInterview === 'second' || formModel.whichInterview === 'review'")
        el-form-item.s-flex_item(label="应聘者姓名" prop="candidateId" v-bind:rules="rules.candidateId" v-bind:label-width="labelWidth")
          el-select(v-model='formModel.candidateId' v-bind:placeholder="candidate.placeholder" v-on:focus="focus")
            el-option(v-for="item in candidate.items" v-bind:key="item.candidateId" v-bind:label="item.xm" v-bind:value="item.candidateId")
        el-form-item.s-flex_item(label="复试时间" prop="dateSecond" v-bind:rules="rules.dateSecond" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.dateSecond" style="width:100%")
        el-form-item.s-flex_item(label="复试面试官" prop="interviewerSecond" v-bind:rules="rules.interviewerSecond" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.interviewerSecond")
        el-form-item.s-flex_item(label="复试面试内容" prop="interviewContentSecond" v-bind:rules="rules.interviewContentSecond" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.interviewContentSecond")
        el-form-item.s-flex_item(label="复试面试结果" prop="passSecond" v-bind:rules="rules.passSecond" v-bind:label-width="labelWidth")
          // el-checkbox(v-model="formModel.passSecond") 复试是否通过
          el-switch.s-flex_item(v-model="formModel.passSecond" active-text="通过" inactive-text="不通过")
      template(v-else)
        el-form-item.s-flex_item(label="应聘者姓名" prop="xm" v-bind:rules="rules.xm" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.xm" disabled)
        div.s-flex
          el-form-item.s-flex_item(label="初试时间" prop="dateFirst" v-bind:rules="rules.dateFirst" v-bind:label-width="labelWidth")
            kalix-date-picker(v-model="formModel.dateFirst" style="width:100%")
          el-form-item.s-flex_item(label="复试时间" prop="dateSecond" v-bind:rules="rules.dateSecond" v-bind:label-width="labelWidth")
            kalix-date-picker(v-model="formModel.dateSecond" style="width:100%")
        div.s-flex
          el-form-item.s-flex_item(label="初试面试官" prop="interviewerFirst" v-bind:rules="rules.interviewerFirst" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.interviewerFirst")
          el-form-item.s-flex_item(label="复试面试官" prop="interviewerSecond" v-bind:rules="rules.interviewerSecond" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.interviewerSecond")
        div.s-flex
          el-form-item.s-flex_item(label="初试面试内容" prop="interviewContentFirst" v-bind:rules="rules.interviewContentFirst" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.interviewContentFirst")
          el-form-item.s-flex_item(label="复试面试内容" prop="interviewContentSecond" v-bind:rules="rules.interviewContentSecond" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.interviewContentSecond")
        div.s-flex
          el-form-item.s-flex_item(label="初试面试结果" prop="passFirst" v-bind:rules="rules.passFirst" v-bind:label-width="labelWidth")
            // el-checkbox(v-model="formModel.passFirst") 初试是否通过
            el-switch.s-flex_item(v-model="formModel.passFirst" active-text="通过" inactive-text="不通过")
          el-form-item.s-flex_item(label="复试面试结果" prop="passSecond" v-bind:rules="rules.passSecond" v-bind:label-width="labelWidth")
            // el-checkbox(v-model="formModel.passSecond") 复试是否通过
            el-switch.s-flex_item(v-model="formModel.passSecond" active-text="通过" inactive-text="不通过")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {InterviewURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import Vue from 'vue'

  export default {
    data() {
      return {
        candidate: {
          placeholder: '请选择应聘者',
          items: [],
          isRequest: false
        },
        formModel: Object.assign({}, FormModel),
        rules: {
          candidateId: [{type: 'number', required: true, message: '请选择应聘者', trigger: 'change'}],
          dateFirst: [{required: true, message: '请选择初试时间', trigger: 'blur'}],
          interviewerFirst: [{required: true, message: '请输入初试面试官', trigger: 'blur'}],
          interviewContentFirst: [{required: true, message: '请输入初试面试内容', trigger: 'blur'}],
          dateSecond: [{required: true, message: '请选择复试时间', trigger: 'blur'}],
          interviewerSecond: [{required: true, message: '请输入复试面试官', trigger: 'blur'}],
          interviewContentSecond: [{required: true, message: '请输入复试面试内容', trigger: 'blur'}],
          xm: [{required: true, message: '应聘者不允许为空', trigger: 'blur'}]
        },
        targetURL: InterviewURL,
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    },
    methods: {
      focus() {
        if (!this.candidate.isRequest) {
          this.candidate.isRequest = true
          this.getCandidates()
          if (this.formModel.whichInterview === 'second') {
            this.formModel.whichInterview = 'review'
            this.formModel.dateFirst = null
            this.formModel.interviewerFirst = null
            this.formModel.interviewContentFirst = null
            this.formModel.passFirst = null
          }
        }
      },
      // 获取应聘者姓名数据
      getCandidates() {
        let getCandidateURL = '/camel/rest/candidatescheck/' + this.formModel.whichInterview
        let params = {
          params: {
            'header.type': this.formModel.whichInterview,
            'jsonStr': '',
            'limit': 50
          }
        }
        Vue.axios.get(getCandidateURL, params).then((response) => {
          this.candidate.items = response.data.data
        })
      }
    }
  }
</script>
