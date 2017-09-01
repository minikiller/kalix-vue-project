<!--
描述：我的首页-公司新闻组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="news" title='新闻列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:bizDialog="bizDialog"
    bizSearch="CommonNewsSearch" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {NewsURL, NewsComponent, ToolButtonList} from '../config.toml'

  // 注册全局组件
  NewsComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: NewsURL,
        tableFields: [
          {prop: 'title', label: '标题'},
          {prop: 'content', label: '内容'},
          {prop: 'publishPeople', label: '发布人'},
          {prop: 'publishDate', label: '发布时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'CommonNewsView'},
          {id: 'edit', dialog: 'CommonNewsAdd'},
          {id: 'add', dialog: 'CommonNewsAdd'}
        ],
        formModel: {
          title: '',
          content: '',
          publishPeople: '',
          publishDate: ''
        }
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
