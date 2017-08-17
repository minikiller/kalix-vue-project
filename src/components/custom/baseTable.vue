<template lang="pug">
  div.kalix-article
    component(:is="bizSearch" ref="mySearch" v-if="bizSearch" v-on:onSearch="changeRequestData")
    div.kalix-wrapper(v-bind:style="setWrapperStyle()")
      div.kalix-wrapper-hd
        i.iconfont.icon-dict-management
        | {{title}}
      div.kalix-wrapper-bd
        kalix-tool-bar(@onAddClick="onAddClick" v-on:onRefreshClick="onRefreshClick")
        div.kalix-table-container(ref="kalixTableContainer")
          el-table(:data="tableData" style="width: 100%" v-loading.body="loading" v-bind:height="tableHegiht")
            //table的字段
            el-table-column(v-if="tableData && tableData.length > 0" label="行号" width="70")
              template(scope="scope")
                div(style="text-align: center") {{ scope.row.rowNumber }}
            div(v-if="tableData && tableData.length > 0" v-for="field in fields" v-bind:key="field.prop")
              el-table-column( :prop="field.prop" v-bind:label="field.label")
            //  table的工具按钮
            slot(name="tableToolSlot")
              kalix-table-tool(:btnList="btnList" v-on:onTableToolClick="btnClick")
          div.no-list(v-if="!tableData || !tableData.length > 0" v-bind:style="{'height':tableHegiht+'px'}")
            div 暂无数据
        div.kalix-table-pagination
          el-pagination(v-if="pager.totalCount"
          v-on:size-change="pagerSizeChange"
          v-on:current-change="pagerCurrentChange"
          v-bind:current-page="pager.currentPage"
          v-bind:page-sizes="pager.pageSizes"
          v-bind:page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          v-bind:total="pager.totalCount")
      component(:is="whichBizDialog" ref="kalixDialog" v-bind:formModel="formModel" v-bind:formRules="formRules"
      v-on:refreshData="refresh")
</template>
<script type="text/ecmascript-6">
  import {PageConfig, ToolButtonList} from 'config/global.toml'
  import TableTool from './baseTableTool'
  import ToolBar from './baseToolBar'
  import Dialog from './baseDialog'
  import BaseSearch from './baseSearch.vue'
  import Message from 'common/message'

  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      bizSearch: {
        type: String
      },
      bizDialog: {
        type: Array
      },
      formModel: {
        type: Object
//        required: true
      },
      formRules: {
        type: Object
//        required: true
      },
      targetURL: {
        type: String,
        required: true
      },
      jsonStr: {
        type: String,
        default: ''
      },
      fields: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        btnList: ToolButtonList,
        loading: true,
        tableData: [],
        totalCount: 0,
        whichBizDialog: '',
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        },
        tableHegiht: 0,
        requestData: {}
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      const that = this
      setTimeout(() => {
        that._getTableHeight()
        window.addEventListener('resize', () => {
          that._getTableHeight()
        })
      }, 20)
    },
    methods: {
      changeRequestData(_requestData) {
        this.requestData = _requestData
        this.refresh()
      },
      onAddClick() {
        this.whichBizDialog = ''
        let that = this
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
        console.log(dig[0].dialog)
        this.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          that.$emit('resetFormModel')
          that.$refs.kalixDialog.open('添加')
        }, 20)
      },
      onRefreshClick() {
        this.getData()
      },
      refresh() {
        this.getData()
      },
      btnClick(row, btnId) {
        console.log(row, btnId)
        switch (btnId) {
          case 'view':
            let that = this
            this.$emit('setFormModel', row)
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'view'
              })
            console.log(dig[0].dialog)
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.open('查看')
            }, 20)
//            this.$refs.kalixDialog.open('查看')
            console.log('view is clicked')
            break
          case 'edit':
            this.$emit('setFormModel', row)
            this.$refs.kalixDialog.open('编辑')
            console.log('edit is clicked')
            break
          case 'delete': {
            console.log('delete is clicked')
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'DELETE',
                url: this.targetURL + '/' + row.id,
                params: {},
                data: {
                  id: row.id
                }
              })
            }).then(response => {
              this.getData()
              Message.success(response.data.msg)
            }).catch(() => {
            })
            break
          }
        }
      },
      pagerSizeChange(val) {
        //  改变每页记录数
        this.pager.limit = val
        this.getData()
      },
      pagerCurrentChange(val) {
        //  翻页
        this.pager.currentPage = val
        this.getData()
      },
      getData() {
        let that = this
//        console.log('baseTable', 'getData')
        this.loading = true
        let _data = {
          jsonStr: this.jsonStr,
          page: this.pager.currentPage,
          start: this.pager.start,
          limit: this.pager.limit
        }
        _data = Object.assign(_data, this.requestData)
        this.$http.get(this.targetURL, {
          params: _data
        }).then(response => {
//          if(response.data)
          this.tableData = response.data.data.map((item, index) => {
            item.rowNumber = index + that.rowNo
            return item
          })
          this.pager.totalCount = response.data.totalCount
          this.loading = false
          document.querySelector('.el-table__body-wrapper').scrollTop = 0
          document.querySelector('.el-table__body-wrapper').style.overflowX = 'hidden'
        }).catch(() => {
          this.loading = false
          console.log('this.loading = false', this.tableData.length)
        })
      },
      setWrapperStyle() {
        if (!this.bizSearch) {
          return {'top': 0}
        }
        return {}
      },
      _getTableHeight() {
        this.tableHegiht = this.$refs.kalixTableContainer.clientHeight
      }
    },
    components: {
      KalixTableTool: TableTool,
      KalixToolBar: ToolBar,
      KalixDialog: Dialog,
      KailxSearch: BaseSearch
    },
    computed: {
      rowNo() {
        // 返回当前行号
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit))
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/color"
  .kalix-wrapper
    margin 5px
    border 1px solid border-color_1
    position absolute
    bottom 0
    top 118px
    left 0
    box-sizing border-box
    right 0
    .kalix-wrapper-hd
      background-color bg-color_1
      color #FFFFFF
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-wrapper-bd
      .kalix-table-container
        position absolute
        margin 0 12px
        overflow hidden
        bottom 48px
        right 0
        left 0
        top 104px
        text-align left
      .kalix-table-pagination
        text-align left
        padding 8px 0
        position absolute
        bottom 0
      .no-list
        position absolute
        left 1px
        top 1px
        height 744px
        width 100%
        color #5e7382
        font-size 14px
        text-align center
        background-color #fff
        display flex
        box-pack center
        justify-content center
        box-align center
        flex-align center
        align-items center
</style>
