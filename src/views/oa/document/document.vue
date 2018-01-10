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
        el-table-column(prop="status" label="文号状态" align="center" width="100")
          template(slot-scope="scope")
            template(v-if="scope.row.status === '使用中'")
              el-tag(type="success") {{ scope.row.status }}
            template(v-else-if="scope.row.status === '已撤回'")
              el-tag(type="warning") {{ scope.row.status }}
            template(v-else-if="scope.row.status === '已废除'")
              el-tag(type="danger") {{ scope.row.status }}
            template(v-else)
              el-tag {{ scope.row.status }}
        el-table-column(prop="docDate" label="发文时间" align="center" width="220")
        el-table-column(prop="docDept" label="发文部门" align="center" width="220")
        el-table-column(prop="title" label="文题" align="center" width="300")
        kalix-date-column(prop="creationDate" label="创建时间")
        kalix-date-column(prop="updateDate" label="更新时间")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {DocumentURL, DocumentComponent, DocumentToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

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
          {id: 'view', dialog: 'OaDocumentView'}
        ]
      }
    },
    components: {
      BaseTable,
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId, table) {
        switch (btnId) {
          // 废除文号
          case 'abolish': {
            let warnInfo = '确定要废除该文号吗？'
            table.$confirm(warnInfo, '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
//              return this.axios.request({
//                method: 'PUT',
//                url: this.targetURL + '/' + row.id,
//                params: {},
//                data: {
//                  id: row.id,
//                  available: (row.available === 1 ? 0 : 1)
//                }
//              })
//            }).then((res) => {
//              console.log(res)
//              Message.processResult(res)
//              EventBus.$emit(ON_REFRESH_DATA)
              alert('废除操作')
            })
            break
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
