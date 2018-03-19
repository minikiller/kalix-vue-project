<!--
描述：艺术中心-招聘管理-学生应聘
开发人：hqj
开发日期：2017年12月18日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="artCandidate" title='应聘信息列表' v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields"  bizSearch="ArtCandidateSearch" v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine" v-bind:isFixedColumn="isFixedColumn")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {CandidateURL, CandidateComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(CandidateComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'ART-DICT-KEY',
          type: '省份',
          targetField: 'regionName',
          sourceField: 'region'
        }, {
          cacheKey: 'ART-DICT-KEY',
          type: '企业行业',
          targetField: 'expectingIndustryName',
          sourceField: 'expectingIndustry'
        }],
        btnList: ToolButtonList,
        targetURL: CandidateURL,
        tableFields: [
          {prop: 'creationDate', label: '创建时间'},
          {prop: 'code', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'regionName', label: '工作省份'},
          {prop: 'city', label: '工作城市'},
          {prop: 'education', label: '学历'},
          {prop: 'expectingIndustryName', label: '期望行业'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ArtCandidateView'},
          {id: 'edit', dialog: 'ArtCandidateEdit'},
          {id: 'add', dialog: 'ArtCandidateAdd'}
        ],
        isFixedColumn: true
      }
    },
    created() {
    },
    methods: {},
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus">

</style>
