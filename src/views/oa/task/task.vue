<!--
描述：办公自动化-待办流程组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang='pug'>
  div
    keep-alive
      base-table(bizKey='processTask' title='待办流程列表'
      v-bind:targetURL='targetURL'
      v-bind:formModel.sync='formModel'
      v-bind:bizDialog='bizDialog'
      bizSearch='TaskSearch'
      v-bind:toolbarBtnList="toolbarBtnList"
      v-bind:isShowToolBar="isShowToolBar"
      v-bind:btnList='btnList' v-bind:customTableTool='customTableTool')
        template(slot="tableColumnSlot")
          kalix-biz-no-column(name="businessNo")
          el-table-column(prop="title" label="业务名称" width="280" align="center")
          el-table-column(prop="name" label="任务名称" align="center")
          el-table-column(prop="description" label="描述" align="center")
          el-table-column(prop="createTime" label="创建时间" align="center")
    kalix-task-view(ref="kalixDialog")
    kalix-task-complete(ref="kalixTaskDialog")
</template>

<script type='text/ecmascript-6'>
  import BaseTable from '@/components/custom/baseTable'
  import {TaskURL} from '../config.toml'
  import {registerComp} from 'views/oa/comp'
  import BizNoColumn from 'views/oa/comp/bizNoColumn'
  import Vue from 'vue'
  import BaseTableTool from '@/components/custom/baseTableTool'
  import EventBus from 'common/eventbus'
  import {ON_INIT_DIALOG_DATA} from '@/components/custom/event.toml'
  import TaskView from '@/views/oa/comp/taskView'
  import TaskComplete from '@/views/oa/comp/taskComplete'

  Vue.component('TaskSearch', require('./taskSearch').default)

  export default {
    activated() {
      console.log(this.bizKey + '  is activated')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    filters: {},
    data() {
      return {
        isShowToolBar: false,  // 不显示工具栏
        toolbarBtnList: [{id: 'add', isShow: false},
          {id: 'customBtn1', icon: 'icon-edit', title: '自定义按钮 1', isShow: true},
          {id: 'customBtn2', icon: 'icon-edit', title: '自定义按钮 2', isShow: true},
          {id: 'customBtn3', icon: 'icon-edit', title: '自定义按钮 3', isShow: true},
          {id: 'customBtn4', icon: 'icon-edit', title: '自定义按钮 4', isShow: true}],
        bizKey: 'taskComplete',
        btnList: [{
          id: 'viewTask',
          title: '查看',
          isShow: true
        }, {
          id: 'complete',
          title: '审批',
          isShow: true
        }],
        targetURL: TaskURL,
        bizDialog: [
          {id: 'view', dialog: 'OaTaskView'},
          {id: 'complete', dialog: 'OaTaskComplete'}
        ],
        formModel:
          {}
      }
    },
    created() {
    },
    mounted() {
      registerComp()
    },
    filter: {},
    methods: {
      customTableTool(row, btnId) {
        switch (btnId) {
          case 'viewTask': { // 待办功能，未实行
            EventBus.$emit('processTask' + '-' + ON_INIT_DIALOG_DATA, row)
            this.$refs.kalixDialog.$refs.kalixBizDialog.open('查看')
            break
          }
          case 'complete': {
            EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, row)
            this.$refs.kalixTaskDialog.open(row)
            break
          }
        }
      }
    },
    components: {
      BaseTable,
      KalixTaskView: TaskView,
      KalixTaskComplete: TaskComplete,
      KalixTableTool: BaseTableTool,
      KalixBizNoColumn: BizNoColumn
    }
  }
</script>

<style scoped lang='stylus'>

</style>
