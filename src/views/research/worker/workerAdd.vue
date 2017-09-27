<!--
描述：人员管理-科研人员信息维护-新增组件
开发人：hqj
开发日期：2017年8月22日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="worker" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="科研人员姓名" prop="name" v-bind:rules="rules.name" label-width="120px")
          kalix-user-select(v-bind:params="params" style="width:100%" v-model="formModel.name" v-bind:multiple="false"
          v-on:userSelected="onUserSelected")
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="120px")
          el-input(v-model="formModel.identificationCard")
      div.s-flex
        el-form-item.s-flex_item(label="性别" prop="sex" label-width="120px")
          el-radio-group(v-model="formModel.sex")
            el-radio(label="男")
            el-radio(label="女")
        el-form-item.s-flex_item(label="出生日期" prop="birthday" label-width="120px")
          kalix-date-picker(v-model="formModel.birthday")
      div.s-flex
        el-form-item.s-flex_item(label="民族" prop="nation" label-width="120px")
          el-input(v-model="formModel.nation")
        el-form-item.s-flex_item(label="籍贯" prop="placeOfOrigin" label-width="120px")
          el-input(v-model="formModel.placeOfOrigin")
      div.s-flex
        el-form-item.s-flex_item(label="联系电话" prop="phone" label-width="120px")
          el-input(v-model="formModel.phone")
        el-form-item.s-flex_item(label="电子邮件" prop="email" label-width="120px")
          el-input(v-model="formModel.email")
      el-form-item.s-flex_item(label="单位部门" prop="orgId" label-width="120px")
        org-tree.inline(v-model="formModel.orgId" v-bind:isAll="true")
      div.s-flex
        el-form-item.s-flex_item(label="最初职称" prop="firstTitle" label-width="120px")
          kalix-dict-select(v-model="formModel.firstTitle" appName="research" dictType="职称")
        el-form-item.s-flex_item(label="最初评定时间" prop="firstEvaluateDate" label-width="120px")
          kalix-date-picker(v-model="formModel.firstEvaluateDate")
      div.s-flex
        el-form-item.s-flex_item(label="最后职称" prop="lastTitle" label-width="120px")
          kalix-dict-select(v-model="formModel.lastTitle" appName="research" dictType="职称")
        el-form-item.s-flex_item(label="最后评定时间" prop="lastEvaluateDate" label-width="120px")
          kalix-date-picker(v-model="formModel.lastEvaluateDate")
      div.s-flex
        el-form-item.s-flex_item(label="最后学历" prop="education" label-width="120px")
          el-input(v-model="formModel.education")
        el-form-item.s-flex_item(label="最后学位" prop="degree" label-width="120px")
          el-input(v-model="formModel.degree")
      div.s-flex
        el-form-item.s-flex_item(label="毕业院校" prop="school" label-width="120px")
          el-input(v-model="formModel.school")
        el-form-item.s-flex_item(label="研究方向" prop="direction" label-width="120px")
          el-input(v-model="formModel.direction")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {WorkerURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import UserSelect from '@/components/biz/userselect/userselect'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入科研人员姓名', trigger: 'blur'}]
        },
        targetURL: WorkerURL,
        params: {userType: 2}
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixUserSelect: UserSelect,
      KalixDictSelect: BaseDictSelect,
      KalixDatePicker: DatePicker
    },
    created() {
      console.log('[workerAdd.vue created] this.formModel:', this.formModel)
    },
    methods: {
      onUserSelected(user) {
        this.formModel.sex = user.sex
        this.formModel.phone = (user.mobile == null ? user.phone : user.mobile)
        this.formModel.email = user.email
      }
    }
  }
</script>


