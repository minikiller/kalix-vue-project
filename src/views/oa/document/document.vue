<!--
描述：办公自动化-系统管理-文号管理
开发人：hqj-修改
开发日期：2018年01月10日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="document" title='文号列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:dictDefine="dictDefine"
    v-bind:bizDialog="bizDialog" bizSearch="OaDocumentSearch" v-bind:btnList="btnList"
    v-bind:toolbarBtnList="toolbarBtnList" v-bind:customTableTool="customTableTool")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {DocumentURL, DocumentComponent, DocumentToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

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
        btnList: DocumentToolButtonList,
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        targetURL: DocumentURL,
        tableFields: [
          {prop: 'docTypeName', label: '文号类型'},
          {prop: 'year', label: '年份', width: '100'},
          {prop: 'number', label: '编号'},
          {prop: 'businessNo', label: '文号', width: '200'},
          {prop: 'status', label: '文号状态', width: '100'},
          {prop: 'docDate', label: '发文时间'},
          {prop: 'docDept', label: '发文部门'},
          {prop: 'title', label: '文题', width: '140'},
          {prop: 'creationDate', label: '创建时间', width: '160'},
          {prop: 'updateDate', label: '更新时间', width: '160'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'OaDocumentView'}
        ]
      }
    },
    components: {
      BaseTable
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
