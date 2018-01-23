<!--
描述：办公自动化-系统管理-文号管理-查看组件
开发人：hqj-修改
开发日期：2018年01月10日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="document" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    template(slot="dialogFormSlot")
      div.el-form.kalix-form-table
        div.table-title 文号信息
        div
          el-form-item.kalix-form-table-td(label="文号" prop="businessNo" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.businessNo" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="文号类型" prop="docType" v-bind:label-width="labelWidth")
            kalix-dict-select(v-model="formModel.docType" appName="oa" dictType="文号类型" disabled)
          el-form-item.s-flex_item.kalix-form-table-td(label="年份" prop="year" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.year" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="文号状态" prop="status" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.status" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="编号" prop="number" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.number" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="发文时间" prop="docDate" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.docDate" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="发文部门" prop="docDept" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.docDept" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="打印人" prop="printer" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.printer" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="校对人" prop="checker" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.checker" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="页数" prop="page" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.page" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="份数" prop="copy" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.copy" readonly)
        div
          el-form-item.kalix-form-table-td(label="抄送" prop="other" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.other" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="创建时间" prop="creationDate" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.creationDate" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="更新时间" prop="updateDate" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.updateDate" readonly)
      div.el-form.kalix-form-table
        div.table-title 文件信息
      kalix-redhead-apply-view-form(v-bind:formModel.sync="redheadapplyFormModel" v-bind:isRequest="true" v-bind:bizId="formModel.redheadId")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import RedheadApplyViewForm from '../redheadapply/RedheadApplyViewForm.vue'
  import redheadapplyFormModel from '../redheadapply/model'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        redheadapplyFormModel: Object.assign({}, redheadapplyFormModel),
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixRedheadApplyViewForm: RedheadApplyViewForm
    },
    methods: {}
  }
</script>

<style lang="stylus" type="text/stylus">
  .kalix-form-table
    & + .kalix-form-table
      border-top 0
</style>
