<!--
描述：table 组件的二次封装,带table和page
开发人：sunlf
开发日期：2017年9月18日
-->
<template lang="pug">
  div
    el-table(v-if="tableData && tableData.length > 0" v-bind:data="tableData" stripe style="width:100%"
    v-bind:height="tableHeight" v-loading.body="loading" border fit)
      el-table-column(label="行号" width="70")
        template(scope="scope")
          div(style="text-align: center") {{ scope.row.rowNumber }}
      slot(name="tableColumnSlot")
    el-pagination.kalix-table-pagination(v-if="this.pager.totalCount"
    v-on:size-change="pagerSizeChange"
    v-on:current-change="pagerCurrentChange"
    v-bind:current-page="pager.currentPage"
    v-bind:page-sizes="pager.pageSizes"
    v-bind:page-size="1"
    layout="total, sizes, prev, pager, next, jumper"
    v-bind:total="this.pager.totalCount")
</template>
<script type="text/ecmascript-6">
  import {PageConfig} from 'config/global.toml'

  const MAX_TABLE_HEIGHT = 350
  export default {
    props: ['targetURL', 'jsonStr'],
    mounted() {
      this.getBizData()
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    },
    methods: {
      getBizData() { // 获得流程历史
        this.loading = true
        this.axios.request({
          method: 'GET',
          url: this.targetURL,
          params: {
            jsonStr: this.jsonStr,
            page: this.pager.currentPage,
            limit: this.pager.limit,
            start: this.pager.start
          }
        }).then((res) => {
          this.tableData = res.data.data.map((item, index) => {
            item.rowNumber = index + this.rowNo
            return item
          })
          this.pager.totalCount = res.data.totalCount
          this.loading = false
//          Message.processResult(res)
        })
      },
      pagerSizeChange(val) { //  改变每页记录数
        this.pager.limit = val
        this._getFilesList()
      },
      pagerCurrentChange(val) { //  翻页
        this.pager.currentPage = val
        this._getFilesList()
      }
    },
    data() {
      return {
        tableHeight: MAX_TABLE_HEIGHT,
        loading: true,
        tableData: [],
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        }
      }
    }
  }
</script>

