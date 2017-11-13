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
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgId" v-bind:rules="rules.orgId" v-bind:label-width="labelWidth")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item.kalix-form-table-td(label="报销日期" prop="reimbursementDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.reimbursementDate" placeholder="报销日期" style="margin-left:0px;width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="编号" prop="reimbursementNo" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.reimbursementNo")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="出差人" prop="bussinessPeopleId" v-bind:rules="rules.bussinessPeopleId" v-bind:label-width="labelWidth")
          // el-input(v-model="formModel.bussinessPeopleId")
          kalix-user-select(v-model="user" v-bind:userIds.sync="formModel.bussinessPeopleId" placeholder="请输入出差人姓名" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="出差事由" prop="reason" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.reason")
        el-form-item.s-flex_item.kalix-form-table-td(label="项目名称" prop="projectName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.projectName")
      div(style="height:500px;position: relative;")
        reimbursement-apply-detail(v-bind:reimbursementApplyId="formModel.id")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="报销总额" label-width="50px" style="flex:2;margin-right:-1px;")
          el-input(readonly)
        div.s-flex_item
          div.s-flex(style="border-bottom:1px solid #000;")
            el-form-item.kalix-form-table-td(label="预留金额￥" prop="borrowMoney" v-bind:label-width="labelWidth1")
              el-input(v-model="formModel.borrowMoney")
          div.s-flex
            el-form-item.kalix-form-table-td(label="退/补金额￥" prop="backMoney" v-bind:label-width="labelWidth1")
              el-input(v-model="formModel.backMoney")
      div.s-flex
        el-form-item.s-flex_item.label-center(label="附单据张数合计（对应上方的项目）" label-width="304px")
        el-form-item.s-flex_item.kalix-form-table-td(label="城际交通" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.cjjt")
        el-form-item.s-flex_item.kalix-form-table-td(label="其他" v-bind:labelWidth="labelWidth")
          div.s-flex
            el-input.s-flex_item.kalix-form-table-td(v-model="formModel.qt1")
            el-input.s-flex_item.kalix-form-table-td(v-model="formModel.qt2")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="测试1" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.borrowMoney")
        el-form-item.s-flex_item.kalix-form-table-td(label="测试2" v-bind:labelWidth="labelWidth")
          el-input(v-model="formModel.backMoney")
        el-form-item.s-flex_item.kalix-form-table-td(label="合计" v-bind:labelWidth="labelWidth")
          el-input(v-model="formModel.cjjt")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {ReimbursementApplyURL} from '../config.toml'
  import Cache from 'common/cache'
  import Dialog from '@/components/custom/baseDialog.vue'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import UserSelect from '@/components/biz/userselect/userselect'
  import Detail from './detail.vue'

  export default {
    data() {
      return {
        user: null,
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          bussinessPeopleId: [{type: 'number', required: true, message: '请输入出差人姓名', trigger: 'change'}]
        },
        targetURL: ReimbursementApplyURL,
        label_width: 110,
        orgNameOptions: []
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixOrgSelect: UserOrgSelect,
      KalixDatePicker: DatePicker,
      KalixUserSelect: UserSelect,
      ReimbursementApplyDetail: Detail
    },
    created() {
      this.orgNameOptions = JSON.parse(Cache.get(`${'UserOrgs'.toUpperCase()}-KEY`))
    },
    computed: {
      labelWidth() {
        return this.label_width + 'px'
      },
      labelWidth1() {
        return (this.label_width + 1) + 'px'
      }
    },
    watch: {
      formModel: {
        handler: 'watchFormModel',
        deep: true
      }
    },
    methods: {
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      },
      watchFormModel(newVal) {
        this.formModel.cjjt = newVal.backMoney * newVal.borrowMoney
      }
    }
  }
</script>
