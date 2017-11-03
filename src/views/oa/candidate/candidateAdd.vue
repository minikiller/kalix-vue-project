<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="candidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="人员类别" prop="personCategory" v-bind:rules="rules.personCategory" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.personCategory" appName="oa" dictType="招聘人员类别" style="width:100%")
        el-form-item.s-flex_item(label="专业" prop="major" v-bind:rules="rules.major" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.major")
      div.s-flex
        el-form-item.s-flex_item(label="所在部门" prop="orgId" v-bind:rules="rules.orgId" v-bind:label-width="labelWidth")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item(label="最后学历" prop="education" v-bind:rules="rules.education" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.education")
      div.s-flex
        el-form-item.s-flex_item(label="姓名" prop="xm" v-bind:rules="rules.xm" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.xm")
        el-form-item.s-flex_item(label="户口所在地" prop="residence" v-bind:rules="rules.residence" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.residence")
      div.s-flex
        el-form-item.s-flex_item(label="性别" prop="sex" v-bind:rules="rules.sex" v-bind:label-width="labelWidth")
          kalix-dict-select(v-model="formModel.sex" appName="oa" dictType="性别" style="width:100%")
        el-form-item.s-flex_item(label="应聘岗位" prop="position" v-bind:rules="rules.position" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.position")
      div.s-flex
        el-form-item.s-flex_item(label="年龄" prop="age" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.age" style="width:100%")
        el-form-item.s-flex_item(label="期望工资" prop="salary" v-bind:rules="rules.salary" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.salary")
      div.s-flex
        el-form-item.s-flex_item(label="联系电话" prop="tel" v-bind:rules="rules.tel" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.tel")
        el-form-item.s-flex_item(label="从业经验" prop="experience" v-bind:rules="rules.experience" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.experience")
      div.s-flex
        el-form-item.s-flex_item(label="毕业学校" prop="graduateSchool" v-bind:rules="rules.graduateSchool" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.graduateSchool")
        el-form-item.s-flex_item(label="备注" prop="comment" v-bind:label-width="labelWidth")
          el-input(type="textarea" v-model="formModel.comment")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {CandidateURL} from '../config.toml'
  import Cache from 'common/cache'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          personCategory: [{type: 'number', required: true, message: '请选择人员类别', trigger: 'change'}],
          orgId: [{type: 'number', required: true, message: '请选择所在部门', trigger: 'change'}],
          xm: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          sex: [{type: 'number', required: true, message: '请选择性别', trigger: 'change'}],
          tel: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
          graduateSchool: [{required: true, message: '请输入毕业学校', trigger: 'blur'}],
          major: [{required: true, message: '请输入专业', trigger: 'blur'}],
          education: [{required: true, message: '请输入最后学历', trigger: 'blur'}],
          residence: [{required: true, message: '请输入户口所在地', trigger: 'blur'}],
          position: [{required: true, message: '请输入应聘岗位', trigger: 'blur'}],
          salary: [{required: true, message: '请输入期望工资', trigger: 'blur'}],
          experience: [{required: true, message: '请输入从业经验', trigger: 'blur'}]
        },
        targetURL: CandidateURL,
        labelWidth: '110px',
        orgNameOptions: []
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixOrgSelect: UserOrgSelect
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
