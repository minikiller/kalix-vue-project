<!--
描述：艺术中心-系统管理-学生信息-新增组件
开发人：hqj
开发日期：2017年12月15日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="artStudent" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 学生注册信息
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
      div.table-title 学生详细信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:rules="rules.majorId" v-bind:label-width="labelWidth")
          kalix-major-tree2(v-model="formModel.majorId" v-bind:treeDataURL="orgURL" v-bind:parentNodeId="orgId")
        el-form-item.s-flex_item.kalix-form-table-td(label="辅导员" prop="instructor" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.instructor")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="身份证号" prop="identificationCard" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.identificationCard")
        el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.birthday")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.nation")
        el-form-item.s-flex_item.kalix-form-table-td(label="籍贯" prop="placeOfOrigin" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.placeOfOrigin")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.politicalStatus")
        el-form-item.s-flex_item.kalix-form-table-td(label="入党(团)时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.joinPartyDate")
      el-form-item.kalix-form-table-td(label="联系地址" prop="address" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.address")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="邮政编码" prop="postalcode" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.postalcode")
        el-form-item.s-flex_item.kalix-form-table-td(label="家庭联系电话" prop="homePhone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.homePhone")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="生源省份" prop="province" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.province")
        el-form-item.s-flex_item.kalix-form-table-td(label="入学年份" prop="entranceYear" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.entranceYear" type="year")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="学生培养层次" prop="trainingLevel" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.trainingLevel")
        el-form-item.s-flex_item.kalix-form-table-td(label="学习年限" prop="period" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.period")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {StudentURL} from '../config.toml'
  import {orgURL, TeachingUnitOrgID} from '@/config/global.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import MajorTree2 from '@/components/tree/basetree2'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          majorId: [{required: true, type: 'number', message: '请选择专业', trigger: 'change'}]
        },
        targetURL: StudentURL,
        orgURL: orgURL,
        orgId: TeachingUnitOrgID,
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixMajorTree2: MajorTree2,
      KalixDatePicker: DatePicker
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style scoped lang="stylus">
</style>
