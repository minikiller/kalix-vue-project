<!--
描述：办公自动化-红头文件申请-新增组件
开发人：sunlf
开发日期：2017年12月20日
-->
<template lang="pug">
  kalix-dialog.user-add(ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
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
        el-form-item.s-flex_item.kalix-form-table-td(label="打印人" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.printer")
        el-form-item.s-flex_item.kalix-form-table-td(label="校对人" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.checker")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="页数" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.page" v-bind:min="1" v-bind:max="20" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="份数" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.number" v-bind:min="1" v-bind:max="100" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import {RedheadApplyURL} from '../config.toml'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import FormModel from './model'

  export default {
    created() {
      this.labelWidth = '110px'
    },
    data() {
      return {
        targetURL: RedheadApplyURL,
        formModel: Object.assign({}, FormModel),
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
