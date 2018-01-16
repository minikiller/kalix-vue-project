<!--
描述：办公自动化-红头文件申请-新增组件
开发人：sunlf
开发日期：2017年12月20日
-->
<template lang="pug">
  kalix-dialog.user-add(ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL" v-bind:submitBefore="submitBefore")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院红头文件申请表
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      <!--el-form-item(label="文件种类" v-bind:label-width="labelWidth" prop="docCategory" v-bind:rules="rules.docCategory")-->
      <!--el-radio-group(v-model="formModel.docCategory" v-on:change="onChange")-->
      <!--el-radio(label="对内") 对内-->
      <!--el-radio(label="对外") 对外-->
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth" prop="orgId" v-bind:rules="rules.orgId")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item(label="文号类型" v-bind:label-width="labelWidth"  prop="docAssort" v-bind:rules="rules.docAssort")
          el-cascader(expand-trigger="hover"    v-bind:options="options"    v-model="formModel.docAssort" v-bind:show-all-levels="false" v-on:change="onChange")
          <!--kalix-dict-select(v-model="formModel.docType" appName="oa" dictType="文号类型")-->
      el-form-item.s-flex_item.kalix-form-table-td(label="发文内容" v-bind:label-width="labelWidth" prop="docContent" v-bind:rules="rules.docContent")
        el-input(v-model="formModel.docContent" type="textarea")
      el-form-item.s-flex_item.kalix-form-table-td(label="发文内容" v-bind:label-width="labelWidth" prop="docContent" v-bind:rules="rules.docContent")
        tinymce(v-model="formModel.docContent")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="打印人" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.printer")
        el-form-item.s-flex_item.kalix-form-table-td(label="校对人" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.checker")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="页数" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.page" v-bind:min="1" v-bind:max="20" style="width:100%")
        el-form-item.s-flex_item.kalix-form-table-td(label="份数" v-bind:label-width="labelWidth")
          el-input-number(v-model="formModel.number" v-bind:min="1" v-bind:max="100" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import {RedheadApplyURL} from '../config.toml'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import FormModel from './model'
  import Tinymce from '@/third/Tinymce'
  export default {
    watch: {
      formModel: {
        handler: function (val, oldVal) {
        },
        deep: true
      },
      'formModel.docType': function (val, oldVal) {
        if (this.$refs.kalixBizDialog.isEdit) {
          if (val > 1) {
            this.formModel.docAssort = ['对内', String(val)]
            console.log('this.formModel.docAssort is ', this.formModel.docAssort)
          } else {
            this.formModel.docAssort = ['对外', '1']
          }
        }
      },
      'formModel.docAssort': function (val, oldVal) {
        console.log('this.formModel.docType is ', this.formModel.docType)
      }
    },
    created() {
      this.labelWidth = '110px'
    },
    mounted() {

    },
    data() {
      return {
        targetURL: RedheadApplyURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}],
          docAssort: [{required: true, message: '请选择文号类型', trigger: 'blur'}],
          docContent: [{required: true, message: '请输入发文内容', trigger: 'blur'}]
        },
        options: [{
          value: '对外',
          label: '对外',
          children: [{
            label: '吉动院字',
            value: '1'
          }]
        }, {
          value: '对内',
          label: '对内',
          children: [
            {
              label: '吉动院人字',
              value: '2'
            },
            {
              label: '吉动院教字',
              value: '3'
            },
            {
              label: '吉动院学字',
              value: '4'
            },
            {
              label: '吉动院招字',
              value: '5'
            },
            {
              label: '吉动院研字',
              value: '6'
            },
            {
              label: '吉动院学位字',
              value: '7'
            },
            {
              label: '吉动校友字',
              value: '8'
            },
            {
              label: '吉动院研学字',
              value: '9'
            },
            {
              label: '吉动院字',
              value: '10'
            }
          ]
        }]
      }
    },
    methods: {
      submitBefore(baseDialog, callBack) {
        // this.formModel.docType = this.formModel.docAssort[1]
        callBack()
      },
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      },
      onChange(value) {
        this.formModel.docType = value[1]
      }
    },
    components: {
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect,
      KalixDialog: Dialog,
      Tinymce
    }
  }
</script>

<style scoped lang="stylus">

</style>
