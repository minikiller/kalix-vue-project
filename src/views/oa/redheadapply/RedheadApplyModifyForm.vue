<!--
描述：办公自动化-红头文件申请-修改组件
开发人：sunlf
开发日期：2017年12月20日
-->
<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院红头文件申请表
    el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
      el-input(v-model="formModel.title")
    el-form-item(label="文件种类" v-bind:label-width="labelWidth" prop="docCategory" v-bind:rules="rules.docCategory")
      el-radio-group(v-model="formModel.docCategory")
        el-radio(label="对内") 对内
        el-radio(label="对外") 对外
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth" prop="orgId" v-bind:rules="rules.orgId")
        kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
      el-form-item.s-flex_item(label="文号类型" v-bind:label-width="labelWidth"  prop="docType" v-bind:rules="rules.docType")
        kalix-dict-select(v-model="formModel.docType" appName="oa" dictType="文号类型")
    el-form-item.s-flex_item.kalix-form-table-td(label="发文内容" v-bind:label-width="labelWidth" prop="docContent" v-bind:rules="rules.docContent")
      el-input(v-model="formModel.docContent" type="textarea")
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
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="经办人" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.createBy" readonly)
</template>

<script type="text/ecmascript-6">
  import {RedheadApplyURL} from '../config.toml'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'

  export default {
    props: ['formModel'],
    created() {
      this.labelWidth = '110px'
    },
    data() {
      return {
        targetURL: RedheadApplyURL,
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          docType: [{type: 'number', required: true, message: '请选择文号类型', trigger: 'change'}],
          docCategory: [{required: true, message: '请选择文件种类', trigger: 'change'}],
          docContent: [{required: true, message: '请输入发文内容', trigger: 'blur'}]
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
      KalixDialog: Dialog
    }
  }
</script>

<style scoped lang="stylus">

</style>
