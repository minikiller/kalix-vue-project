<!--
描述：艺术中心-招聘管理-学生应聘-查看组件
开发人：hqj
开发日期：2017年12月19日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="artCandidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 个人基本信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学号" prop="code" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.code" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.sex" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="邮箱" prop="email" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.email" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="固定电话" prop="phone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.phone" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="手机" prop="mobile" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.mobile" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:label-width="labelWidth")
          kalix-major-tree2(v-model="formModel.majorId" v-bind:treeDataURL="orgURL" v-bind:parentNodeId="orgId" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="辅导员" prop="instructor" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.instructor" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="身份证号" prop="identificationCard" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.identificationCard" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.birthday" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.nation" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="籍贯" prop="placeOfOrigin" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.placeOfOrigin" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.politicalStatus" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="入党(团)时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.joinPartyDate" readonly)
      div
        el-form-item.kalix-form-table-td(label="联系地址" prop="address" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.address" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="邮政编码" prop="postalcode" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.postalcode" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="家庭联系电话" prop="homePhone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.homePhone" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="生源省份" prop="province" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.province" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="入学年份" prop="entranceYear" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.entranceYear" type="year" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学生培养层次" prop="trainingLevel" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.trainingLevel" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="学习年限" prop="period" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.period" readonly)
      div.table-title 应聘信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="工作地区" prop="region" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.region" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="工作城市" prop="city" v-bind:label-width="labelWidth")
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
      div
        el-form-item.kalix-form-table-td(label="期望行业" prop="expectingIndustry" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.expectingIndustry" appName="art" dictType="企业行业" style="width:100%" disabled)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {StudentURL} from '../config.toml'
  import {orgURL, TeachingUnitOrgID} from '@/config/global.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import MajorTree2 from '@/components/tree/basetree2'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import Vue from 'vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        orgURL: orgURL,
        orgId: TeachingUnitOrgID,
        labelWidth: '110px',
        studentModel: {}
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixMajorTree2: MajorTree2,
      KalixDatePicker: DatePicker,
      KalixDictSelect: BaseDictSelect
    },
    mounted() {
    },
    watch: {
      formModel: {
        handler: 'watchFormModel'
      }
    },
    methods: {
      initData() {
        this.$set(this.formModel, 'sex', '')
        this.$set(this.formModel, 'email', '')
        this.$set(this.formModel, 'phone', '')
        this.$set(this.formModel, 'mobile', '')
        this.$set(this.formModel, 'majorId', null)
        this.$set(this.formModel, 'majorName', '')
        this.$set(this.formModel, 'instructor', '')
        this.$set(this.formModel, 'identificationCard', '')
        this.$set(this.formModel, 'birthday', null)
        this.$set(this.formModel, 'nation', '')
        this.$set(this.formModel, 'placeOfOrigin', '')
        this.$set(this.formModel, 'politicalStatus', '')
        this.$set(this.formModel, 'joinPartyDate', null)
        this.$set(this.formModel, 'address', '')
        this.$set(this.formModel, 'postalcode', '')
        this.$set(this.formModel, 'homePhone', '')
        this.$set(this.formModel, 'province', '')
        this.$set(this.formModel, 'entranceYear', null)
        this.$set(this.formModel, 'trainingLevel', '')
        this.$set(this.formModel, 'period', '')
      },
      getStudent() {
        this.initData()
        let studentNo = this.formModel.code
        // let sort = '[{\'property\': \'updateDate\', \'direction\': \'DESC\'}]'
        if (studentNo) {
          let params = {
            params: {
              'jsonStr': {'code': studentNo},
              'page': 1,
              'limit': 1,
              'sort': null
            }
          }
          Vue.axios.get(StudentURL, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              this.$set(this.formModel, 'sex', rec.sex)
              this.$set(this.formModel, 'email', rec.email)
              this.$set(this.formModel, 'phone', rec.phone)
              this.$set(this.formModel, 'mobile', rec.mobile)
              this.$set(this.formModel, 'majorId', rec.majorId)
              this.$set(this.formModel, 'majorName', rec.majorName)
              this.$set(this.formModel, 'instructor', rec.instructor)
              this.$set(this.formModel, 'identificationCard', rec.identificationCard)
              this.$set(this.formModel, 'birthday', rec.birthday)
              this.$set(this.formModel, 'nation', rec.nation)
              this.$set(this.formModel, 'placeOfOrigin', rec.placeOfOrigin)
              this.$set(this.formModel, 'politicalStatus', rec.politicalStatus)
              this.$set(this.formModel, 'joinPartyDate', rec.joinPartyDate)
              this.$set(this.formModel, 'address', rec.address)
              this.$set(this.formModel, 'postalcode', rec.postalcode)
              this.$set(this.formModel, 'homePhone', rec.homePhone)
              this.$set(this.formModel, 'province', rec.province)
              this.$set(this.formModel, 'entranceYear', rec.entranceYear)
              this.$set(this.formModel, 'trainingLevel', rec.trainingLevel)
              this.$set(this.formModel, 'period', rec.period)
            }
          })
        } else {
          alert('数据获取失败')
        }
      },
      watchFormModel(newVal) {
        this.getStudent()
      }
    }
  }
</script>
