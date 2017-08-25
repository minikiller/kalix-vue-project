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
        el-form-item.s-flex_item(label="姓名" prop="name" v-bind:rules="rules.name")
         el-input(v-model="formModel.name")
        div.s-flex_item
        el-form-item.s-flex_item(label="学生性别" prop="sex" v-bind:rules="rules.sex")
          el-radio-group(v-model="formModel.sex")
           el-radio(label="男")
           el-radio(label="女")
      div.s-flex
        el-form-item.s-flex_item(label="学号" prop="studentNo")
          el-input(v-model="formModel.studentNo")
        div.s-flex_item
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard")
          el-input(v-model="formModel.identificationCard")
      div.s-flex
        el-form-item.s-flex_item(label="院部" prop="college")
          el-input(v-model="formModel.college")
        div.s-flex_item
        el-form-item.s-flex_item(label="学习专业" prop="major")
          el-input(v-model="formModel.major")
      div.s-flex
        el-form-item.s-flex_item(label="班级" prop="sclass")
          el-input(v-model="formModel.sclass")
        div.s-flex_item
        el-form-item.s-flex_item(label="辅导人员" prop="instructor")
          el-input(v-model="formModel.instructor")
      div.s-flex
        el-form-item.s-flex_item(label="民族" prop="nation")
          el-input(v-model="formModel.nation")
        div.s-flex_item
        el-form-item.s-flex_item(label="政治面貌" prop="politicalStatus")
          el-input(v-model="formModel.politicalStatus")
      div.s-flex
        el-form-item.s-flex_item(label="联系地址" prop="address")
          el-input(v-model="formModel.address")
        div.s-flex_item
        el-form-item.s-flex_item(label="邮政编码" prop="postalcode")
          el-input(v-model="formModel.postalcode")
      div.s-flex
        el-form-item.s-flex_item(label="籍贯" prop="placeOfOrigin")
          el-input(v-model="formModel.placeOfOrigin")
        div.s-flex_item
        el-form-item.s-flex_item(label="生源省份" prop="province")
          el-input(v-model="formModel.joinPartyDate")
      div.s-flex
        el-form-item.s-flex_item(label="入学年份" prop="entranceYear")
          el-input(v-model="formModel.entranceYear")
        div.s-flex_item
        el-form-item.s-flex_item(label="学习年限" prop="period")
          el-input(v-model="formModel.period")
      div.s-flex
        el-form-item.s-flex_item(label="学生培养层次" prop="trainingLevel")
          el-input(v-model="formModel.trainingLevel")
        div.s-flex_item

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
