<!--
描述：办公自动化-报销申请-查看组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    // div.table-title 吉林动画学院报销申请表
    div.table-title 吉林动画学院差旅费用报销单
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="名称" v-bind:label-width="labelWidth" prop="title")
          el-input(v-model="formModel.title" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label=" 创建时间" prop="creationDate" v-bind:label-width="labelWidth")
          kalix-date-time-picker(v-model="formModel.creationDate" style="width:100%" readonly)
        el-form-item.s-flex_item.kalix-form-table-td(label=" 申请时间" prop="applyDate" v-bind:label-width="labelWidth")
          kalix-date-time-picker(v-model="formModel.applyDate" style="width:100%" readonly)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.orgName" readonly)
        el-form-item.kalix-form-table-td(label="报销日期" prop="reimbursementDate" v-bind:label-width="labelWidth")
          kalix-date-picker(v-model="formModel.reimbursementDate" placeholder="报销日期" style="margin-left:0px;width:100%" readonly)
        el-form-item.kalix-form-table-td(label="编号" prop="businessNo" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.businessNo" readonly)
      div.s-flex
        el-form-item.kalix-form-table-td(label="出差人" prop="bussinessPeopleId" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.bussinessPeopleId" readonly)
        el-form-item.kalix-form-table-td(label="出差事由" prop="reason" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.reason" readonly)
        el-form-item.kalix-form-table-td(label="项目名称" prop="projectName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.projectName" readonly)

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
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    props: ['formModel'],
    data() {
      return {
        labelWidth: '110px'
      }
    },
    components: {
      KalixDateTimePicker: DateTimePicker,
      KalixDatePicker: DatePicker
    }
  }
</script>
