<!--
描述：艺术中心-职能类别设置
开发人：fengjing
开发日期：2017年12月01日
-->

<template lang="pug">
  keep-alive
    Kalix-tree-grid(
    v-bind:items='data'
    v-bind:columns='columns'
    v-bind:targetURL="targetURL"
    title="职能类别列表"
    bizSearch="FunctionCategorySearch"
    v-bind:btnList="btnList"
    v-bind:bizDialog="bizDialog"
    v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import TreeGrid from '@/components/custom/treeGrid'
  import {registerComponent} from '@/api/register'
  //  import Vue from 'vue'
  import {FunctionCategroyURL, FunctionCategoryComponent, ToolButtonList} from '../config.toml'
  // 注册全局组件
  registerComponent(FunctionCategoryComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: FunctionCategroyURL,
        formModel: Object.assign({}, FormModel),
        columns: [{
          type: 'hidden',
          key: 'id',
          width: '0'
        }, {
          title: '名称',
          key: 'name',
          width: '150'
        }, {
          title: '机构代码',
          key: 'code',
          sortable: true,
          width: '150'
        }, {
          title: '创建人',
          key: 'createBy',
          width: '150'
        }, {
          title: '创建日期',
          key: 'creationDate',
          width: '150'
        }, {
          title: '操作',
          type: 'action',
          actions: [{
            type: 'primary',
            text: '编辑',
            icon: 'el-icon-edit'
          }, {
            type: 'error',
            text: '删除',
            icon: 'el-icon-delete'
          }],
          width: '150'
        }],
        data: [{
          id: '1',
          code: '0001',
          name: '测试数据1',
          status: '启用',
          remark: '测试数据测试数据',
          _checked: true
        }, {
          id: '2',
          code: '0002',
          name: '测试数据2',
          status: '启用',
          remark: '测试数据测试数据',
          children: [{
            id: '01',
            code: '00001',
            name: '测试数据01',
            status: '启用',
            remark: '测试数据测试数据'
          }, {
            id: '02',
            code: '00002',
            name: '测试数据02',
            status: '启用',
            remark: '测试数据测试数据'
          }]
        }, {
          id: '3',
          code: '0003',
          name: '测试数据3',
          status: '启用',
          remark: '测试数据测试数据'
        }, {
          id: '4',
          code: '0004',
          name: '测试数据4',
          status: '启用',
          remark: '测试数据测试数据'
        }],
        bizDialog: [
          {id: 'view', dialog: 'FunctionCategoryView'},
          {id: 'edit', dialog: 'FunctionCategoryAdd'},
          {id: 'add', dialog: 'FunctionCategoryAdd'}
        ]
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
//      this.dictComponent.forEach((item) => {
//        console.log(`[kalix]-[${this.bizKey}] registry name is:  ${item.name}, registry path is: ${item.path}`)
//        Vue.component(item.name, require('' + item.path))
//      })
    },
    methods: {},
    components: {
      KalixTreeGrid: TreeGrid
//      KalixUserAdd: UserAdd
    }
  }
</script>

<style scoped lang="stylus">

</style>
