<!--
描述：艺术中心-学生应聘-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="artCandidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 个人基本信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学号" prop="studentNo" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.studentNo" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="身份证号" prop="identificationCard" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.identificationCard" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" v-bind:label-width="labelWidth")
          el-input(v-bind:value="formModel.sex|getDictName('ART','性别')" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.birthday" placeholder="出生日期" style="width:100%" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.nation" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.politicalStatus" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="入党团时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.joinPartyDate" placeholder="入党团时间" style="width:100%" readonly)
      div.table-title 应聘信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.region" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.city" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.education" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.salary" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="个人特点" prop="skills" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.skills" appName="art" dictType="个人要求" multiple style="width:100%" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="职业规划目标" prop="careerGoal" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.careerGoal" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="联系电话" prop="phone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.phone" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="联系地址" prop="address" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.address" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.majorId" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="期望行业" prop="expectingIndustry" v-bind:label-width="labelWidth")
          el-input(v-bind:value="formModel.expectingIndustry|getDictName('ART','企业行业')" readonly)
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
        labelWidth: '110px'
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

