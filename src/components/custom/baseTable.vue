<!--
描述：table 组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      component(:is="bizSearch" ref="bizSearchRef" v-if="bizSearch" v-on:onSearchBtnClick="onSearchClick")
    div.kalix-wrapper(v-bind:style="setWrapperStyle()")
      div.kalix-wrapper-hd
        i.iconfont.icon-dict-management
        | {{title}}
      div.kalix-wrapper-bd
        kalix-tool-bar( v-on:onAddBtnClick="onAddClick"  v-on:onRefreshBtnClick="onRefreshClick")
        div.kalix-table-container(ref="kalixTableContainer")
          el-table(:data="tableData" stripe style="width: 100%" v-loading.body="loading" v-bind:height="tableHeight")
            //table的字段
            el-table-column(v-if="tableData && tableData.length > 0" label="行号" width="70")
              template(scope="scope")
                div(style="text-align: center") {{ scope.row.rowNumber }}
            div(v-if="tableData && tableData.length > 0" v-for="field in tableFields" v-bind:key="field.prop")
              el-table-column( :prop="field.prop" v-bind:label="field.label")
            //  table的工具按钮
            slot(name="tableToolSlot")
              kalix-table-tool(:btnList="btnList" v-on:onTableToolBarClick="btnClick")
          div.no-list(v-if="!tableData || !tableData.length > 0" v-bind:style="{'height':tableHeight+'px'}")
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
        component(:is="whichBizDialog" ref="kalixDialog" v-bind:formModel="formModel" v-bind:formRules="formRules")
</template>

<script type="text/ecmascript-6">
  import {PageConfig, SecurityBtnUrl} from 'config/global.toml'
  import TableTool from './baseTableTool'
  import ToolBar from './baseToolBar'
  import Dialog from './baseDialog'
  import Message from 'common/message'
  import EventBus from 'common/eventbus'
  import {
    ON_SEARCH_BUTTON_CLICK,
    ON_REFRESH_DATA,
    ON_INIT_DIALOG_DATA
  } from './event.toml'

  const DIALOG_INIT_EVENT = this.bizKey + '-' + ON_INIT_DIALOG_DATA
  export default {
    name: 'baseTable',
    props: {
      bizKey: {  // 主鍵
        type: String,
        required: true
      },
      title: {  // 表格组件标题名
        type: String,
        required: true
      },
      buttonPermissionPrefix: { //  table中tool的按钮组件认证前缀
        type: String,
        default: ''   // 为空时候，不校验权限
      },
      bizSearch: {  //  使用的搜索组件名称
        type: String
      },
      bizDialog: {  //  使用的对话框组件名称
        type: Array
      },
      formModel: {  //  新建，查看，编辑使用的 form 对象模型
        type: Object
//        required: true
      },
      formRules: {  //  from 对象验证参数
        type: Object
//        required: true
      },
      targetURL: {  //  列表操作请求的 URL 地址
        type: String,
        required: true
      },
      jsonStr: {  //  数据列表请求的查询条件
        type: String,
        default: ''
      },
      tableFields: {   //  数据列表的列名
        type: Array,
        required: true
      },
      btnList: {   //  table中按钮数组
        type: Array,
        required: true
      }
    },
    data() {
      return {
        loading: true,
        tableData: [],
        totalCount: 0,
        whichBizDialog: '', //
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        },
        tableHeight: 0, //  列表组件高度
        searchParam: {} //  列表查询条件
      }
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
      this.getData()
    },
    activated() {
      console.log(this.bizKey + '  is activated')
      EventBus.$on(ON_SEARCH_BUTTON_CLICK, this.onSearchClick)
      EventBus.$on(ON_REFRESH_DATA, this.refresh)
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
      EventBus.$off(ON_SEARCH_BUTTON_CLICK)
      EventBus.$off(ON_REFRESH_DATA)
    },
    mounted() {
      // 注册事件接受

      const that = this
      setTimeout(() => {
        that._getTableHeight()
        window.addEventListener('resize', () => {
          that._getTableHeight()
        })
      }, 20)
    },
    methods: {
      onSearchClick(_searchParam) { // 查询按钮点击事件
        console.log('[kalix] base table search clicked')
        this.searchParam = _searchParam
        this.refresh()
      },
      onAddClick() {  // 添加按钮点击事件
//        this.whichBizDialog = ''
        let that = this
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
        this.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          EventBus.$emit(DIALOG_INIT_EVENT, JSON.parse(this.tempFormModel))
          that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
        }, 20)
      },
      onRefreshClick() { // 刷新按钮点击事件
        this.getData()
      },
      refresh() { // 刷新表格数据
        console.log('[kalix] ' + this.title + ' refresh is trigger!')
        this.getData()
      },
      btnClick(row, btnId) { // table工具栏点击事件
        console.log(row, btnId)
        switch (btnId) {
          case 'view': {
            let that = this
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'view'
              })
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              EventBus.$emit(DIALOG_INIT_EVENT, row)
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('查看')
            }, 20)
            break
          }

          case 'edit': {
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'edit'
              })
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              EventBus.$emit(DIALOG_INIT_EVENT, row)
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true)
            }, 20)
            break
          }

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
      pagerSizeChange(val) { //  改变每页记录数
        this.pager.limit = val
        this.getData()
      },
      pagerCurrentChange(val) { //  翻页
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
        _data = Object.assign(_data, this.searchParam)
        this.$http.get(this.targetURL, {
          params: _data
        }).then(response => {
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
        this._validateButton()
      },
      /**
       * 发送按钮权限认证
       * @private
       */
      _validateButton() {
        if (this.buttonPermissionPrefix !== '') { // 默认为空不校验
          let _permissionData = []
          this.btnList.map(item => {  // 组成按钮验证字符串
            item.permission = this.buttonPermissionPrefix + item.id
            if (item.isPermission) {  // 判断是否参与校验
              _permissionData.push(this.buttonPermissionPrefix + item.id)
            }
          })
          // 发送按钮验证
          if (_permissionData.length > 0) {
            this.$http.get(`${SecurityBtnUrl}${_permissionData.join('_')}`).then(res => {
              res.data.buttons.forEach(item => {
                let tmp = this.btnList.find(e => {
                  if (e.permission === item.permission) {
                    return e
                  }
                })
                tmp.isShow = item.status  // 根据返回的权限确定按钮是否显示
              })
            })
          }
//          console.log(`[Kalix] table tool button list is `, this.btnList)
        }
      },
      setWrapperStyle() {
        if (!this.bizSearch) {
          return {'top': 0}
        }
        return {}
      },
      _getTableHeight() {
        if (this.$refs.kalixTableContainer && this.$refs.kalixTableContainer.clientHeight) {
          this.tableHeight = this.$refs.kalixTableContainer.clientHeight
        }
      }
    },
    components: {
      KalixTableTool: TableTool,
      KalixToolBar: ToolBar,
      KalixDialog: Dialog
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
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
