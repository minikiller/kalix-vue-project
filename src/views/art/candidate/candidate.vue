<!--
描述：艺术中心-学生应聘
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="artCandidate" title='应聘信息列表' v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields"  bizSearch="ArtCandidateSearch" v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine")
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
          type: '性别',
          targetField: 'sexName',
          sourceField: 'sex'
        }, {
          cacheKey: 'ART-DICT-KEY',
          type: '企业行业',
          targetField: 'expectingIndustryName',
          sourceField: 'expectingIndustry'
        }],
        btnList: ToolButtonList,
        targetURL: CandidateURL,
        tableFields: [
          {prop: 'studentNo', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'phone', label: '联系电话'},
          {prop: 'address', label: '联系地址'},
          {prop: 'expectingIndustryName', label: '期望行业'},
          {prop: 'updateDate', label: '更新时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ArtCandidateView'},
          {id: 'edit', dialog: 'ArtCandidateAdd'},
          {id: 'add', dialog: 'ArtCandidateAdd'}
        ]
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
