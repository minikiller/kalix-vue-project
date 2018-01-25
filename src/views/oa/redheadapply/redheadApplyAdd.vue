<!--
描述：办公自动化-红头文件申请-新增组件
开发人：sunlf
开发日期：2017年12月20日
-->
<template lang="pug">
  kalix-dialog.user-add(
  bizKey="sealApply"
  ref="kalixBizDialog" v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL"
  v-on:KalixDialogOpen="kalixDialogOpen"
  v-on:KalixDialogClose="kalixDialogClose")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院红头文件申请表-id {{formModel.id}}
      el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" v-bind:label-width="labelWidth" prop="orgId" v-bind:rules="rules.orgId")
          kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")
        el-form-item.s-flex_item(label="文号类型" v-bind:label-width="labelWidth"  prop="docAssort" v-bind:rules="rules.docAssort")
          el-cascader(expand-trigger="hover"    v-bind:options="options"    v-model="formModel.docAssort" v-bind:show-all-levels="false" v-on:change="onChange")
          <!--kalix-dict-select(v-model="formModel.docType" appName="oa" dictType="文号类型")-->
      <!--el-form-item.s-flex_item.kalix-form-table-td(label="发文内容" v-bind:label-width="labelWidth" prop="docContent" v-bind:rules="rules.docContent")-->
        <!--el-input(v-model="formModel.docContent" type="textarea")-->
      el-form-item.s-flex_item.kalix-form-table-td(label="发文内容" v-bind:label-width="labelWidth" prop="docContent" v-bind:rules="rules.docContent")
        tinymce(v-model="formModel.docContent" ref="editor")
    <!--div.s-flex-->
    <!--el-form-item.s-flex_item.kalix-form-table-td(label="打印人" v-bind:label-width="labelWidth")-->
    <!--el-input(v-model="formModel.printer")-->
    <!--el-form-item.s-flex_item.kalix-form-table-td(label="校对人" v-bind:label-width="labelWidth")-->
    <!--el-input(v-model="formModel.checker")-->
    <!--div.s-flex-->
    <!--el-form-item.s-flex_item.kalix-form-table-td(label="页数" v-bind:label-width="labelWidth")-->
    <!--el-input-number(v-model="formModel.page" v-bind:min="1" v-bind:max="20" style="width:100%")-->
    <!--el-form-item.s-flex_item.kalix-form-table-td(label="份数" v-bind:label-width="labelWidth")-->
    <!--el-input-number(v-model="formModel.number" v-bind:min="1" v-bind:max="100" style="width:100%")-->
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
          console.log('===== handler is ', this.formModel)
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
      },
      'formModel.docContent': function (val, oldVal) {
        console.log('this.formModel.docContent is ', this.formModel.docContent)
        console.log('--- this.$refs.editor ', this.$refs.editor)
        // if (this.$refs.editor.$data.status === 2) {
        //   this.$refs.editor.setContent(val)
        // }
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
        setting: {
          height: 200,
          language_url: 'langs/zh_CN.js',
          block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;'
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
      kalixDialogOpen() {
        this.$nextTick(() => {
          console.log('%c ==== KalixDialogOpen ==== ', 'color:#FFF;background:#055', this.$refs.editor)
          this.$refs.editor.initTinymce()
        })
      },
      kalixDialogClose() {
        this.$refs.editor.destroyTinymce()
      },
      submitBefore(baseDialog, callBack) {
        // this.formModel.docType = this.formModel.docAssort[1]
        callBack()
      },
      submitAfter() {
        // this.$refs.editor.destroyTinymce()
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
