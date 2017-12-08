<!--
描述：艺术中心-专业课程设置-新增组件
开发人：hqj
开发日期：2017年11月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="majorCourse" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属专业" prop="orgid" v-bind:label-width="labelWidth")
        el-input(v-text="orgName")
        input(v-model="formModel.orgid" type="hidden")
      el-form-item(label="课程名称" prop="name" v-bind:rules="rules.name" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.name")
      el-form-item(label="课程描述" prop="comment" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.comment")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入课程名称', trigger: 'blur'}]
        },
        targetURL: '',
        labelWidth: '110px',
        orgName: ''
      }
    },
    components: {
      KalixDialog: Dialog
    },
    created() {
    },
    methods: {
      init(dialogOption) {
        this.orgName = dialogOption.orgName
        this.formModel.orgid = dialogOption.orgId
        this.targetURL = dialogOption.targetURL
      }
    }
  }
</script>
