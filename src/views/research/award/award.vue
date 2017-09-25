<!--
描述：获奖信息管理组件
开发人：fj
开发日期：2017年9月20日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="award" title='获奖信息列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'ResearchAwardSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {AwardURL, AwardComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(AwardComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: AwardURL,
        tableFields: [
          {prop: 'competitionType', label: '展赛类型'},
          {prop: 'awardname', label: '获奖人'},
          {prop: 'awardLevel', label: '获奖级别'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchAwardView'},
          {id: 'edit', dialog: 'ResearchAwardAdd'},
          {id: 'add', dialog: 'ResearchAwardAdd'}
        ]
      }
    },
    created() {
    },
    methods: {
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    },
    mounted() {
    }
  }
</script>

<style scoped lang="stylus">

</style>
