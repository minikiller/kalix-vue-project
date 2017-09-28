<!--
描述：人员管理-科技人员维护组件
开发人：hqj
开发日期：2017年8月21日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="worker" title='科研人员列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'ResearchWorkerSearch'" v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {WorkerURL, WorkerComponent, ToolButtonList, ResearchCacheKey} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(WorkerComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: ResearchCacheKey,
          type: '职称',
          targetField: 'lastTitleDict',
          sourceField: 'lastTitle'
        }],
        btnList: ToolButtonList,
        targetURL: WorkerURL,
        tableFields: [
          {prop: 'name', label: '姓名'},
          {prop: 'identificationCard', label: '身份证号'},
          {prop: 'sex', label: '性别'},
          {prop: 'orgName', label: '单位部门'},
          {prop: 'lastTitleDict', label: '职称'},
          {prop: 'phone', label: '联系电话'},
          {prop: 'email', label: '电子邮件'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchWorkerView'},
          {id: 'edit', dialog: 'ResearchWorkerAdd'},
          {id: 'add', dialog: 'ResearchWorkerAdd'}
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
