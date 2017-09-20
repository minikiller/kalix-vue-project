<!--
描述：计划任务 - 系统管理 - 字典管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="scheduleDict"
    title='字典查询'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchScheduleDictSearch'"
    v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  //  import Vue from 'vue'
  import {ScheduleDictsURL, ScheduleDictsComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(ScheduleDictsComponent)

  export default {
    name: 'scheculedict',
    activated() {
      console.log(this.bizKey + '  is activated')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: ScheduleDictsURL,
        // 搜索框
        search: {
          filters: [
            {label: '类型', prop: 'type'}
          ],
          rules: {
            type: [
              {required: true, message: '请输入类型', trigger: 'blur'}
            ]
          }
        },
        formModel: {
          type: '',
          label: '',
          description: ''
        },
        // 对话框表单验证项
        formRules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入标签名', trigger: 'blur'}]
        },
        bizDialog: [
          {id: 'view', dialog: 'ResearchScheduleDictView'},
          {id: 'edit', dialog: 'ResearchScheduleDictAdd'},
          {id: 'add', dialog: 'ResearchScheduleDictAdd'}
        ],
        tableFields: [
          {prop: 'type', label: '类型'},
          {prop: 'label', label: '签名'},
          {prop: 'value', label: '数值'},
          {prop: 'createBy', label: '创建人'},
          {prop: 'creationDate', label: '创建日期'}
        ]
      }
    },
    components: {
      BaseTable
    },
    methods: {
      openAttachmentUpload() {
        this.$refs.attachmentUpload.open()
      }
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
  @import "../../../assets/stylus/color"
  .schedule-dict
    .dialog-form
      text-align left
</style>

