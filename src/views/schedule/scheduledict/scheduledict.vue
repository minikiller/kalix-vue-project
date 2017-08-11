<!--
描述：计划任务 - 系统管理 - 字典管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template lang="pug">
  div.schedule-dict
    kalix-search(ref="mySearch" title="字典查询"
    v-bind:filters="search.filters"
    v-bind:formRules="search.rules"
    v-on:onDataRefresh="onRefresh"
    )
      kalix-schedule-dict-search(slot="searchItem")
    kalix-wrapper(ref='myWrapper' title="字典列表" icon="iconfont icon-dict-management"
    v-bind:data-url="dataUrl"
    v-bind:request-data="requestData"
    v-on:tableView="tableView"
    v-on:tableEdit="tableEdit")
      <!-- 按钮 -->
      div(slot="toolbar")
        el-button(v-on:click="addData" type="primary")
          i.iconfont.icon-add
          | 添加
        el-button(v-on:click="refresh" type="primary")
          i.iconfont.icon-refresh
          | 刷新
      kalix-table-columns(slot="container")
    kalix-dialog(ref="kalixDialog"
    form-name="kalixScheduleDitDialogForm"
    v-bind:formModel="formModel"
    v-bind:rules="rules"
    v-bind:data-url="dataUrl"
    v-on:refreshData ="()=>{$refs.myWrapper.refresh()}")
      kalix-dialog-form(slot="dialog-container"
      ref="kalixScheduleDitDialogForm"
      parent-ref-name="kalixDialog"
      v-bind:parent-refs="$refs"
      v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import {ScheduleDictsURL} from 'config/global.toml'

  import KalixTableButtons from '@/components/table/tableButtons.vue'
  import KalixTableColumns from './scheduledictColumns'
  import ScheduleDitDialogForm from './scheduledictForm'
  import ScheduleDictSearch from './scheduledictSearch'

  export default {
    name: 'scheculedict',
    data() {
      return {
        dataUrl: ScheduleDictsURL,
        // 请求参数
        requestData: {},
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
          id: 0,
          type: '',
          label: '',
          description: '',
          types: []
        },
        // 对话框表单验证项
        rules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入标签名', trigger: 'blur'}]
        }
      }
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    mounted() {
    },
    methods: {
      onRefresh(_requestData) {
        this.requestData = _requestData
        this.refresh()
      },
      addData() {
        // 打开对话框
        this.resetDialogForm()
        this.$refs.kalixDialog.open('添加')
      },
      refresh() {
        this.$refs.myWrapper.refresh()
      },
      resetDialogForm() {
        // 清空form
        this.formModel = JSON.parse(this.tempFormModel)
      },
      tableView(row) {
        Object.assign(this.formModel, row)
        // 打开对话框
        this.$refs.kalixDialog.open('查看', true)
      },
      tableEdit(row) {
        Object.assign(this.formModel, row)
        // 打开对话框
        this.$refs.kalixDialog.open('修改')
      }
    },
    components: {
      KalixTableButtons,
      KalixTableColumns,
      KalixDialogForm: ScheduleDitDialogForm,
      KalixScheduleDictSearch: ScheduleDictSearch
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
  @import "../../../assets/stylus/color"
  .schedule-dict
    .dialog-form
      text-align left
</style>

