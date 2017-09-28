<!--
描述：人员管理-老师维护-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="teacher" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="教师姓名" prop="userId" v-bind:rules="rules.userId" label-width="120px" )
          kalix-user-select(v-bind:params="params" style="width:100%" v-model="user" v-bind:multiple="false"
          v-bind:userIds.sync="formModel.userId" v-on:userSelected="onUserSelected")
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="120px")
          el-input(v-model="formModel.identificationCard")
      div.s-flex
        el-form-item.s-flex_item(label="性别" prop="sex" label-width="120px")
          el-radio-group(v-model="formModel.sex")
            el-radio(label="男")
            el-radio(label="女")
        el-form-item.s-flex_item(label="手机" prop="mobile" label-width="120px")
          el-input(v-model="formModel.mobile")
      div.s-flex
        el-form-item.s-flex_item(label="单位部门" prop="orgId" label-width="120px")
          org-tree.inline(v-model="formModel.orgId" v-bind:isAll="true")
        el-form-item.s-flex_item(label="职称" prop="positionalTitles" label-width="120px")
          kalix-dict-select(v-model="formModel.positionalTitles" appName="research" dictType="职称")
      div.s-flex
        el-form-item.s-flex_item(label="个人简历" prop="resume" label-width="120px")
          el-input(type="textarea" v-model="formModel.resume")
        el-form-item.s-flex_item(label="个人说明" prop="introduction" label-width="120px")
          el-input(type="textarea" v-model="formModel.introduction")
      div.s-flex
        el-form-item.s-flex_item(label="学术研究" prop="learning" label-width="120px")
          el-input(type="textarea" v-model="formModel.learning")
        el-form-item.s-flex_item(label="教学情况" prop="teaching" label-width="120px")
          el-input(type="textarea" v-model="formModel.teaching")
      div.s-flex
        el-form-item.s-flex_item(label="擅长课程" prop="coursesSkills" label-width="120px")
          el-input(type="textarea" v-model="formModel.coursesSkills")
        el-form-item.s-flex_item(label="预备知识" prop="preliminary" label-width="120px")
          el-input(type="textarea" v-model="formModel.preliminary")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {TeacherURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import UserSelect from '@/components/biz/userselect/userselect'
  import BaseDictSelect from '@/components/custom/baseDictSelect'

  export default {
    data() {
      return {
        user: null,
        formModel: Object.assign({}, FormModel),
        rules: {
          userId: [{type: 'number', required: true, message: '请输入教师姓名', trigger: 'change'}]
        },
        targetURL: TeacherURL,
        params: {userType: 0}
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixUserSelect: UserSelect,
      KalixDictSelect: BaseDictSelect
    },
    created() {
      console.log('[teacherAdd.vue created] this.formModel:', this.formModel)
    },
    methods: {
      onUserSelected(user) {
        this.formModel.sex = user.sex
        this.formModel.mobile = (user.mobile == null ? user.phone : user.mobile)
      }
    }
  }
</script>

