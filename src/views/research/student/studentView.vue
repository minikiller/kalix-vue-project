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
      div.s-flex
        el-form-item.s-flex_item(label="学生姓名" prop="name" label-width="200px")
          el-input(v-model="formModel.name" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="所属民族" prop="nation" label-width="200px")
          el-input(v-model="formModel.nation" v-bind:readonly="readonly" )
      div.s-flex
        el-form-item.s-flex_item(label="学生性别" prop="sex" label-width="200px")
          el-radio-group(v-model="formModel.sex" )
            el-radio(label="男")
            el-radio(label="女")
        el-form-item.s-flex_item(label="政治面貌" prop="politicalStatus" label-width="200px")
          el-input(v-model="formModel.politicalStatus" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="200px")
          el-input(v-model="formModel.identificationCard" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="原始籍贯" prop="placeOfOrigin" label-width="200px")
          el-input(v-model="formModel.placeOfOrigin" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="学生学号" prop="studentNo" label-width="200px")
          el-input(v-model="formModel.studentNo" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="生源省份" prop="province" label-width="200px")
          el-input(v-model="formModel.joinPartyDate" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="所在院部" prop="college" label-width="200px")
          el-input(v-model="formModel.college" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="家庭电话" prop="homePhone" label-width="200px")
          el-input(v-model="formModel.homePhone" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="学习专业" prop="major" label-width="200px")
          el-input(v-model="formModel.major" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="联系地址" prop="address" label-width="200px")
          el-input(v-model="formModel.address" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="所属班级" prop="sclass" label-width="200px")
          el-input(v-model="formModel.sclass" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="邮政编码" prop="postalcode" label-width="200px")
          el-input(v-model="formModel.postalcode" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="辅导人员" prop="instructor" label-width="200px")
          el-input(v-model="formModel.instructor" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="培养层次" prop="trainingLevel" label-width="200px")
          el-input(v-model="formModel.trainingLevel" v-bind:readonly="readonly")
      div.s-flex
        el-form-item.s-flex_item(label="入学年份" prop="entranceYear" label-width="200px")
          el-input(v-model="formModel.entranceYear" v-bind:readonly="readonly")
        el-form-item.s-flex_item(label="学习年限" prop="period" label-width="200px")
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
