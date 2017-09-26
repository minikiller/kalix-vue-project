<!--
描述：人员管理-学生维护-新增组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="student" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="学生姓名" prop="name" label-width="200px")
          el-input(v-model="formModel.name" readonly)
        el-form-item.s-flex_item(label="学号" prop="studentNo" label-width="120px")
          el-input(v-model="formModel.studentNo" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="班级" prop="classId" label-width="120px")
          org-tree.inline(v-model="formModel.classId" v-bind:isAll="true" disabled)
        el-form-item.s-flex_item(label="辅导员" prop="instructor" label-width="120px")
          el-input(v-model="formModel.instructor" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="120px")
          el-input(v-model="formModel.identificationCard" readonly)
        el-form-item.s-flex_item(label="性别" prop="sex" v-bind:rules="rules.sex" label-width="120px")
          el-radio-group(v-model="formModel.sex" disabled)
            el-radio(label="男")
            el-radio(label="女")
      div.s-flex
        el-form-item.s-flex_item(label="出生日期" prop="birthday" label-width="120px")
          kalix-date-picker(v-model="formModel.birthday" readonly)
        el-form-item.s-flex_item(label="民族" prop="nation" label-width="120px")
          el-input(v-model="formModel.nation" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="籍贯" prop="placeOfOrigin" label-width="120px")
          el-input(v-model="formModel.placeOfOrigin" readonly)
        el-form-item.s-flex_item(label="政治面貌" prop="politicalStatus" label-width="120px")
          el-input(v-model="formModel.politicalStatus" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="入党(团)时间" prop="joinPartyDate" label-width="120px")
          kalix-date-picker(v-model="formModel.joinPartyDate" readonly)
        el-form-item.s-flex_item(label="联系地址" prop="address" label-width="120px")
          el-input(v-model="formModel.address" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="邮政编码" prop="postalcode" label-width="120px")
          el-input(v-model="formModel.postalcode" readonly)
        el-form-item.s-flex_item(label="家庭联系电话" prop="homePhone" label-width="120px")
          el-input(v-model="formModel.homePhone" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="生源省份" prop="province" label-width="120px")
          el-input(v-model="formModel.province" readonly)
        el-form-item.s-flex_item(label="入学年份" prop="entranceYear" label-width="120px")
          kalix-date-picker(v-model="formModel.entranceYear" type="year" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="学生培养层次" prop="trainingLevel" label-width="120px")
          el-input(v-model="formModel.trainingLevel" readonly)
        el-form-item.s-flex_item(label="学习年限" prop="period" label-width="120px")
          el-input(v-model="formModel.period" readonly)
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style scoped lang="stylus">
  .el-form
    padding 30px 70px 30px 20px
</style>
