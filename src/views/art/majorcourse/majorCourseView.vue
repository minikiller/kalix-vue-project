<!--
描述：艺术中心-专业课程设置-查看组件
开发人：hqj
开发日期：2017年11月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="majorCourse" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属专业" v-bind:label-width="labelWidth")
        el-input(v-text="orgName")
      el-form-item(label="课程名称" prop="name" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="课程描述" prop="comment" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.comment" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px',
        orgName: ''
      }
    },
    methods: {
      init(dialogOption) {
        this.orgName = dialogOption.orgName
      }
    },
    components: {
      KalixDialog: Dialog
    }
  }
</script>
