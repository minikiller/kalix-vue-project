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
        el-form-item.s-flex-item(label="姓名" prop="name" v-bind:rules="rules.name")
         el-input(v-model="formModel.name")
        el-form-item.s-flex-item(label="学号" prop="studentNo")
          el-input(v-model="formModel.studentNo")
        el-form-item.s-flex-item(label="身份" prop="identificationCard")
          el-input(v-model="formModel.identificationCard")
        el-form-item.s-flex-item(label="" prop="identificationCard" )
          el-input(type="hidden"  )
      div.s-flex
        el-form-item.s-flex-item(label="院部" prop="college")
          el-input(v-model="formModel.college")
        el-form-item.s-flex-item(label="专业" prop="major")
          el-input(v-model="formModel.major")
        el-form-item.s-flex-item(label="班级" prop="sclass")
          el-input(v-model="formModel.sclass")
        el-form-item.s-flex-item(label="导员" prop="instructor")
          el-input(v-model="formModel.instructor")


      el-form-item(label="民族" prop="nation")
       el-input(v-model="formModel.nation")
      el-form-item(label="籍贯" prop="placeOfOrigin")
       el-input(v-model="formModel.placeOfOrigin")
      el-form-item(label="政治面貌" prop="politicalStatus")
       el-input(v-model="formModel.politicalStatus")

      el-form-item(label="联系地址" prop="address")
       el-input(v-model="formModel.address")
      el-form-item(label="邮政编码" prop="postalcode")
       el-input(v-model="formModel.postalcode")
      el-form-item(label="生源省份" prop="province")
       el-input(v-model="formModel.joinPartyDate")
      el-form-item(label="入学年份" prop="entranceYear")
       el-input(v-model="formModel.entranceYear")
      el-form-item(label="学生培养层次" prop="trainingLevel")
       el-input(v-model="formModel.trainingLevel")
      el-form-item(label="学习年限" prop="period")
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
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formModel.confirmPassword !== '') {
            this.$refs.kalixDialog.$refs.dialogForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      var validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formModel.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
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
