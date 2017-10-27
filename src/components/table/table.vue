<template lang="pug">
  div.kalix-table
    el-table.kalix-table(slot="container"
    v-bind:data="dataList" border style="width: 100%"
    v-bind:row-class-name="tableRowClassName"
    v-bind:height="height" ref="kalixTable")
      slot(v-if="dataList && dataList.length > 0" name="tableColumn")
      el-table-column(label="操作" width="150")
        template(slot-scope="scope")
          el-button(v-if="btnView" v-on:click="tableView(scope.row)" type="text" size="small") 查看
          el-button(v-if="btnEdit" v-on:click="tableEdit(scope.row)" type="text" size="small") 编辑
          el-button(v-if="btnDelete" v-on:click="tableDelete(scope.row)" type="text" size="small") 删除
    div.no-list(v-if="!dataList.length > 0" v-bind:style="{'height':height+'px'}")
      div 暂无数据
</template>

<script type="text/ecmascript-6">
  import {PageConfig} from 'config/global.toml'
  import Message from 'common/message'
  import Vue from 'vue'

  const CLICK_TABLE_VIEW = 'tableView'
  const CLICK_TABLE_EDIT = 'tableEdit'
  const CLICK_TABLE_DELETE = 'tableDelete'

  export default {
    props: {
      targetUrl: {
        type: String,
        default: '',
        requred: true
      },
      requestData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      dataDeleteUrl: {
        type: String,
        default: function () {
          return null
        }
      },
      currentPage: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: function () {
          PageConfig.limit
        }
      },
      btnOption: {
        type: Array,
        default: () => {
          return ['btnView', 'btnEdit', 'btnDelete']
        }
      },
      isScroll: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dataList: [],
        isVisible: false
      }
    },
    computed: {
      btnEdit() {
        return this.btnOption.indexOf('btnEdit') > -1
      },
      btnDelete() {
        return this.btnOption.indexOf('btnDelete') > -1
      },
      btnView() {
        return this.btnOption.indexOf('btnView') > -1
      },
      rowNo() {
        // 返回当前行号
        return (1 + ((this.currentPage - 1) * this.limit))
      },
      getDataDeleteUrl() {
        return this.dataDeleteUrl || this.targetUrl
      }
    },
    created() {
      this.getDataList()
    },
    mounted() {
      this.setTableHeight()
    },
    watch: {
      currentPage(val) {
        console.log('currentPage:' + val)
        this.refresh()
      }
    },
    methods: {
      getDataList() {
        let that = this
        let _data = {
          page: that.currentPage,
          start: PageConfig.start,
          limit: that.limit
        }
        // 合并参数
        _data = Object.assign(_data, this.searchParam)
        Vue.axios.request({
          method: 'GET',
          params: _data,
          url: this.targetUrl
        }).then(response => {
          if (response.data) {
            that.dataList = response.data.data.map((item, index) => {
              item.rowNumber = index + that.rowNo
              return item
            })
            that.isVisible = true
            console.log(response.data.totalCount)
            that.$emit('getTotalCount', response.data.totalCount)
          }
        }).catch(() => {
        })
      },
      refresh() {
        let that = this
        setTimeout(() => {
          that.getDataList()
        }, 20)
      },
      tableRowClassName(row, index) {
        // 设置行样式
        return this.$parent.rowClassName && this.$parent.rowClassName(row, index)
      },
      setTableHeight() {
        if (!this.isScroll) {
          return
        }
        setTimeout(() => {
          this.$refs.kalixTable.$el.querySelector('.el-table__body-wrapper').style.overflowX = 'hidden'
        }, 20)
      },
      tableView(row) {
        console.log('row')
        if (this._events[CLICK_TABLE_VIEW]) {
          this.$emit(CLICK_TABLE_VIEW, row)
        }
      },
      tableEdit(row) {
        if (this._events[CLICK_TABLE_EDIT]) {
          this.$emit(CLICK_TABLE_EDIT, row)
        }
      },
      tableDelete(row) {
        if (this._events[CLICK_TABLE_DELETE]) {
          this.$emit(CLICK_TABLE_DELETE, row)
        } else {
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return Vue.axios.request({
              method: 'DELETE',
              url: this.getDataDeleteUrl + '/' + row.id,
              params: {},
              data: {
                id: row.id
              }
            })
          }).then(response => {
            this.refresh()
            Message.success(response.data.msg)
          }).catch(() => {
          })
        }
      }
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
  .kalix-table
    position relative
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
