<!--
描述：我的首页-数据字典组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="commondict" title='字典列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    bizSearch="CommonDictSearch" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {CommonDictURL, CommonDictComponent, ToolButtonList} from '../config.toml'

  // 注册全局组件
  CommonDictComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: CommonDictURL,
        tableFields: [
          {prop: 'type', label: '类型'},
          {prop: 'label', label: '签名'},
//          {prop: 'value', label: '数值'},
          {prop: 'description', label: '备注'},
          {prop: 'createBy', label: '创建人'},
          {prop: 'creationDate', label: '创建日期'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'CommonDictView'},
          {id: 'edit', dialog: 'CommonDictAdd'},
          {id: 'add', dialog: 'CommonDictAdd'}
        ],
        formModel: {
          type: '',
          label: '',
          value: '',
          description: '',
          createBy: '',
          creationDate: ''
        },
        formRules: {
          type: [
            {required: true, message: '请输入类型', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    methods: {},
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>

<style scoped lang="stylus">

</style>
