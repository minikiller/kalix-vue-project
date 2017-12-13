<!--
描述：艺术中心-学生应聘-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="artCandidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 个人基本信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学号" prop="studentNo" v-bind:rules="rules.studentNo" v-bind:label-width="labelWidth")
          div.s-flex
            el-input(v-model="formModel.studentNo")
            el-button(type="primary" icon="el-icon-search" v-on:click="getStudent") 查询
        el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" v-bind:rules="rules.name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="身份证号" prop="identificationCard" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.identificationCard")
        el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.sex" appName="art" dictType="性别" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.birthday" placeholder="出生日期" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.nation")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.politicalStatus")
        el-form-item.s-flex_item.kalix-form-table-td(label="入党团时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.joinPartyDate" placeholder="入党团时间" style="width:100%")
      div.table-title 应聘信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.region")
        el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.city")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.education")
        el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.salary" v-bind:step="500" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="个人特点" prop="skills" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.skills" appName="art" dictType="个人要求" multiple style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="职业规划目标" prop="careerGoal" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.careerGoal")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="联系电话" prop="phone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.phone")
        el-form-item.s-flex_item.kalix-form-table-td(label="联系地址" prop="address" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.address")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.majorId")
        el-form-item.s-flex_item.kalix-form-table-td(label="期望行业" prop="expectingIndustry" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.expectingIndustry" appName="art" dictType="企业行业" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {CandidateURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import Vue from 'vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          studentNo: [{required: true, message: '请输入学号', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        targetURL: CandidateURL,
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixDatePicker: DatePicker
    },
    methods: {
      initData() {
        this.formModel.name = ''
        this.formModel.identificationCard = ''
        this.formModel.sex = null
        this.formModel.birthday = null
        this.formModel.nation = ''
        this.formModel.politicalStatus = ''
        this.formModel.joinPartyDate = null
        this.formModel.region = ''
        this.formModel.city = ''
        this.formModel.education = ''
        this.formModel.salary = 1000
        this.formModel.phone = ''
        this.formModel.address = ''
        this.formModel.majorId = null
        this.formModel.expectingIndustry = null
      },
      getStudent() {
        this.initData()
        let studentNo = this.formModel.studentNo
        let sort = '[{\'property\': \'updateDate\', \'direction\': \'DESC\'}]'
        if (studentNo) {
          let params = {
            params: {
              'jsonStr': {'studentNo': studentNo},
              'page': 1,
              'limit': 1,
              'sort': sort
            }
          }
          Vue.axios.get(CandidateURL, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              this.formModel.name = rec.name
              this.formModel.identificationCard = rec.identificationCard
              this.formModel.sex = rec.sex
              this.formModel.birthday = rec.birthday
              this.formModel.nation = rec.nation
              this.formModel.politicalStatus = rec.politicalStatus
              this.formModel.joinPartyDate = rec.joinPartyDate
              this.formModel.region = rec.region
              this.formModel.city = rec.city
              this.formModel.education = rec.education
              this.formModel.salary = rec.salary
              this.formModel.phone = rec.phone
              this.formModel.address = rec.address
              this.formModel.majorId = rec.majorId
              this.formModel.expectingIndustry = rec.expectingIndustry
            }
          })
        } else {
          alert('请输入学号')
        }
      }
    }
  }
</script>

