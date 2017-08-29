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
    div.s-flex
      el-form-item.s-flex_item(label="姓名" prop="name" v-bind:rules="rules.name" label-width="200px")
        el-input(v-model="formModel.name" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="身份证号" prop="identificationCard" v-bind:rules="rules.identificationCard" label-width="200px")
        el-input(v-model="formModel.identificationCard" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="性别" prop="sex" v-bind:rules="rules.sex" label-width="200px")
        el-radio-group(v-model="formModel.sex")
          el-radio(label="男")
          el-radio(label="女")
      el-form-item.s-flex_item(label="籍贯" prop="placeOfOrigin" label-width="200px")
        el-input(v-model="formModel.placeOfOrigin" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="民族" prop="nation" label-width="200px")
        el-input(v-model="formModel.nation" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="电子邮件" prop="email" label-width="200px")
        el-input(v-model="formModel.email" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="年龄" prop="age" label-width="200px")
        el-input(v-model="formModel.age" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="联系电话" prop="phone" label-width="200px")
        el-input(v-model="formModel.phone" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="最初职称" prop="firstTitle" label-width="200px")
        el-input(v-model="formModel.firstTitle" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="最初职称评定时间" prop="firstEvaluateDate" label-width="200px")
        el-input(v-model="formModel.firstEvaluateDate" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="最后职称" prop="lastTitle" label-width="200px")
        el-input(v-model="formModel.lastTitle" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="最后职称评定时间" prop="lastEvaluateDate" label-width="200px")
        el-input(v-model="formModel.lastEvaluateDate" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="最后学历" prop="education" label-width="200px")
        el-input(v-model="formModel.education" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="最后学位" prop="degree" label-width="200px")
        el-input(v-model="formModel.degree" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="毕业院校" prop="school" label-width="200px")
        el-input(v-model="formModel.school" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="研究方向" prop="direction" label-width="200px")
        el-input(v-model="formModel.direction" v-bind:readonly="readonly")
    div.s-flex
      el-form-item.s-flex_item(label="个人简历" prop="resume" label-width="200px")
        el-input(type="textarea" v-model="formModel.resume" v-bind:readonly="readonly")
      el-form-item.s-flex_item(label="个人说明" prop="introduction" label-width="200px")
        el-input(type="textarea" v-model="formModel.introduction" v-bind:readonly="readonly")
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

