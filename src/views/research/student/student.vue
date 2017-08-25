<!--
描述：人员管理-学生维护组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="student" title='学生列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchStudentSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {StudentURL, StudentComponent, ToolButtonList} from '../config.toml'

  // 注册全局组件
  StudentComponent.forEach((item) => {
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
        targetURL: StudentURL,
        tableFields: [
          {prop: 'studentNo', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'sclass', label: '班级'},
          {prop: 'major', label: '专业'},
          {prop: 'college', label: '院部'},
          {prop: 'entranceYear', label: '入学年份'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchStudentView'},
          {id: 'edit', dialog: 'ResearchStudentAdd'},
          {id: 'add', dialog: 'ResearchStudentAdd'}
        ],
        formModel: {
          identificationCard: '',
          name: '',
          sex: '',
          sclass: '',
          major: '',
          college: '',
          entranceYear: '',
          studentNo: '',
          instructor: '',
          nation: '',
          placeOfOrigin: '',
          politicalStatus: '',
          address: '',
          postalcode: '',
          province: '',
          trainingLevel: '',
          period: ''
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
