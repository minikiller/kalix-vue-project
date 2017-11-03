<!--
描述：办公自动化-试讲管理-新增组件
开发人：hqj
开发日期：2017年11月2日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="interview" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      template(v-if="formModel.whichInterview === 'lecture'")
        div.s-flex
          div.s-flex_item
            el-form-item(label="应聘者姓名" prop="candidateId" v-bind:rules="rules.candidateId" v-bind:label-width="labelWidth")
              el-select(v-model='formModel.candidateId' v-bind:placeholder="candidate.placeholder" v-on:focus="focus" style="width:100%;")
                el-option(v-for="item in candidate.items" v-bind:key="item.candidateId" v-bind:label="item.xm" v-bind:value="item.candidateId")
            el-form-item(label="试讲题目" prop="subject" v-bind:rules="rules.subject" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.subject")
          el-form-item.s-flex_item(label="问题及回答" prop="qa" v-bind:rules="rules.qa" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.qa" type="textarea" v-bind:rows=4)
        div.s-flex
          div.s-flex_item
            el-form-item(label="授课内容" prop="content" v-bind:rules="rules.content" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.content")
            el-form-item(label="教学论点分数" prop="argumentScore" v-bind:label-width="labelWidth")
              el-input-number(v-model="formModel.argumentScore" style="width:100%")
          el-form-item.s-flex_item(label="评语" prop="comment" v-bind:rules="rules.comment" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.comment" type="textarea" v-bind:rows=4)
        div.s-flex
          div.s-flex_item
            el-form-item(label="板书或课件分数" prop="coursewareScore" v-bind:label-width="labelWidth")
              el-input-number(v-model="formModel.coursewareScore" style="width:100%")
            el-form-item(label="语言表达分数" prop="expressionScore" v-bind:label-width="labelWidth")
              el-input-number(v-model="formModel.expressionScore" style="width:100%")
          el-form-item.s-flex_item(label="聘用意见" prop="suggestion" v-bind:rules="rules.suggestion" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.suggestion" type="textarea" v-bind:rows=4)
        div.s-flex
          el-form-item.s-flex_item(label="教态分数" prop="attitudeScore" v-bind:label-width="labelWidth")
            el-input-number(v-model="formModel.attitudeScore" style="width:100%")
          el-form-item.s-flex_item(label="听课人" prop="participant" v-bind:rules="rules.participant" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.participant")
        div.s-flex
          el-form-item.s-flex_item(label="教学效果分数" prop="effectScore" v-bind:label-width="labelWidth")
            el-input-number(v-model="formModel.effectScore" style="width:100%")
          el-form-item.s-flex_item(label="试讲结果" prop="pass" v-bind:label-width="labelWidth")
            // el-checkbox(v-model="formModel.pass") 是否通过
            el-switch.s-flex_item(v-model="formModel.pass" active-text="通过" inactive-text="不通过")
      template(v-else)
        div.s-flex
          div.s-flex_item
            el-form-item(label="应聘者姓名" prop="xm" v-bind:rules="rules.xm" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.xm" disabled)
            el-form-item(label="试讲题目" prop="subject" v-bind:rules="rules.subject" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.subject")
          el-form-item.s-flex_item(label="问题及回答" prop="qa" v-bind:rules="rules.qa" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.qa" type="textarea" v-bind:rows=4)
        div.s-flex
          div.s-flex_item
            el-form-item(label="授课内容" prop="content" v-bind:rules="rules.content" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.content")
            el-form-item(label="教学论点分数" prop="argumentScore" v-bind:label-width="labelWidth")
              el-input-number(v-model="formModel.argumentScore" style="width:100%")
          el-form-item.s-flex_item(label="评语" prop="comment" v-bind:rules="rules.comment" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.comment" type="textarea" v-bind:rows=4)
        div.s-flex
          div.s-flex_item
            el-form-item(label="板书或课件分数" prop="coursewareScore" v-bind:label-width="labelWidth")
              el-input-number(v-model="formModel.coursewareScore" style="width:100%")
            el-form-item(label="语言表达分数" prop="expressionScore" v-bind:label-width="labelWidth")
              el-input-number(v-model="formModel.expressionScore" style="width:100%")
          el-form-item.s-flex_item(label="聘用意见" prop="suggestion" v-bind:rules="rules.suggestion" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.suggestion" type="textarea" v-bind:rows=4)
        div.s-flex
          el-form-item.s-flex_item(label="教态分数" prop="attitudeScore" v-bind:label-width="labelWidth")
            el-input-number(v-model="formModel.attitudeScore" style="width:100%")
          el-form-item.s-flex_item(label="听课人" prop="participant" v-bind:rules="rules.participant" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.participant")
        div.s-flex
          el-form-item.s-flex_item(label="教学效果分数" prop="effectScore" v-bind:label-width="labelWidth")
            el-input-number(v-model="formModel.effectScore" style="width:100%")
          el-form-item.s-flex_item(label="试讲结果" prop="pass" v-bind:rules="rules.pass" v-bind:label-width="labelWidth")
            // el-checkbox(v-model="formModel.pass") 是否通过
            el-switch.s-flex_item(v-model="formModel.pass" active-text="通过" inactive-text="不通过")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {LectureURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
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
          subject: [{required: true, message: '请输入试讲题目', trigger: 'blur'}],
          content: [{required: true, message: '请输入授课内容', trigger: 'blur'}],
          // argumentScore: [{type: 'number', required: true, message: '请输入教学论点分数', trigger: 'blur'}],
          // coursewareScore: [{type: 'number', required: true, message: '请输入板书或课件分数', trigger: 'blur'}],
          // expressionScore: [{type: 'number', required: true, message: '请输入语言表达分数', trigger: 'blur'}],
          // attitudeScore: [{type: 'number', required: true, message: '请输入教态分数', trigger: 'blur'}],
          // effectScore: [{type: 'number', required: true, message: '请输入教学效果分数', trigger: 'blur'}],
          qa: [{required: true, message: '请输入问题及回答', trigger: 'blur'}],
          comment: [{required: true, message: '请输入评语', trigger: 'blur'}],
          suggestion: [{required: true, message: '请输入聘用意见', trigger: 'blur'}],
          participant: [{required: true, message: '请输入听课人', trigger: 'blur'}],
          xm: [{required: true, message: '应聘者不允许为空', trigger: 'blur'}]
        },
        targetURL: LectureURL,
        labelWidth: '130px'
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      focus() {
        if (!this.candidate.isRequest) {
          this.candidate.isRequest = true
          this.getCandidates()
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
