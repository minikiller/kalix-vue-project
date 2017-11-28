<!--
描述：艺术中心-公司招聘-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="artRecruit" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 企业信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业组织机构代码" prop="companyCode" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyCode" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业名称" prop="companyName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyName" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业性质" prop="companyNature" v-bind:label-width="labelWidth")
          el-input(v-bind:value="formModel.companyNature|getDictName('ART','企业性质')" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业规模" prop="companyScale" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyScale" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业行业" prop="companyIndustry" v-bind:label-width="labelWidth")
          el-input(v-bind:value="formModel.companyIndustry|getDictName('ART','企业行业')" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业年限" prop="companyLife" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.companyLife" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.region" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.city" readonly)
      div.table-title 招聘信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="发布时间" prop="publishDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.publishDate" style="width:100%" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="职位描述" prop="position" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.position" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位要求" prop="positionRequires" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.positionRequires" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="岗位个数" prop="jobNumbers" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.jobNumbers" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.education" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="职能类别" prop="functionCategoryId" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.functionCategoryId" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.salary" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="应用技术名称" prop="appliedTechnology" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.appliedTechnology" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="个人要求" prop="personRequires" v-bind:label-width="labelWidth")
          // el-input(v-bind:value="formModel.personRequires|getDictName('ART','个人要求')" readonly)
          kalix-dict-select(v-model="formModel.personRequires" appName="art" dictType="个人要求" multiple style="width:100%" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
          el-input(v-bind:value="formModel.jobType|getDictName('ART','工作类型')" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker,
      KalixDictSelect: BaseDictSelect
    },
    methods: {
    }
  }
</script>

