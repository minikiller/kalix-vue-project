<!--
描述：人员管理-教师维护组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="teacher" title='教师列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'ResearchTeacherSearch'" v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {TeacherURL, TeacherComponent, ToolButtonList, ResearchCacheKey} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(TeacherComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: ResearchCacheKey,
          type: '职称',
          targetField: 'positionalTitlesDict',
          sourceField: 'positionalTitles'
        }],
        btnList: ToolButtonList,
        targetURL: TeacherURL,
        tableFields: [
          {prop: 'name', label: '姓名'},
          {prop: 'identificationCard', label: '身份证号'},
          {prop: 'sex', label: '性别'},
          {prop: 'orgName', label: '单位部门'},
          {prop: 'positionalTitlesDict', label: '职称'},
          {prop: 'mobile', label: '手机'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchTeacherView'},
          {id: 'edit', dialog: 'ResearchTeacherAdd'},
          {id: 'add', dialog: 'ResearchTeacherAdd'}
        ]
      }
    },
    components: {
      BaseTable
    },
    activated() {
      console.log(this.bizKey + '  is activated')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    }
  }
</script>

<style scoped lang="stylus">

</style>
