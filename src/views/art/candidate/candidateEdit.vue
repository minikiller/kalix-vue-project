<!--
描述：艺术中心-招聘管理-学生应聘-编辑组件
开发人：hqj
开发日期：2017年12月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="artCandidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 个人基本信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学号" prop="code" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.code" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name" disabled)
      div.table-title 应聘信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="工作省份" prop="region" v-bind:rules="rules.region" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.region" appName="art" dictType="省份")
        el-form-item.s-flex_item.kalix-form-table-td(label="工作城市" prop="city" v-bind:rules="rules.city" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.city")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="期望行业" prop="expectingIndustry" v-bind:rules="rules.expectingIndustry" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.expectingIndustry" appName="art" dictType="企业行业")
        el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.jobType" appName="art" dictType="工作类型")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="期望岗位" prop="position" v-bind:rules="rules.position" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.position" type="textarea")
        el-form-item.s-flex_item.kalix-form-table-td(label="所学软件" prop="learningSofts" v-bind:rules="rules.learningSofts" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.learningSofts" type="textarea")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:rules="rules.education" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.education")
        el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.salary" v-bind:step="500" style="width:100%")
      div
        el-form-item.kalix-form-table-td(label="个人特点" prop="skills" v-bind:rules="rules.skills" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.skills" appName="art" dictType="个人要求" multiple placeholder="请选择,可多选")
      <!--div-->
      <!--el-form-item.kalix-form-table-td(label="职业规划目标" prop="careerGoal" v-bind:rules="rules.careerGoal" v-bind:label-width="labelWidth")-->
      <!--el-input(v-model="formModel.careerGoal" type="textarea")-->
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {CandidateURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  // import DatePicker from '@/components/biz/date/datepicker.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  // import Vue from 'vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          region: [{required: true, message: '请选择期望工作省份', trigger: 'change'}],
          city: [{required: true, message: '请输入期望工作城市', trigger: 'blur'}],
          expectingIndustry: [{required: true, message: '请选择期望工作行业', trigger: 'change'}],
          jobType: [{required: true, message: '请选择期望工作类型', trigger: 'change'}],
          position: [{required: true, message: '请输入期望岗位', trigger: 'blur'}],
          learningSofts: [{required: true, message: '请输入所学软件', trigger: 'blur'}],
          education: [{required: true, message: '请输入学历', trigger: 'blur'}],
          skills: [{required: true, message: '请选择个人特点,可多选', trigger: 'change'}]
//          careerGoal: [{required: true, message: '请输入职业规划目标', trigger: 'blur'}]
        },
        targetURL: CandidateURL,
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog,
      // KalixDatePicker: DatePicker,
      KalixDictSelect: BaseDictSelect
    },
    methods: {
    }
  }
</script>

