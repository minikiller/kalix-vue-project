<template lang="pug">
  div.wrapper
    div.hd
      i(v-if="icon.length" v-bind:class="icon")
      | {{title}}
    div.bd
      div.toolbar
        slot(name="toolbar")
      div.container(ref="wrapperContainer")
        kalix-table(ref="kalixTable"
        v-bind:target-url="dataUrl"
        v-bind:btn-option="btnOption"
        v-bind:is-scroll="tableIsScroll"
        v-bind:request-data="requestData"
        v-bind:current-page="pager.currentPage"
        v-bind:limit="pager.limit"
        v-bind:height="tableHeight"
        v-on:getTotalCount="setTotalCount"
        v-on:tableView="tableView"
        v-on:tableEdit="tableEdit")
          template(slot="tableColumn")
            slot(name="container")
      div.pagination
        kalix-pager(slot="pagination"
        v-bind:currentPage="pager.currentPage"
        v-bind:totalCount="pager.totalCount"
        v-bind:limit="pager.limit"
        v-on:pagerCurrentChange="pagerCurrentChange"
        v-on:pagerSizeChange="pagerSizeChange")
</template>

<script>
  import {PageConfig} from 'config/global.toml'
  import KalixTable from '@/components/table/table'
  import KalixPager from '@/components/table/pager'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      dataUrl: {
        type: String,
        default: ''
      },
      requestData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        tableHeight: 0,
        // 数据列表
        dataList: [],
        // 分页器
        pager: {
          totalCount: 0,
          pageSizes: [],
          currentPage: 1,
          limit: PageConfig.sizes[0],
          start: 0
        }
      }
    },
    created() {
      this.btnOption = ['btnEdit', 'btnDelete', 'btnView']
      this.tableIsScroll = true
    },
    mounted() {
      this.setTableHeight()
    },
    methods: {
      refresh() {
        this.$refs.kalixTable.refresh()
      },
      setTableHeight() {
        this.tableHeight = this.$refs.wrapperContainer.scrollHeight
      },
      pagerSizeChange(val) {
        //  改变每页记录数
        this.pager.limit = val
        this.pager.currentPage = 1
      },
      pagerCurrentChange(val) {
        //  翻页
        this.pager.currentPage = val
      },
      tableRowClassName(row, index) {
        // 设置行样式
        return this.$parent.rowClassName && this.$parent.rowClassName(row, index)
      },
      tableView(row) {
        console.log('Wrapper TableView')
        this.$emit('tableView', row)
      },
      tableEdit(row) {
        this.$emit('tableEdit', row)
      },
      tableDelete(row) {
        this.$emit('tableDelete', row)
      },
      setTotalCount(totalCount) {
        this.pager.totalCount = totalCount
      }
    },
    components: {
      KalixTable,
      KalixPager
    },
    computed: {
      rowNo() {
        // 返回当前行号
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit))
      }
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
  @import "../../assets/stylus/color.styl"
  .wrapper
    margin 5px
    border 1px solid border-color_1
    position absolute
    bottom 0
    top 118px
    left 0
    box-sizing border-box
    right 0
    .hd
      background-color bg-color_1
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .bd
      .toolbar
        padding 12px
        text-align left
        .el-button
          .iconfont
            font-size 14px
      .container
        position absolute
        padding 0 12px
        overflow hidden
        bottom 48px
        right 0
        left 0
        top 104px
        text-align left
        .el-table .info-row
          background-color $bc-att
      .pagination
        text-align left
        padding 8px 0
        position absolute
        bottom 0
</style>
