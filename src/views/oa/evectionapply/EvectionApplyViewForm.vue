<!--
描述：办公自动化-出差申请-查看组件
开发人：fj
开发日期：2017年10月19日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院出差申请表
    el-form-item(label="项目名称" v-bind:label-width="labelWidth" prop="projectName")
      el-input(v-model="formModel.projectName" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgName" v-bind:label-width="labelWidth")
        kalix-org-select(v-model="formModel.orgName" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="申请时间" prop="applyDate"  v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.applyDate" style="width:100%" readonly)
    el-form-item(label="出差原因" prop="reason" v-bind:label-width="labelWidth")
      el-input(v-model="formModel.reason" readonly)
    div.s-flex
      div.s-flex_item
        div.s-flex
          el-form-item.kalix-form-table-td(label="申请人" prop="" v-bind:label-width="labelWidth")
            el-input(v-bind:min="1" v-bind:max="10" style="width:236px" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="出差时段" v-bind:label-width="labelWidth")
      div.s-flex_item(style="margin-left:-1px;text-align:center")
        div.s-flex
          div.s-flex_item
            kalix-date-time-picker(v-model="formModel.beginDate"  style="margin-left:1px;width:100%" readonly)
          div(style="line-height:32px") 至
          div.s-flex_item
            kalix-date-time-picker(v-model="formModel.endDate"  style="width:100%" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="部门负责人" prop="depUser" v-bind:label-width="labelWidth")
        div(style="text-align:center")
          el-input(v-model="formModel.depUser" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="董事长" prop="chairmanUser" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.chairmanUser" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="会计" prop="accountantUser" v-bind:label-width="labelWidth")
        div(style="text-align:center")
          el-input(v-model="formModel.accountantUser" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="出纳" prop="cashierUser" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.cashierUser" readonly)
</template>

<script type="text/ecmascript-6">
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'

  export default {
    props: ['formModel'],
    data() {
      return {
        labelWidth: '110px'
      }
    },
    components: {
      KalixDateTimePicker: DateTimePicker
    }
  }
</script>
