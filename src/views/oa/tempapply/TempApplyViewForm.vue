<!--
描述：人员管理-用章申请-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院临时申请表
    el-form-item(label="名称" v-bind:label-width="labelWidth")
      el-input(v-model="formModel.title")
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.orgName" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="审批领导职务" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.targetDuty" readonly)
    el-form-item(label="申请事由" v-bind:label-width="labelWidth")
      el-input(v-model="formModel.content"  readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="上级领导签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.depUser"  readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="审批领导签字" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.dutyUser" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请日期" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.applyDate" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="经办人" v-bind:label-width="labelWidth")
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
        meetingTypeName: ''
      }
    },
    created() {
      this.labelWidth = '110px'
    },
    components: {
      KalixDialog: Dialog
      // KalixDictSelect: BaseDictSelect
    },
    methods: {}
  }
</script>
