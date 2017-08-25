<!--
描述：人员管理-学生维护-新增组件
开发人：fj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="student"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="学生姓名" prop="name" v-bind:rules="rules.name" label-width="200px")
         el-input(v-model="formModel.name")
        el-form-item.s-flex_item(label="所属民族" prop="nation" label-width="200px")
          el-input(v-model="formModel.nation" )
      div.s-flex
        el-form-item.s-flex_item(label="学生性别" prop="sex" v-bind:rules="rules.sex" label-width="200px")
          el-radio-group(v-model="formModel.sex")
            el-radio(label="男")
            el-radio(label="女")
        el-form-item.s-flex_item(label="政治面貌" prop="politicalStatus" label-width="200px")
          el-input(v-model="formModel.politicalStatus")
      div.s-flex
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="200px")
          el-input(v-model="formModel.identificationCard")
        el-form-item.s-flex_item(label="原始籍贯" prop="placeOfOrigin" label-width="200px")
          el-input(v-model="formModel.placeOfOrigin")
      div.s-flex
        el-form-item.s-flex_item(label="学生学号" prop="studentNo" label-width="200px")
          el-input(v-model="formModel.studentNo")
        el-form-item.s-flex_item(label="生源省份" prop="province" label-width="200px")
          el-input(v-model="formModel.joinPartyDate")
      div.s-flex
        el-form-item.s-flex_item(label="所在院部" prop="college" label-width="200px")
          el-input(v-model="formModel.college")
        el-form-item.s-flex_item(label="家庭电话" prop="homePhone" label-width="200px")
          el-input(v-model="formModel.homePhone")
      div.s-flex
        el-form-item.s-flex_item(label="学习专业" prop="major" label-width="200px")
          el-input(v-model="formModel.major")
        el-form-item.s-flex_item(label="联系地址" prop="address" label-width="200px")
          el-input(v-model="formModel.address")
      div.s-flex
        el-form-item.s-flex_item(label="所属班级" prop="sclass" label-width="200px")
          el-input(v-model="formModel.sclass")
        el-form-item.s-flex_item(label="邮政编码" prop="postalcode" label-width="200px")
          el-input(v-model="formModel.postalcode")
      div.s-flex
        el-form-item.s-flex_item(label="辅导人员" prop="instructor" label-width="200px")
          el-input(v-model="formModel.instructor")
        el-form-item.s-flex_item(label="培养层次" prop="trainingLevel" label-width="200px")
          el-input(v-model="formModel.trainingLevel")
      div.s-flex
        el-form-item.s-flex_item(label="入学年份" prop="entranceYear" label-width="200px")
          el-input(v-model="formModel.entranceYear")
        el-form-item.s-flex_item(label="学习年限" prop="period" label-width="200px")
          el-input(v-model="formModel.period")


</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {StudentURL} from '../config.toml'

  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      },
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        rules: {
          name: [{required: true, message: '请输入 name', trigger: 'blur'}],
          identificationCard: [{required: true, message: '请输入 identificationCard', trigger: 'blur'}],
          sex: [{required: true, message: '请输入 sex', trigger: 'blur'}]
        },
        targetURL: StudentURL
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
      console.log('[teacherAdd.vue created] this.formModel:', this.formModel)
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
    }
  }
</script>
