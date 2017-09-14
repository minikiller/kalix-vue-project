<!--
描述：办公自动化-待办流程组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang='pug'>
  keep-alive
    base-table(bizKey='processTask' title='待办流程列表'
    v-bind:targetURL='targetURL'
    v-bind:formModel.sync='formModel'
    v-bind:bizDialog='bizDialog'
    bizSearch='TaskSearch'
    v-bind:btnList='btnList' v-bind:customTableTool='customTableTool')
      template(slot="tableColumnSlot")
        kalix-biz-no-column(name="businessNo")
        el-table-column(prop="title" label="业务名称" width="280" align="center")
        el-table-column(prop="name" label="任务名称" align="center")
        el-table-column(prop="description" label="描述" align="center")
        el-table-column(prop="createTime" label="创建时间" align="center")
</template>

<script type='text/ecmascript-6'>
  import BaseTable from '@/components/custom/baseTable'
  import {TaskURL, WorkflowSuspendURL, WorkflowActivateURL} from '../config.toml'
  import {registerComp} from 'views/oa/comp'
  import BizNoColumn from 'views/oa/comp/bizNoColumn'
  import Vue from 'vue'
  import Message from 'common/message'
  import BaseTableTool from '@/components/custom/baseTableTool'
  import EventBus from 'common/eventbus'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'

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
        btnList: [{
          id: 'view',
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
          case 'suspend': { // 待办功能，未实行
            this.$confirm('确定要执行该操作吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'GET',
                url: row.suspensionState === 1 ? WorkflowSuspendURL + row.key : WorkflowActivateURL + row.key,
                params: {},
                data: {
                  id: row.id
                }
              })
            }).then(response => {
              EventBus.$emit(ON_REFRESH_DATA)
              Message.success(response.data.msg)
            }).catch(() => {
            })
            break
          }
        }
      }
    },
    components: {
      BaseTable,
      KalixTableTool: BaseTableTool,
      KalixBizNoColumn: BizNoColumn
    }
  }
</script>

<style scoped lang='stylus'>

</style>
