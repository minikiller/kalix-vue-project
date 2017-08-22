<!--
描述：人员管理-科研人员维护-查看组件
开发人：hqj
开发日期：2017年8月22日
-->
<template lang="pug">
  kalix-dialog.user-add(
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  v-bind:isView="readonly")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="身份证号" prop="identificationCard" v-bind:rules="rules.identificationCard" )
        el-input(v-model="formModel.identificationCard" v-bind:readonly="readonly")
      el-form-item(label="姓名" prop="name" v-bind:rules="rules.name")
        el-input(v-model="formModel.name"  v-bind:readonly="readonly")
      el-form-item(label="性别" prop="sex" v-bind:rules="rules.sex")
        el-radio-group(v-model="formModel.sex"  v-bind:disabled="readonly")
          el-radio(label="男")
          el-radio(label="女")
      el-form-item(label="手机" prop="mobile" v-bind:rules="rules.mobile")
        el-input(v-model="formModel.mobile"  v-bind:readonly="readonly")
      el-form-item(label="职称")
        el-input(v-model="formModel.positionalTitles"  v-bind:readonly="readonly")
      el-form-item(label="个人简历")
        el-input(type="textarea" v-model="formModel.resume"  v-bind:readonly="readonly")
      el-form-item(label="个人说明")
        el-input(type="textarea" v-model="formModel.introduction"  v-bind:readonly="readonly")
</template>
<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {WorkerURL} from '../config.toml'

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
          sex: [{required: true, message: '请输入 sex', trigger: 'blur'}],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone: [{required: true, message: '请输入 phone', trigger: 'blur'}],
          mobile: [{required: true, message: '请输入 mobile', trigger: 'blur'}],
          available: [{required: true, message: '请输入 available', trigger: 'blur'}]
        },
        targetURL: WorkerURL,
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
<style scoped lang="scss" type="text/scss">
</style>
