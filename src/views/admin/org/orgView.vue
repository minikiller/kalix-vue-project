<!--
描述：办公自动化-应聘人员管理-查看组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="candidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="组织机构名称" prop="name" label-width="120px")
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="机构代码" prop="code" label-width="120px")
        el-input(v-model="formModel.code"  readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px'
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
