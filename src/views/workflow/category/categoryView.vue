<!--
描述：办公自动化-流程分类-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="category"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="分类名称" prop="name" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="分类主键" prop="key" v-bind:rules="rules.key")
        el-input(v-model="formModel.key")
      el-form-item(label="分类图标" prop="icon")
        el-input(v-model="formModel.icon")
      el-form-item(label="分类描述" prop="description")
        el-input(v-model="formModel.description")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {CategoryURL} from '../../oa/config.toml'

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
        targetURL: CategoryURL
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {}
  }
</script>

