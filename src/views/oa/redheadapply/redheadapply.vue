<!--
描述：办公自动化-红头文件申请-列表组件
开发人：sunlf
开发日期：2017年12月20日
-->
<template lang="pug">
  div
    keep-alive
      base-table(title='红头文件申请列表'
      bizKey="redheadApply"
      v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog'
      bizSearch='OaRedheadApplySearch'
      v-bind:isFixedColumn="isFixedColumn"
      v-bind:customTableTool="callCustomTableTool"
      v-bind:dictDefine="dictDefine"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          el-table-column(type="expand")
            template(slot-scope="scope")
              div.rhf-content
                div.rhf-content-2
                  div.rhf-article-doc(v-html="scope.row.docContent" data-content)
          kalix-biz-no-column(title="文号")  // 业务编号
          el-table-column(prop="title" label="业务名称" align="center" width="220")
          el-table-column(prop="docCaption" label="文号标题" align="center" width="100")
          el-table-column(prop="docTypeName" label="文号类型" align="center" width="220")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-doc-status-column  // 文件状态
          kalix-date-column(prop="creationDate" label="创建时间")
          kalix-date-column(prop="applyDate" label="申请时间")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {
    RedheadApplyURL,
    RedheadApplyComponent,
    RedheadApplyStartURL
  } from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, startFun, progressFun} from '@/views/oa/comp'
  import TaskView from '@/views/oa/comp/taskView'

  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'
  import DocStatusColumn from '@/views/oa/comp/docStatusColumn.vue'

  registerComponent(RedheadApplyComponent)
  export default {
    data() {
      return {
        dictDefine: [
          { // 定义数据字典的显示
            cacheKey: 'OA-DICT-KEY',
            type: '文号类型',
            targetField: 'docTypeName',
            sourceField: 'docType'
          },
          {
            cacheKey: 'OA-DICT-KEY',
            type: '文号标题',
            targetField: 'docCaption',
            sourceField: 'docType'
          }
        ],
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: RedheadApplyURL,
        btnList: workflowBtnList,
        bizDialog: [
          {id: 'view', dialog: 'OaRedheadApplyView'},
          {id: 'edit', dialog: 'OaRedheadApplyAdd'},
          {id: 'add', dialog: 'OaRedheadApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'},
          {id: 'preview', dialog: 'OaRedheadPreview'}
        ]
      }
    },
    mounted() {
      registerComp()
      let item = this.btnList.find(e => {
        return e.id === 'preview'
      })
      if (!item) {
        this.btnList.push({
          id: 'preview',
          title: '预览',
          isShow: true,   // 是否显示
          toolTipTitle: '红头文件预览',
          isPermission: true  // 是否进行权限认证
        })
      }
    },
    created() {
    },
    methods: {
      callCustomTableTool(row, btnId, that) {
        switch (btnId) {
          case 'start': { // 流程启动
            startFun(row, btnId, RedheadApplyStartURL, this)
            break
          }
          case 'progress' : {
            progressFun(row, btnId, RedheadApplyStartURL, this)
            break
          }
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
      BaseTable,
      KalixTaskView: TaskView,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn,
      KalixDocStatusColumn: DocStatusColumn
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .rhf-article-doc[data-content]
    b, strong
      font-weight inherit
      font-weight bolder

    blockquote
      position relative
      font-size 16px
      letter-spacing 1px
      line-height 28px
      margin-bottom 40px
      padding 20px
      background #f0f2f5
    em
      font-style italic
</style>

<style scoped lang="stylus">
  .rhf-content
    width 1000px
    padding-left 70px
    .rhf-content-2
      .rhf-article-doc
        width 790px
        margin 0 auto
        padding 0 16px
        box-sizing border-box
</style>
