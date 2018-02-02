<!--
描述：table 组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-base-panel(v-bind:title="title")
    kalix-base-table-original(slot="panleSlot"
    v-bind:bizKey="bizKey"
    v-bind:isFixedColumn="isFixedColumn"
    v-bind:toolbarBtnList="toolbarBtnList"
    v-bind:hasTableSelection="hasTableSelection"
    v-bind:dialogOptions="dialogOptions"
    v-bind:title="title"
    v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:bizSearch="bizSearch"
    v-bind:bizDialog="bizDialog"
    v-bind:formModel="formModel"
    v-bind:formRules="formRules"
    v-bind:targetURL="targetURL"
    v-bind:jsonStr="jsonStr"
    v-bind:tableFields="tableFields"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:customRender="customRender"
    v-bind:customTableTool="customTableTool"
    v-bind:customToolBar="customToolBar"
    v-bind:tableRowClassName="tableRowClassName"
    v-bind:deleteAllUrl="deleteAllUrl"
    v-bind:customToolbarClickEvents="customToolbarClickEvents"
    )
      slot(name="tableColumnSlot" slot="tableColumnSlot")
</template>

<script type="text/ecmascript-6">
  import KalixBasePanel from '@/components/panel/basePanel'
  import KalixBaseTableOriginal from '@/components/custom/baseTableOriginal'

  export default {
    name: 'baseTable',
    props: {
      isFixedColumn: {
        type: Boolean,
        default: false
      },
      toolbarBtnList: {   //  toolBar 中按钮数组
        type: Array,
        default: () => {
          return []
        }
      },
      hasTableSelection: { // 表格是否有选择框
        type: Boolean,
        default: false
      },
      dialogOptions: {},
      bizKey: {  // 主鍵
        type: String,
        required: true
      },
      title: {  // 表格组件标题名
        type: String,
        required: true
      },
      buttonPermissionPrefix: { //  table中tool的按钮组件认证前缀
        type: String,
        default: ''   // 为空时候，不校验权限
      },
      bizSearch: {  //  使用的搜索组件名称
        type: String
      },
      bizDialog: {  //  使用的对话框组件名称
        type: Array
      },
      formModel: {  //  新建，查看，编辑使用的 form 对象模型
        type: Object
//        required: true
      },
      formRules: {  //  from 对象验证参数
        type: Object
//        required: true
      },
      targetURL: {  //  列表操作请求的 URL 地址
        type: String
//        required: true
      },
      jsonStr: {  //  数据列表请求的查询条件
        type: String,
        default: ''
      },
      tableFields: {   //  数据列表的列名
        type: Array
      },
      btnList: {   //  table中按钮数组
        type: Array,
        required: true
      },
      dictDefine: {  // 数据字典定义
        type: Array
      },
      customRender: { // 对table的数据进行自定义的修饰
        type: Function
      },
      customTableTool: { // 对table的操作按钮进行自定义的操作
        type: Function
      },
      customToolBar: { // 对 ToolBar 的操作按钮进行自定义的操作
        type: Function
      },
      tableRowClassName: { // 对table的一行数据进行样式定制
        type: Function
      },
      deleteAllUrl: {
        type: String,
        default: ''
      },
      customToolbarClickEvents: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      KalixBasePanel,
      KalixBaseTableOriginal
    }
  }
</script>
