<!--
描述：人员管理-老师维护-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="teacher"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="身份证号" prop="identificationCard" v-bind:rules="rules.identificationCard")
        el-input(v-model="formModel.identificationCard")
      el-form-item(label="姓名" prop="name" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="性别" prop="sex" v-bind:rules="rules.sex")
        el-radio-group(v-model="formModel.sex")
          el-radio(label="男")
          el-radio(label="女")
      el-form-item(label="手机" prop="mobile" v-bind:rules="rules.mobile")
        el-input(v-model="formModel.mobile")
      el-form-item(label="职称" prop="positionalTitles")
        el-input(v-model="formModel.positionalTitles")
      el-form-item(label="职称" prop="positionalTitles")
          kalix-dict-select(v-model="formModel.positionalTitles" appName="research" dictType="职称")
      el-form-item(label="个人简历")
        el-input(type="textarea" v-model="formModel.resume")
      el-form-item(label="个人说明")
        el-input(type="textarea" v-model="formModel.introduction")
      el-form-item(label="学术研究")
        el-input(type="textarea" v-model="formModel.learning")
      el-form-item(label="教学情况")
        el-input(type="textarea" v-model="formModel.teaching")
      el-form-item(label="教学情况")
        kalix-user-select(v-model="formModel.teaching")
      el-form-item(label="教学情况")
        kalix-test-input(v-model="formModel.teaching")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserSelect from '@/components/biz/userselect/userselect'
  import {TeacherURL} from '../config.toml'

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
          sex: [{required: true, message: '请输入 sex', trigger: 'blur'}],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validateConfirmPassword, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone: [{required: true, message: '请输入 phone', trigger: 'blur'}],
          mobile: [{required: true, message: '请输入 mobile', trigger: 'blur'}],
          available: [{required: true, message: '请输入 available', trigger: 'blur'}]
        },
        targetURL: TeacherURL
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
      console.log('[teacherAdd.vue created] this.formModel:', this.formModel)
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect
    },
    methods: {}
  }
</script>

