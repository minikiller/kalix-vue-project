<template lang="pug">
  kalix-dialog.evection-add(bizKey="evectionApply" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院出差申请表
      el-form-item(label="项目名称" v-bind:label-width="labelWidth" prop="projectName" v-bind:rules="rules.projectName")
        el-input(v-model="formModel.projectName")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgId" v-bind:rules="rules.orgId" v-bind:label-width="labelWidth")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item.kalix-form-table-td(label="申请时间" prop="applyDate"  v-bind:label-width="labelWidth")
          kalix-date-time-picker(v-model="formModel.applyDate" placeholder="选择申请时间" style="width:100%")
      el-form-item(label="出差原因" prop="reason" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.reason")
      div.s-flex
        div.s-flex_item
          div.s-flex
            el-form-item.kalix-form-table-td(label="申请人" prop="" v-bind:label-width="labelWidth")
              el-input(v-bind:min="1" v-bind:max="10" style="width:100%")
            el-form-item.s-flex_item.kalix-form-table-td(label="出差时段" v-bind:label-width="labelWidth")
        div.s-flex_item(style="margin-left:-1px;text-align:center")
          div.s-flex
            div.s-flex_item
              kalix-date-time-picker(v-model="formModel.beginDate" placeholder="选择开始时间" style="margin-left:1px;width:100%")
            div(style="line-height:32px") 至
            div.s-flex_item
              kalix-date-time-picker(v-model="formModel.endDate" placeholder="选择结束时间" style="width:100%")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="部门负责人" prop="orgname" v-bind:label-width="labelWidth")
          div(style="text-align:center")
            el-input(v-model="formModel.orgname")
        el-form-item.s-flex_item.kalix-form-table-td(label="董事长" prop="chairmanuser" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.chairmanuser")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="会计" prop="accountantuser" v-bind:label-width="labelWidth")
          div(style="text-align:center")
            el-input(v-model="formModel.accountantuser")
        el-form-item.s-flex_item.kalix-form-table-td(label="出纳" prop="cashieruser" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.cashieruser")
</template>

<script>
  import FormModel from './model'
  import {EvectionApplyURL} from '../config.toml'
  import Cache from 'common/cache'
  import Dialog from '@/components/custom/baseDialog.vue'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px',
        targetURL: EvectionApplyURL,
        orgNameOptions: [],
        rules: {
          projectName: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}]
        }
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixOrgSelect: UserOrgSelect,
      KalixDateTimePicker: DateTimePicker
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

<style scoped>

</style>
