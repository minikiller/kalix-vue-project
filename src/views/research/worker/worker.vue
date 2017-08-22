<!--
描述：人员管理-科技人员维护组件
开发人：hqj
开发日期：2017年8月21日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="worker" title='科研人员列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchWorkerSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {WorkerURL, WorkerComponent, ToolButtonList} from '../config.toml'

  // 注册全局组件
  WorkerComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    activated() {
      console.log(this.bizKey + '  is activated')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: WorkerURL,
        tableFields: [
          {prop: 'identificationCard', label: '身份证号'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'mobile', label: '手机'},
          {prop: 'positionalTitles', label: '职称'},
          {prop: 'resume', label: '个人简历'},
          {prop: 'introduction', label: '个人说明'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchWorkerView'},
          {id: 'edit', dialog: 'ResearchWorkerAdd'},
          {id: 'add', dialog: 'ResearchWorkerAdd'}
        ],
        formModel: {
          identificationCard: '',
          name: '',
          sex: '',
          mobile: '',
          positionalTitles: '',
          resume: '',
          introduction: ''
        },
        formRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          identificationCard: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
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
