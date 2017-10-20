<template lang="pug">
  div
    keep-alive
      base-table(title='印章申请列表'
      bizKey="sealApply"
      v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog'
      bizSearch='OaSealApplySearch'
      v-bind:isFixedColumn="isFixedColumn"
      v-bind:customTableTool="customTableTool"
      v-bind:dictDefine="dictDefine"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          kalix-biz-no-column  // 业务编号
          el-table-column(prop="title" label="业务名称" align="center" width="220")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="creationDate" label="创建时间")
          kalix-date-column(prop="applyDate" label="申请时间")
          el-table-column(prop="usageCount" label="用印数" align="center" width="220")
          el-table-column(prop="sealTypeName" label="印章类别" align="center" width="220")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {
    SealApplyURL,
    SealApplyComponent,
    SealApplyStartURL
  } from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import TaskView from '@/views/oa/comp/taskView'

  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

  registerComponent(SealApplyComponent)
  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'OA-DICT-KEY',
          type: '印章类型',
          targetField: 'sealTypeName',
          sourceField: 'sealType'
        }],
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: SealApplyURL,
        btnList: workflowBtnList,
        bizDialog: [
          {id: 'view', dialog: 'OaSealApplyView'},
          {id: 'edit', dialog: 'OaSealApplyAdd'},
          {id: 'add', dialog: 'OaSealApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ],
        formModel: {
          title: '吉林动画学院印章申请表',
          orgId: '',
          orgName: '',
          creationDate: '',
          usageCount: '',
          sealType: '',
          sealTypeName: '',
          createBy: '',
          auditResult: '',
          currentNode: '',
          departmentHead: '', // 部门负责人
          tableFormField: '', // 分公司负责人
          counsel: '', // 法律顾问
          generalManager: '', // 总经理
          sealAdministrator: '', // 印章专管员
          remark: '' // 印章专管员
        }
      }
    },
    mounted() {
      registerComp()
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, SealApplyStartURL, this)
      }
    },
    components: {
      BaseTable,
      KalixTaskView: TaskView,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn
    }
  }
</script>

<style scoped lang="stylus">

</style>
