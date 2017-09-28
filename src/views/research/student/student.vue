<!--
描述：人员管理-学生维护组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="student" title='学生列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'ResearchStudentSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {StudentURL, StudentComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(StudentComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: StudentURL,
        tableFields: [
          {prop: 'studentNo', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'className', label: '班级'},
          {prop: 'province', label: '生源省份'},
          {prop: 'entranceYear', label: '入学年份'},
          {prop: 'homePhone', label: '家庭联系电话'},
          {prop: 'address', label: '联系地址'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchStudentView'},
          {id: 'edit', dialog: 'ResearchStudentAdd'},
          {id: 'add', dialog: 'ResearchStudentAdd'}
        ]
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    activated() {
      console.log('c%' + this.bizKey + ' student  is activated', 'color:#ff00fe')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">

</style>
