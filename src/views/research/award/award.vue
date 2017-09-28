<!--
描述：获奖信息管理组件
开发人：fj
开发日期：2017年9月20日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="award" title='获奖信息列表'
    v-bind:tableFields="tableFields"
    v-bind:customRender="customRender"
    v-bind:targetURL="targetURL"
    v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchAwardSearch'"
    v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {AwardURL, awardBtnPermissionPrefix, AwardComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import Cache from 'common/cache'

  // 注册全局组件
  registerComponent(AwardComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: AwardURL,
        buttonPermissionPrefix: awardBtnPermissionPrefix,
        tableFields: [
          {prop: 'competitionName', label: '展赛类型'},
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
      customRender(_data) {
        _data.forEach(function (e) {
          let data = JSON.parse(Cache.get('RESEARCH-DICT-KEY'))
          let item = data.filter(item => {
            return item.type === '展赛类型' && item.value === e.competitionType * 1
          })
          if (item.length > 0) {
            e.competitionName = item[0].label
          }
        })
      }
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
