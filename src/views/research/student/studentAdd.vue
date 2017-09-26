<!--
描述：人员管理-学生维护-新增组件
开发人：fj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="student" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="学生姓名" prop="name" v-bind:rules="rules.name" label-width="120px" )
          kalix-user-select(v-bind:params="params" style="width:100%" v-model="formModel.name" v-bind:multiple="false"
          v-on:userSelected="onUserSelected")
        el-form-item.s-flex_item(label="学号" prop="studentNo" label-width="120px")
          el-input(v-model="formModel.studentNo")
      div.s-flex
        el-form-item.s-flex_item(label="班级" prop="classId" label-width="120px")
          org-tree.inline(v-model="formModel.classId" v-bind:isAll="true")
        el-form-item.s-flex_item(label="辅导员" prop="instructor" label-width="120px")
          el-input(v-model="formModel.instructor")
      div.s-flex
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="120px")
          el-input(v-model="formModel.identificationCard")
        el-form-item.s-flex_item(label="性别" prop="sex" v-bind:rules="rules.sex" label-width="120px")
          el-radio-group(v-model="formModel.sex")
            el-radio(label="男")
            el-radio(label="女")
      div.s-flex
        el-form-item.s-flex_item(label="出生日期" prop="birthday" label-width="120px")
          kalix-date-picker(v-model="formModel.birthday")
        el-form-item.s-flex_item(label="民族" prop="nation" label-width="120px")
          el-input(v-model="formModel.nation")
      div.s-flex
        el-form-item.s-flex_item(label="籍贯" prop="placeOfOrigin" label-width="120px")
          el-input(v-model="formModel.placeOfOrigin")
        el-form-item.s-flex_item(label="政治面貌" prop="politicalStatus" label-width="120px")
          el-input(v-model="formModel.politicalStatus")
      div.s-flex
        el-form-item.s-flex_item(label="入党(团)时间" prop="joinPartyDate" label-width="120px")
          kalix-date-picker(v-model="formModel.joinPartyDate")
        el-form-item.s-flex_item(label="联系地址" prop="address" label-width="120px")
          el-input(v-model="formModel.address")
      div.s-flex
        el-form-item.s-flex_item(label="邮政编码" prop="postalcode" label-width="120px")
          el-input(v-model="formModel.postalcode")
        el-form-item.s-flex_item(label="家庭联系电话" prop="homePhone" label-width="120px")
          el-input(v-model="formModel.homePhone")
      div.s-flex
        el-form-item.s-flex_item(label="生源省份" prop="province" label-width="120px")
          el-input(v-model="formModel.province")
        el-form-item.s-flex_item(label="入学年份" prop="entranceYear" label-width="120px")
          kalix-date-picker(v-model="formModel.entranceYear" type="year")
      div.s-flex
        el-form-item.s-flex_item(label="学生培养层次" prop="trainingLevel" label-width="120px")
          el-input(v-model="formModel.trainingLevel")
        el-form-item.s-flex_item(label="学习年限" prop="period" label-width="120px")
          el-input(v-model="formModel.period")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {StudentURL} from '../config.toml'
  import UserSelect from '@/components/biz/userselect/userselect'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入学生姓名', trigger: 'blur'}]
        },
        targetURL: StudentURL,
        params: {userType: 1}
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect,
      KalixDatePicker: DatePicker
    },
    created() {
      console.log('[teacherAdd.vue created] this.formModel:', this.formModel)
    },
    methods: {
      onUserSelected(user) {
        this.formModel.sex = user.sex
        this.formModel.homePhone = (user.mobile == null ? user.phone : user.mobile)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .el-form
    padding 30px 70px 30px 20px
</style>
