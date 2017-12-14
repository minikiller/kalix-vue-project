<!--
描述：艺术中心-系统管理-公司信息-查看组件
开发人：hqj
开发日期：2017年12月14日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="artCompany" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 企业注册信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业组织机构代码" prop="code" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.code" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业名称" prop="name" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.name" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="邮箱" prop="email" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.email" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="固定电话" prop="phone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.phone" readonly)
      el-form-item.kalix-form-table-td(label="手机" prop="mobile" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.mobile" readonly)
      div.table-title 企业详细信息
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业性质" prop="nature" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.nature" appName="art" dictType="企业性质" style="width:100%" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业规模" prop="scale" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.scale" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="企业行业" prop="industry" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.industry" appName="art" dictType="企业行业" style="width:100%" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="企业年限" prop="life" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.life" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.region" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.city" readonly)
      el-form-item.kalix-form-table-td(label="企业详细地址" prop="address" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.address" readonly)
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

