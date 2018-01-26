<!--
描述：办公自动化-系统管理-文号管理
开发人：hqj-修改
开发日期：2018年01月10日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="document" title='文号列表' v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" bizSearch="OaDocumentSearch" v-bind:btnList="btnList"
    v-bind:toolbarBtnList="toolbarBtnList" v-bind:customTableTool="customTableTool"
    v-bind:isFixedColumn="isFixedColumn" v-bind:dictDefine="dictDefine")
      template(slot="tableColumnSlot")
        kalix-biz-no-column(title="文号")  // 业务编号
        el-table-column(prop="docTypeName" label="文号类型" align="center" width="120")
        el-table-column(prop="year" label="年份" align="center" width="100")
        kalix-status-column  // 文号状态
        el-table-column(prop="title" label="文题" align="center" width="300")
        kalix-doc-status-column  // 文件状态
        el-table-column(prop="docDate" label="发文时间" align="center" width="220")
        el-table-column(prop="docDept" label="发文部门" align="center" width="220")
        kalix-date-column(prop="creationDate" label="创建时间")
        kalix-date-column(prop="updateDate" label="更新时间")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {DocumentURL, DocumentComponent, RedheadApplyURL, DocumentRevokeURL, DocumentAbolishURL} from '../config.toml'
  import {DocumentToolButtonList} from '../document/index'
  import {registerComponent} from '@/api/register'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import StatusColumn from '@/views/oa/comp/statusColumn.vue'
  import DocStatusColumn from '@/views/oa/comp/docStatusColumn.vue'
  import DateColumn from 'views/oa/comp/dateColumn'
  import Message from 'common/message'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'
  import EventBus from 'common/eventbus'

  // 注册全局组件
  registerComponent(DocumentComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'OA-DICT-KEY',
          type: '文号类型',
          targetField: 'docTypeName',
          sourceField: 'docType'
        }],
        isFixedColumn: true,
        btnList: DocumentToolButtonList,
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        targetURL: DocumentURL,
//        tableFields: [
//          {prop: 'docTypeName', label: '文号类型', width: '120'},
//          {prop: 'year', label: '年份', width: '100'},
//          {prop: 'businessNo', label: '文号', width: '200'},
//          {prop: 'status', label: '文号状态', width: '100'},
//          {prop: 'docDate', label: '发文时间', width: '160'},
//          {prop: 'docDept', label: '发文部门', width: '200'},
//          {prop: 'title', label: '文题', width: '280'},
//          {prop: 'creationDate', label: '创建时间', width: '160'},
//          {prop: 'updateDate', label: '更新时间', width: '160'}
//        ],
        bizDialog: [
          {id: 'view', dialog: 'OaDocumentView'},
          {id: 'publish', dialog: 'OaDocumentPublish'}
        ],
        redheadApplyURL: RedheadApplyURL,
        documentRevokeURL: DocumentRevokeURL,
        documentAbolishURL: DocumentAbolishURL
      }
    },
    components: {
      BaseTable,
      KalixBizNoColumn: BizNoColumn,
      KalixStatusColumn: StatusColumn,
      KalixDocStatusColumn: DocStatusColumn,
      KalixDateColumn: DateColumn
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId, table) {
        switch (btnId) {
          // 撤回文号
          case 'revoke': {
            this.onRevoke(row, table)
            break
          }
          // 废除文号
          case 'abolish': {
            this.onAbolish(row, table)
            break
          }
          // 发文
          case 'publish': {
            this.onPublish(row, table)
            break
          }
        }
      },
      // 撤回文号
      onRevoke(row, table) {
        this.axios.request({
          method: 'GET',
          url: this.redheadApplyURL + '/' + row.redheadId,
          params: {}
        }).then((res) => {
          let docStatus = res.data.docStatus
          let warnInfo = '使用该文号的文件状态为[' + docStatus + '],确定要撤回该文号吗?'
          table.$confirm(warnInfo, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios.request({
              method: 'GET',
              url: this.documentRevokeURL + row.id,
              params: {}
            }).then((res) => {
              Message.processResult(res)
              EventBus.$emit(ON_REFRESH_DATA)
            })
          })
        })
      },
      // 废除文号
      onAbolish(row, table) {
        this.axios.request({
          method: 'GET',
          url: this.redheadApplyURL + '/' + row.redheadId,
          params: {}
        }).then((res) => {
          let docStatus = res.data.docStatus
          let warnInfo = '使用该文号的文件状态为[' + docStatus + '],确定要废除该文号吗?'
          table.$confirm(warnInfo, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios.request({
              method: 'GET',
              url: this.documentAbolishURL + row.id,
              params: {}
            }).then((res) => {
              Message.processResult(res)
              EventBus.$emit(ON_REFRESH_DATA)
            })
          })
        })
      },
      // 发文
      onPublish(row, table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'publish'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          table.$refs.kalixDialog.$refs.kalixBizDialog.open('发文', true, row)
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
