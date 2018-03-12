<!--
描述：艺术中心-招聘管理-公司招聘-编辑组件
开发人：hqj
开发日期：2017年12月18日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="artRecruit" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 企业信息
      div
        el-form-item.kalix-form-table-td(label="企业组织机构代码" prop="companyCode" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyCode" disabled)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业名称" prop="companyName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyName" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业邮箱" prop="companyEmail" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyEmail" disabled)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="固定电话" prop="companyPhone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyPhone" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="手机" prop="companyMobile" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyMobile" disabled)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业性质" prop="companyNature" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.companyNature" appName="art" dictType="企业性质" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业规模" prop="companyScale" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyScale" disabled)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业行业" prop="companyIndustry" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.companyIndustry" appName="art" dictType="企业行业" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业年限" prop="companyLife" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyLife" disabled)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业所在省份" prop="companyRegion" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.companyRegion" appName="art" dictType="省份" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业所在城市" prop="companyCity" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyCity" disabled)
      div
        el-form-item.kalix-form-table-td(label="企业详细地址" prop="companyAddress" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyAddress" disabled)
      div.table-title 招聘信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="发布时间" prop="publishDate" v-bind:label-width="labelWidth")
          kalix-date-picker.kalix-date(v-model="formModel.publishDate" placeholder="发布时间" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位名称" prop="position" v-bind:rules="rules.position" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.position")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="工作省份" prop="region" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.region" appName="art" dictType="省份")
        el-form-item.s-flex_item.kalix-form-table-td(label="工作城市" prop="city" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.city")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位要求" prop="positionRequires" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.positionRequires" type="textarea")
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位所需软件" prop="requireSofts" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.requireSofts" type="textarea")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位个数" prop="jobNumbers" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.jobNumbers" v-bind:min="1" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.education")
      div
        el-form-item.kalix-form-table-td(label="职能类别" prop="functionCategoryId" v-bind:label-width="labelWidth")
          kalix-fc-tree2(v-model="formModel.functionCategoryId" v-bind:treeDataURL="functionCategroyURL")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="试用期薪资" prop="probationSalary" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.probationSalary" v-bind:step="400" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="转正薪资" prop="salary" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.salary" v-bind:step="500" style="width:100%")
      <!--div-->
        <!--el-form-item.kalix-form-table-td(label="应用技术名称" prop="appliedTechnology" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.appliedTechnology" type="textarea")-->
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="个人要求" prop="personRequires" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.personRequires" appName="art" dictType="个人要求" multiple style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.jobType" appName="art" dictType="工作类型")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {RecruitURL, FunctionCategroyURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import FcTree2 from '@/components/tree/basetree2'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          position: [{required: true, message: '请输入岗位名称', trigger: 'blur'}]
        },
        targetURL: RecruitURL,
        labelWidth: '140px',
        functionCategroyURL: FunctionCategroyURL
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixDatePicker: DatePicker,
      KalixFcTree2: FcTree2
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  .kalix-date
    .el-input__inner
      background-color: #f5f7fa
</style>
