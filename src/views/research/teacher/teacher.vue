<!--
描述：人员管理-教师维护组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  base-table(title='教师列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
  v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
  v-bind:bizSearch="'ResearchTeacherSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {TeacherURL, TeacherComponent, ToolButtonList} from '../config.toml'

  // 注册全局组件
  TeacherComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: TeacherURL,
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
          {id: 'view', dialog: 'ResearchTeacherView'},
          {id: 'edit', dialog: 'ResearchTeacherAdd'},
          {id: 'add', dialog: 'ResearchTeacherAdd'}
        ],
        formModel: {
          identificationCard: '',
          name: '',
          sex: '',
          mobile: '',
          positionalTitles: '',
          resume: '',
          introduction: '',
          learning: '',
          teaching: ''
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
