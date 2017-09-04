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
  import EventBus from 'common/eventbus'

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
          {prop: 'name', label: '姓名'},
          {prop: 'email', label: '电子邮件'},
          {prop: 'phone', label: '联系电话'},
          {prop: 'identificationCard', label: '身份证号'},
          {prop: 'age', label: '年龄'},
          {prop: 'sex', label: '性别'},
          {prop: 'lastTitle', label: '职称'},
          {prop: 'education', label: '学历'},
          {prop: 'school;', label: '毕业院校'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchWorkerView'},
          {id: 'edit', dialog: 'ResearchWorkerAdd'},
          {id: 'add', dialog: 'ResearchWorkerAdd'}
        ],
        formModel: {
          name: '',
          email: '',
          phone: '',
          identificationCard: '',
          age: '',
          sex: '',
          lastTitle: '',
          education: '',
          school: ''
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
    methods: {
      changeFormModel(model) {
        console.log('changeFormModel', model)
        this.formModel = model
      }
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    },
    mounted() {
      EventBus.$on('updateWorkerModel', this.changeFormModel)
    }
  }
</script>

<style scoped lang="stylus">

</style>
