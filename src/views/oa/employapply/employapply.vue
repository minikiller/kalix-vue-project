<!--
描述：办公自动化-入职申请
开发人：hqj
开发日期：2017年11月3日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='employApply' title='入职申请列表' v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog' bizSearch='OaEmployApplySearch' v-bind:btnList='btnList'
      v-bind:isFixedColumn="isFixedColumn" v-bind:toolbarBtnList="toolbarBtnList" v-bind:customTableTool="customTableTool"
      v-bind:dictDefine="dictDefine")
        template(slot="tableColumnSlot")
          kalix-biz-no-column // 业务编号
          el-table-column(prop="title" label="名称" align="center" width="220")
          el-table-column(prop="personCategoryName" label="人员类别" align="center" width="220")
          // kalix-date-column(prop="creationDate" label="创建时间")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="applyDate" label="申请时间")
          el-table-column(prop="xm" label="姓名" align="center" width="220")
          el-table-column(prop="position" label="xxx" align="center" width="220")
          el-table-column(prop="sexName" label="性别" align="center" width="220")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {EmployApplyURL, EmployApplyComponent, EmployApplyStartURL} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {uneditableWorkflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import TaskView from '@/views/oa/comp/taskView'

  // 注册全局组件
  registerComponent(EmployApplyComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'OA-DICT-KEY',
          type: '招聘人员类别',
          targetField: 'personCategoryName',
          sourceField: 'personCategory'
        }, {
          cacheKey: 'OA-DICT-KEY',
          type: '性别',
          targetField: 'sexName',
          sourceField: 'sex'
        }],
        isFixedColumn: true,
        hasTableSelection: true,
        btnList: uneditableWorkflowBtnList,
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        targetURL: EmployApplyURL,
        bizDialog: [
          {id: 'view', dialog: 'OaEmployApplyView'},
          {id: 'progress', dialog: 'OaTaskView'}
        ]
      }
    },
    components: {
      BaseTable,
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixTaskView: TaskView
    },
    created() {
    },
    mounted() {
      registerComp()
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, EmployApplyStartURL, this)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
