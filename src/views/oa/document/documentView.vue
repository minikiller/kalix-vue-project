<!--
描述：办公自动化-系统管理-文号管理-查看组件
开发人：hqj-修改
开发日期：2018年01月10日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="document" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="文号" prop="businessNo" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.businessNo" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="文号类型" prop="docType" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.docType" appName="oa" dictType="文号类型" disabled)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="年份" prop="year" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.year" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="编号" prop="number" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.number" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="文号状态" prop="status" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.status" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="红头文件id" prop="redheadId" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.redheadId" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="发文时间" prop="docDate" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.docDate" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="发文部门" prop="docDept" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.docDept" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="文题" prop="title" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.title" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="发文地址" prop="docUrl" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.docUrl" readonly)
      div
        el-form-item.kalix-form-table-td(label="文档内容" prop="docContent" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.docContent" type="textarea" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="创建时间" prop="creationDate" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.creationDate" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="更新时间" prop="updateDate" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.updateDate" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect
    },
    methods: {
    }
  }
</script>

