<!--
描述：展赛信息管理组件
开发人：fj
开发日期：2017年9月05日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="competitionInfo" title='展赛列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'ResearchCompetitionInfoSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {CompetitionInfoURL, CompetitionInfoComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(CompetitionInfoComponent)

  export default {
    activated() {
      console.log('c%' + this.bizKey + ' competitioninfo  is activated', 'color:#ff00fe')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: CompetitionInfoURL,
        tableFields: [
          {prop: 'name', label: '展赛名称'},
          {prop: 'address', label: '展赛地址'},
          {prop: 'contactor', label: '联系人'},
          {prop: 'phone', label: '联系人电话'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchCompetitionInfoView'},
          {id: 'edit', dialog: 'ResearchCompetitionInfoAdd'},
          {id: 'add', dialog: 'ResearchCompetitionInfoAdd'}
        ]
      }
    },
    created() {
    },
    methods: {},
    components: {
      BaseTable
    },
    mounted() {
    }
  }
</script>

<style scoped lang="stylus">

</style>
