<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="duty" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="组织机构名称" prop="name" label-width="120px"  v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="机构代码" prop="code" label-width="120px")
        el-input(v-model="formModel.code" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {orgURL} from '../config.toml'

  export default {
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入组织机构名称', trigger: 'blur'}]
        },
        targetURL: orgURL,
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog
    },
    created() {
    },
    methods: {
      init(dialogOption, row) {
        console.log('asdfasdfsdf', row)
        // this.formModel.orgName = row.name
        // this.formModel.parentId = row.id
      }
    }
  }
</script>
