<!--
描述：我的首页-公司新闻组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="news" title='新闻列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog"
    bizSearch="CommonNewsSearch" v-bind:btnList="btnList"
    v-bind:customTableTool="customTableTool")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {NewsURL, NewsComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(NewsComponent)

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
          {id: 'add', dialog: 'CommonNewsAdd'},
          {id: 'preview', dialog: 'CommonNotePreview'}
        ]
      }
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'preview': { // 启用/停用
            console.log('开始预览咯！！！')
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'preview'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.open(row)
            }, 20)
            break
          }
        }
      }
    },
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus">

</style>
