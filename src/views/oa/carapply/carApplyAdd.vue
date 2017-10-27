<!--
描述：办公自动化-用车申请-新增组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="carApply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院用车申请表
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgId" v-bind:rules="rules.orgId" v-bind:label-width="labelWidth")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
      el-form-item(label="用车事由" prop="reason" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.reason")
      div.s-flex
        div.s-flex_item
          div.s-flex
            el-form-item.kalix-form-table-td(label="乘车人数" prop="usageCount" v-bind:label-width="labelWidth")
              el-input-number(v-model="formModel.usageCount" v-bind:min="1" v-bind:max="10" style="width:100%")
            el-form-item.s-flex_item.kalix-form-table-td(label="用车时段" v-bind:label-width="labelWidth")
        div.s-flex_item(style="margin-left:-1px")
          div.s-flex
            div.s-flex_item
              kalix-date-time-picker(v-model="formModel.beginDate" placeholder="选择开始时间" style="margin-left:1px;width:100%")
            div(style="line-height:32px") 至
            div.s-flex_item
              kalix-date-time-picker(v-model="formModel.endDate" placeholder="选择结束时间" style="width:100%")
      el-form-item(label="用车起始地点" prop="address" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.address")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="用车情况" prop="city" v-bind:label-width="labelWidth")
          div(style="text-align:center")
            el-checkbox(v-model="formModel.city") 是否市内用车
        el-form-item.s-flex_item.kalix-form-table-td(label="联系电话" prop="operatorPhone" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.operatorPhone")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {CarApplyURL} from '../config.toml'
  import Cache from 'common/cache'
  import Dialog from '@/components/custom/baseDialog.vue'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}]
        },
        targetURL: CarApplyURL,
        labelWidth: '110px',
        orgNameOptions: []
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
