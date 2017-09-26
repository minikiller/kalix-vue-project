<!--
描述：人员管理-老师维护-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="teacher" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="教师姓名" prop="name" label-width="200px")
          el-input(v-model="formModel.name" readonly)
        el-form-item.s-flex_item(label="身份证号" prop="identificationCard" label-width="120px")
          el-input(v-model="formModel.identificationCard" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="性别" prop="sex" label-width="120px")
          el-radio-group(v-model="formModel.sex" disabled)
            el-radio(label="男")
            el-radio(label="女")
        el-form-item.s-flex_item(label="手机" prop="mobile" label-width="120px")
          el-input(v-model="formModel.mobile" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="单位部门" prop="orgId" label-width="120px")
          org-tree.inline(v-model="formModel.orgId" v-bind:isAll="true" disabled)
        el-form-item.s-flex_item(label="职称" prop="positionalTitles" label-width="120px")
          kalix-dict-select(v-model="formModel.positionalTitles" appName="research" dictType="职称" disabled)
      div.s-flex
        el-form-item.s-flex_item(label="个人简历" prop="resume" label-width="120px")
          el-input(type="textarea" v-model="formModel.resume" readonly)
        el-form-item.s-flex_item(label="个人说明" prop="introduction" label-width="120px")
          el-input(type="textarea" v-model="formModel.introduction" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="学术研究" prop="learning" label-width="120px")
          el-input(type="textarea" v-model="formModel.learning" readonly)
        el-form-item.s-flex_item(label="教学情况" prop="teaching" label-width="120px")
          el-input(type="textarea" v-model="formModel.teaching" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="擅长课程" prop="coursesSkills" label-width="120px")
          el-input(type="textarea" v-model="formModel.coursesSkills" readonly)
        el-form-item.s-flex_item(label="预备知识" prop="preliminary" label-width="120px")
          el-input(type="textarea" v-model="formModel.preliminary" readonly)
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect
    }
  }
</script>
