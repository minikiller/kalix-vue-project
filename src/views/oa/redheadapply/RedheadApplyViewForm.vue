<!--
描述：办公自动化-红头文件申请-审批查看组件
开发人：sunlf
开发日期：2017年12月20日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院红头文件申请表
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="名称" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title")
      el-form-item.s-flex_item.kalix-form-table-td(label="文号" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.businessNo")
    div
      el-form-item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.orgName" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="文号类型" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.docType|getDictName('OA','文号类型')" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="申请日期" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.applyDate" readonly)
    div
      el-form-item.kalix-form-table-td(label="发文内容" v-bind:label-width="labelWidth")
        div(v-html="formModel.docContent")
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="部门负责人签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.depUser" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="校务部签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.schoolUser" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="校领导签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.managerUser"  readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="董事长签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.chairmanUser" readonly)
    div
      el-form-item.kalix-form-table-td(label="经办人" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.createBy" readonly)
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  // import BaseDictSelect from '@/components/custom/baseDictSelect'
  // import {usersURL} from 'views/admin/config.toml'

  export default {
    props: ['formModel'],
    data() {
      return {
        targetURL: '',
        readonly: true,
        meetingTypeName: '',
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog
      // KalixDictSelect: BaseDictSelect
    },
    methods: {}
  }
</script>
