<!--
描述：table 组件的二次封装,带table和page
开发人：sunlf
开发日期：2017年9月18日
-->
<template lang="pug">
  div.kalix-paged-table
    el-table(v-bind:data="tableData" style="width:100%"
    v-bind:height="tableHeight" border fit
    v-on:row-click="rowClick"
    v-on:row-dblclick="rowDblClick"
    v-bind:stripe="stripe"  v-loading.body="loading"
    v-bind:highlight-current-row="highlightCurrentRow")
      el-table-column(label="行号" width="70")
        template(slot-scope="scope")
          div(style="text-align: center") {{ scope.row.rowNumber }}
      slot(name="tableColumnSlot")
    el-pagination.kalix-table-pagination(v-if="pager.totalCount"
    v-on:size-change="pagerSizeChange"
    v-on:current-change="pagerCurrentChange"
    v-bind:current-page="pager.currentPage"
    v-bind:page-sizes="pager.pageSizes"
    v-bind:page-size="1"
    layout="total, sizes, prev, pager, next, jumper"
    v-bind:total="pager.totalCount")
</template>
<script type="text/ecmascript-6">
  import {PageConfig} from 'config/global.toml'

  const MAX_TABLE_HEIGHT = 350
  export default {
    props: {
      targetURL: '',
      jsonStr: '',
      tableHeight: {
        default: MAX_TABLE_HEIGHT
      },
      stripe: {
        default: true
      },
      highlightCurrentRow: {
        default: false
      }
    },
    created() {
      console.log('[pagedTable] created', new Date())
      this.getBizData()
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    },
    watch: {
      targetURL() {
//        this.tableData = {}
        console.log('%c[pagedTable] targetURL', 'color:#00ff00', this.targetURL)
        this.getBizData()
      },
      jsonStr() {
        console.log('%c[pagedTable] jsonStr', 'color:#ff0000', this.jsonStr)
//        this.tableData = {}
        this.getBizData()
      }
    },
    methods: {
      rowClick(row, event, column) {
        this.$emit('rowClick', row, event, column)
      },
      rowDblClick(row, event) {
        this.$emit('rowDblClick', row, event)
      },
      getBizData() { // 获得data
        if (this.targetURL !== '') {
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
            setTimeout(() => {
              this.loading = false
              console.log('%c[pagedTable] res', 'color:#ff5500', res)
              console.log('%c[pagedTable] res', 'color:#ff0055', this.targetURL)
              this.tableData = res.data.data.map((item, index) => {
                item.rowNumber = index + this.rowNo
                return item
              })
              this.pager.totalCount = res.data.totalCount
            }, 500)
//          Message.processResult(res)
          })
        }
      },
      pagerSizeChange(val) { //  改变每页记录数
        this.pager.limit = val
        this._getFilesList()
      },
      pagerCurrentChange(val) { //  翻页
        this.pager.currentPage = val
        this._getFilesList()
      },
      clearData() {
        this.tableData = []
        this.loading = false
        this.pager.totalCount = 0
      }
    },
    data() {
      return {
        loading: false,
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

<style lang="stylus" type="text/stylus">
  .el-pager
    li
      &.active
        color #ffffff
</style>
