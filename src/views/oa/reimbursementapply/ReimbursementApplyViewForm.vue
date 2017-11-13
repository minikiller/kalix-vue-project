<!--
描述：办公自动化-报销申请-查看组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  div.el-form.kalix-form-table
    // div.table-title 吉林动画学院报销申请表
    div.table-title 吉林动画学院差旅费用报销单
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title")
        el-input(v-model="formModel.title" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.orgName" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="报销日期" prop="reimbursementDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.reimbursementDate" placeholder="报销日期" style="margin-left:0px;width:100%" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="编号" prop="reimbursementNo" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.reimbursementNo" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="出差人" prop="bussinessPeopleName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.bussinessPeopleName" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="出差事由" prop="reason" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.reason" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="项目名称" prop="projectName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.projectName" readonly)
      div(style="height:500px;position: relative;")
        reimbursement-apply-detail(v-bind:reimbursementApplyId="formModel.id" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="报销总额" label-width="50px" style="flex:2;margin-right:-1px;")
          el-input(readonly)
        div.s-flex_item
          div.s-flex(style="border-bottom:1px solid #000;")
            el-form-item.kalix-form-table-td(label="预留金额￥" prop="borrowMoney" v-bind:label-width="labelWidth1")
              el-input(v-model="formModel.borrowMoney" readonly)
          div.s-flex
            el-form-item.kalix-form-table-td(label="退/补金额￥" prop="backMoney" v-bind:label-width="labelWidth1")
              el-input(v-model="formModel.backMoney" readonly)
      div.s-flex
        el-form-item.s-flex_item.label-center(label="附单据张数合计（对应上方的项目）" label-width="304px")
        el-form-item.s-flex_item.kalix-form-table-td(label="城际交通" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.cjjt" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label="其他" v-bind:labelWidth="labelWidth")
          div.s-flex
            el-input.s-flex_item.kalix-form-table-td(v-model="formModel.qt1" readonly)
            el-input.s-flex_item.kalix-form-table-td(v-model="formModel.qt2" readonly)
</template>

<script type="text/ecmascript-6">
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import Detail from './detail.vue'

  export default {
    props: ['formModel'],
    data() {
      return {
        label_width: 110
      }
    },
    components: {
      KalixDatePicker: DatePicker,
      ReimbursementApplyDetail: Detail
    },
    computed: {
      labelWidth() {
        return this.label_width + 'px'
      },
      labelWidth1() {
        return (this.label_width + 1) + 'px'
      }
    }
  }
</script>
