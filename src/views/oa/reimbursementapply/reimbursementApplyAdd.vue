<!--
描述：办公自动化-报销申请-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="reimbursementApply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      // div.table-title 吉林动画学院报销申请表
      div.table-title 吉林动画学院差旅费用报销单
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.kalix-form-table-td(label="申请部门" prop="orgId" v-bind:rules="rules.orgId" v-bind:label-width="labelWidth")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
          el-input(v-model="formModel.orgId" v-show="false")
        el-form-item.kalix-form-table-td(label="报销日期" prop="reimbursementDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.reimbursementDate" placeholder="报销日期" style="margin-left:0px;width:100%")
        el-form-item.kalix-form-table-td(label="编号" prop="businessNo" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.businessNo")
      div.s-flex
        el-form-item.kalix-form-table-td(label="出差人" prop="bussinessPeopleId" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.bussinessPeopleId")
        el-form-item.kalix-form-table-td(label="出差事由" prop="reason" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.reason")
        el-form-item.kalix-form-table-td(label="项目名称" prop="projectName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.projectName")

      div.s-flex
        el-form-item.kalix-form-table-td(label="报销总额" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.projectName")
        div
          el-form-item.kalix-form-table-td(label="预留金额￥" prop="borrowMoney" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.borrowMoney")
          el-form-item.kalix-form-table-td(label="退/补金额￥" prop="backMoney" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.backMoney")
      div.s-flex
        div.s-flex_item
          div.s-flex(style="text-align:center")
            el-form-item(label="附单据张数合计（对应上方的项目）")
        div.s-flex_item
          el-form-item.kalix-form-table-td(label="城际交通" v-bind:label-width="labelWidth")
            el-input-number(v-bind:min="1" v-bind:max="99" style="width:100%")
        div.s-flex_item
          div.s-flex
            div.s-flex_item
              el-form-item.kalix-form-table-td(label="其他" v-bind:label-width="labelWidth" style="margin-left:1px;width:100%")
            div.s-flex_item
              el-input-number(v-bind:min="1" v-bind:max="99" style="width:100%")
            div.s-flex_item
              el-input-number(v-bind:min="1" v-bind:max="99" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {ReimbursementApplyURL} from '../config.toml'
  import Cache from 'common/cache'
  import Dialog from '@/components/custom/baseDialog.vue'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}]
        },
        targetURL: ReimbursementApplyURL,
        labelWidth: '110px',
        orgNameOptions: []
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixOrgSelect: UserOrgSelect,
      KalixDatePicker: DatePicker
    },
    created() {
      this.orgNameOptions = JSON.parse(Cache.get(`${'UserOrgs'.toUpperCase()}-KEY`))
    },
    methods: {
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      }
    }
  }
</script>
