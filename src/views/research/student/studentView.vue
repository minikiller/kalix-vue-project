<!--
描述：人员管理-学生维护-新增组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  kalix-dialog.user-add(
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  v-bind:isView="readonly")
    div.el-form(slot="dialogFormSlot")

      el-form-item(label="姓名" prop="name" v-bind:rules="rules.name")
        el-input(v-model="formModel.name"  v-bind:readonly="readonly")
      el-form-item(label="性别" prop="sex" v-bind:rules="rules.sex")
        el-radio-group(v-model="formModel.sex"  v-bind:disabled="readonly")
          el-radio(label="男")
          el-radio(label="女")

      el-form-item(label="学号" prop="studentNo" v-bind:rules="rules.studentNo")
          el-input(v-model="formModel.studentNo"  v-bind:readonly="readonly")
      el-form-item(label="班级" prop="sclass" v-bind:rules="rules.sclass")
        el-input(v-model="formModel.sclass"  v-bind:readonly="readonly")
      el-form-item(label="专业" prop="major" v-bind:rules="rules.major")
          el-input(v-model="formModel.major"  v-bind:readonly="readonly")
      el-form-item(label="院部" prop="college" v-bind:rules="rules.college")
          el-input(v-model="formModel.college"  v-bind:readonly="readonly")
      el-form-item(label="辅导员" prop="instructor" v-bind:rules="rules.instructor")
        el-input(v-model="formModel.instructor"  v-bind:readonly="readonly")

      el-form-item(label="身份证号" prop="identificationCard" v-bind:rules="rules.identificationCard" )
        el-input(v-model="formModel.identificationCard" v-bind:readonly="readonly")
      el-form-item(label="出生日期" prop="birthday" v-bind:rules="rules.birthday")
        el-input(v-model="formModel.birthday"  v-bind:readonly="readonly")
      el-form-item(label="民族" prop="nation" v-bind:rules="rules.nation")
        el-input(v-model="formModel.nation"  v-bind:readonly="readonly")
      el-form-item(label="籍贯" prop="placeOfOrigin" v-bind:rules="rules.placeOfOrigin")
        el-input(v-model="formModel.placeOfOrigin"  v-bind:readonly="readonly")
      el-form-item(label="政治面貌" prop="politicalStatus" v-bind:rules="rules.politicalStatus")
        el-input(v-model="formModel.politicalStatus"  v-bind:readonly="readonly")
      el-form-item(label="入党团日期" prop="joinPartyDate" v-bind:rules="rules.joinPartyDate" )
        el-input(v-model="formModel.nation"  v-bind:readonly="readonly")
      el-form-item(label="联系地址" prop="address" v-bind:rules="rules.address")
        el-input(v-model="formModel.address"  v-bind:readonly="readonly")
      el-form-item(label="邮政编码" prop="postalcode" v-bind:rules="rules.postalcode")
        el-input(v-model="formModel.postalcode"  v-bind:readonly="readonly")
      el-form-item(label="生源省份" prop="province" v-bind:rules="rules.province" )
        el-input(v-model="formModel.joinPartyDate" v-bind:readonly="readonly")
      el-form-item(label="入学年份" prop="entranceYear" v-bind:rules="rules.entranceYear")
        el-input(v-model="formModel.entranceYear"  v-bind:readonly="readonly")
      el-form-item(label="学生培养层次" prop="trainingLevel" v-bind:rules="rules.trainingLevel")
        el-input(v-model="formModel.trainingLevel"  v-bind:readonly="readonly")
      el-form-item(label="学习年限" prop="period" v-bind:rules="rules.period" )
        el-input(v-model="formModel.period" v-bind:readonly="readonly")

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
          sex: [{required: true, message: '请输入 sex', trigger: 'blur'}],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validateConfirmPassword, trigger: 'blur'}
          ],

          homePhone: [{required: true, message: '请输入 phone', trigger: 'blur'}]
        },
        targetURL: StudentURL,
        readonly: true
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
    }
  }
</script>
