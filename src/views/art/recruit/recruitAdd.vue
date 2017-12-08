<!--
描述：艺术中心-公司招聘-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="artRecruit" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 企业信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业组织机构代码" prop="companyCode" v-bind:rules="rules.companyCode" v-bind:label-width="labelWidth")
          div.s-flex
            el-input(v-model="formModel.companyCode")
            el-button(type="primary" icon="el-icon-search" v-on:click="getCompany") 查询
        el-form-item.s-flex_item.kalix-form-table-td(label="企业名称" prop="companyName" v-bind:rules="rules.companyName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyName")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业性质" prop="companyNature" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.companyNature" appName="art" dictType="企业性质" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="企业规模" prop="companyScale" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyScale")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业行业" prop="companyIndustry" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.companyIndustry" appName="art" dictType="企业行业" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="企业年限" prop="companyLife" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyLife")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.region")
        el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.city")
      div.table-title 招聘信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="发布时间" prop="publishDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.publishDate" placeholder="发布时间" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="职位描述" prop="position" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.position")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位要求" prop="positionRequires" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.positionRequires")
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位个数" prop="jobNumbers" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.jobNumbers" v-bind:min="1" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.education")
        el-form-item.s-flex_item.kalix-form-table-td(label="职能类别" prop="functionCategoryId" v-bind:label-width="labelWidth")
          kalix-fc-tree2(v-model="formModel.functionCategoryId" v-bind:treeDataURL="functionCategroyURL")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.salary" v-bind:step="500" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="应用技术名称" prop="appliedTechnology" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.appliedTechnology")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="个人要求" prop="personRequires" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.personRequires" appName="art" dictType="个人要求" multiple style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.jobType" appName="art" dictType="工作类型" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {RecruitURL, FunctionCategroyURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import FcTree2 from '@/components/tree/basetree2'
  import Vue from 'vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          companyCode: [{required: true, message: '请输入企业组织机构代码', trigger: 'blur'}],
          companyName: [{required: true, message: '请输入企业名称', trigger: 'blur'}]
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
      initData() {
        this.formModel.companyName = ''
        this.formModel.companyNature = null
        this.formModel.companyScale = ''
        this.formModel.companyIndustry = null
        this.formModel.companyLife = ''
        this.formModel.region = ''
        this.formModel.city = ''
      },
      getCompany() {
        this.initData()
        let companyCode = this.formModel.companyCode
        let sort = '[{\'property\': \'creationDate\', \'direction\': \'DESC\'}]'
        if (companyCode) {
          let params = {
            params: {
              'jsonStr': {'companyCode': companyCode},
              'page': 1,
              'limit': 1,
              'sort': sort
            }
          }
          Vue.axios.get(RecruitURL, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              this.formModel.companyName = rec.companyName
              this.formModel.companyNature = rec.companyNature
              this.formModel.companyScale = rec.companyScale
              this.formModel.companyIndustry = rec.companyIndustry
              this.formModel.companyLife = rec.companyLife
              this.formModel.region = rec.region
              this.formModel.city = rec.city
            }
          })
        } else {
          alert('请输入企业组织机构代码')
        }
      }
    }
  }
</script>

