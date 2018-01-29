<!--
描述：办公自动化-流程定义管理组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang='pug'>
  div
    keep-alive
      base-table(v-bind:isShowToolBar='isShowToolBar' bizKey='processDefinition' title='流程定义列表'
      v-bind:targetURL='targetURL'
      v-bind:formModel.sync='formModel'
      v-bind:bizDialog='bizDialog'
      v-bind:toolbarBtnList="toolbarBtnList"
      v-bind:customRender='customRender'
      bizSearch='ProcessDefinitionSearch'
      v-bind:btnList='btnList' v-bind:customTableTool='customTableTool')
        template(slot="tableColumnSlot")
          el-table-column(prop="id" label="流程定义编号" width="280" align="center")
          el-table-column(prop="name" label="流程定义名称" width="280" align="center")
            template(slot-scope="scope")
              el-tag {{ scope.row.name }}
          el-table-column(prop="key" label="关键字" align="center")
          el-table-column(prop="description" label="描述" align="center")
          el-table-column(prop="version" label="版本" align="center")
          el-table-column(prop="status" label="状态" align="center")
            template(slot-scope="scope")
              el-tag(:type="scope.row.suspensionStateTransfer | statusFilter") {{scope.row.suspensionStateTransfer }}
    process-definition-view(ref="kalixDialog")
</template>

<script type='text/ecmascript-6'>
  import BaseTable from '@/components/custom/baseTable'
  import {WorkflowURL, WorkflowSuspendURL, WorkflowActivateURL} from '../config.toml'
  import {registerComp} from 'views/oa/comp'
  import Vue from 'vue'
  import Message from 'common/message'
  import BaseTableTool from '@/components/custom/baseTableTool'
  import EventBus from 'common/eventbus'
  import {ON_REFRESH_DATA, ON_INIT_DIALOG_DATA} from '@/components/custom/event.toml'
  import ProcessDefinitionView from '@/views/oa/comp/processDefinitionView'

  Vue.component('ProcessDefinitionSearch', require('./processDefinitionSearch').default)

  export default {
    activated() {
      console.log(this.bizKey + '  is activated')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          运行中: 'success',
          已停止: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        isShowToolBar: false,  // 不显示工具栏
        toolbarBtnList: [{id: 'add', isShow: false}],
        btnList: [{
          id: 'processView',
          title: '查看',
          isShow: true
        }, {
          id: 'suspend',
          title: '',
          isShow: true,
          titleCompute: (scope) => {
            return scope.row.suspensionState === 1 ? '停止' : '运行'
          }
        }],
        targetURL: WorkflowURL,
        tableFields: [
          {prop: 'id', label: '流程定义编号'},
          {prop: 'name', label: '流程定义名称'},
          {prop: 'key', label: '关键字'},
          {prop: 'description', label: '描述'},
          {prop: 'version', label: '版本'},
          {prop: 'suspensionStateTransfer', label: '状态'}
        ],
        bizDialog: [
          {id: 'processView', dialog: ''},
          {id: 'suspend', dialog: ''}
        ],
        formModel:
          {}
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    mounted() {
      registerComp()
    },
    filter: {},
    methods: {
      customRender(_data) {
        _data.forEach(function (e) {
          e.suspensionStateTransfer = e.suspensionState === 1 ? '运行中' : '已停止'
        })
      },
      customTableTool(row, btnId) {
        switch (btnId) {
          case 'processView': { // 待办功能，未实行
            EventBus.$emit('processDefinition' + '-' + ON_INIT_DIALOG_DATA, row)
            this.$refs.kalixDialog.$refs.kalixBizDialog.open(row)
            break
          }
          case 'suspend': {
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
      ProcessDefinitionView
//      KalixUserAdd: UserAdd
    }
  }
</script>

<style scoped lang='stylus'>

</style>
