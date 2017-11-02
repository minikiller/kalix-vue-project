<template lang="pug">
  kalix-dialog.user-add(ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院临时申请表
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth" prop="orgId" v-bind:rules="rules.orgId")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item.kalix-form-table-td(label="审批领导职务" v-bind:label-width="labelWidth" prop="targetDuty" v-bind:rules="rules.targetDuty")
          kalix-org-dutys-select(v-model="formModel.targetDuty")
      el-form-item(label="申请事由" v-bind:label-width="labelWidth" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content"  type="textarea")
</template>

<script type="text/ecmascript-6">
  import {TempApplyURL} from '../config.toml'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import OrgDutysSelect from '@/components/biz/select/OrgDutySelect'
  import FormModel from './model'

  export default {
    created() {
      this.labelWidth = '110px'
    },
    data() {
      return {
        targetURL: TempApplyURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          content: [{type: 'string', required: true, message: '请输入申请事由', trigger: 'blur'}],
          targetDuty: [{type: 'string', required: true, message: '请选择审批领导职务', trigger: 'change'}]
        }
      }
    },
    methods: {
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      }
    },
    components: {
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect,
      KalixOrgDutysSelect: OrgDutysSelect,
      KalixDialog: Dialog
    }
  }
</script>

<style scoped lang="stylus">

</style>
