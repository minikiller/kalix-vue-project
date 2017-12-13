<template lang="pug">
  div.kalix-article
    keep-alive
      component(
      v-bind:is="bizSearch"
      ref="bizSearchRef"
      v-if="bizSearch"
      v-on:onSearchBtnClick="onSearchClick")
    div.kalix-wrapper(v-bind:style="setWrapperStyle")
      div.kalix-wrapper-hd
        i(v-bind:class="iconCls")
        | {{title}}
      div.kalix-wrapper-bd
        kalix-tool-bar(v-if="isShowToolBar"
        v-bind:toolbarBtnList="toolbarBtnList"
        v-on:onToolBarClick="onToolBarClick")
        div.kalix-table-container(ref="kalixTableContainer" v-bind:style="tableContainerStyle" style="overflow-y:auto;")
          div.autoTbale(v-bind:style="{width:tableWidth}")
            table.table.table-bordered(id="hl-tree-table")
              thead
                tr
                  th(v-for="(column,index) in cloneColumns")
                    label(v-if="column.type === 'selection'")
                      input(type="checkbox" v-model="checks" v-on:click="handleCheckAll")
                    label(v-else) {{ renderHeader(column, index) }}
                      span.ivu-table-sort(v-if="column.sortable")
                        i(v-bind:class="{on: column._sortType === 'asc'}"
                        v-on:click.native="handleSort(index, 'asc')" title="上箭头")
                        i(v-bind:class="{on: column._sortType === 'desc'}"
                        v-on:click.native="handleSort(index, 'desc')" title="下箭头")
              tbody
                tr(v-for="(item,index) in initItems" v-bind:key="item.id" v-show="show(item)" v-bind:class="{'child-tr':item.parent}")
                  td(v-for="(column,snum) in columns" v-bind:key="column.key" v-bind:style="tdStyle(column)")
                    label(v-if="column.type === 'selection'")
                      input(type="checkbox" v-bind:value="item.id" v-model="checkGroup")
                    div(v-if="column.type === 'action'")
                      i(v-bind:class="action.icon" v-on:click="RowClick(item,$event,index,action.text)" style="width:20px"
                      v-for='action in (column.actions)' v-bind:key="action.text")
                    label(v-on:click="toggle(index,item)" v-if="!column.type")
                      span(v-if='snum==iconRow()')
                        i(v-html='item.spaceHtml')
                        i.el-icon(v-if="item.children&&item.children.length>0"
                        v-bind:class="{'el-icon-circle-plus':!item.expanded,'el-icon-remove':item.expanded }")
                        i(v-else class="ms-tree-space")
                      | {{renderBody(item, column)}}
      component(:is="whichBizDialog" ref="kalixDialog"
      v-bind:formModel="formModel"
      v-bind:formRules="formRules")
</template>
<script>
  import Cache from 'common/cache'
  import EventBus from 'common/eventbus'
  import TableTool from './baseTableTool'
  import ToolBar from './baseToolBar'
  import Dialog from './baseDialog'
  export default {
    name: 'treeGrid',
    props: {
      title: {  // 表格组件标题名
        type: String,
        required: true
      },
      isShowToolBar: { // 是否显示工具栏
        type: Boolean,
        default: true
      },
      toolbarBtnList: {   //  toolBar 中按钮数组
        type: Array,
        default: () => {
          return []
        }
      },
      bizSearch: {  //  使用的搜索组件名称
        type: String
      },
      bizDialog: {  //  使用的对话框组件名称
        type: Array
      },
      columns: Array,
      targetURL: ''
    },
    data() {
      return {
        iconCls: '',
        initItems: [], // 处理后数据数组
        cloneColumns: [], // 处理后的表头数据
        checkGroup: [], // 复选框数组
        checks: false, // 全选
        screenWidth: document.body.clientWidth, // 自适应宽
        tdsWidth: 0, // td总宽
        timer: false, // 控制监听时长
        dataLength: 0, // 树形数据长度
        items: [], // 表格数据
        whichBizDialog: '' //
      }
    },
    computed: {
      tableWidth() {
        return this.tdsWidth > this.screenWidth && this.screenWidth > 0 ? this.screenWidth + 'px' : '100%'
      }
    },
    watch: {
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          setTimeout(() => {
            this.timer = false
          }, 400)
        }
      },
      items() {
        if (this.items) {
          this.dataLength = this.Length(this.items)
          this.initData(this.deepCopy(this.items), 1, null)
          this.checkGroup = this.renderCheck(this.items)
          if (this.checkGroup.length === this.dataLength) {
            this.checks = true
          } else {
            this.checks = false
          }
        }
      },
      columns: {
        handler() {
          this.cloneColumns = this.makeColumns()
        },
        deep: true
      },
      checkGroup(data) {
        this.checkAllGroupChange(data)
      }
    },
    mounted() {
      this.getData()
      if (this.items) {
        this.dataLength = this.Length(this.items)
        this.initData(this.deepCopy(this.items), 1, null)
        this.cloneColumns = this.makeColumns()
        this.checkGroup = this.renderCheck(this.items)
        if (this.checkGroup.length === this.dataLength) {
          this.checks = true
        } else {
          this.checks = false
        }
      }
      // 绑定onresize事件 监听屏幕变化设置宽
      this.$nextTick(() => {
        this.screenWidth = document.body.clientWidth
      })
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          this.screenWidth = window.screenWidth
        })()
      }
      // 注册事件接受
      const that = this
      window.addEventListener('resize', () => {
        that._getTableHeight()
      })
      EventBus.$on(this.bizKey + '-' + 'KalixDialogClose', () => {
//        console.log(`%c[kalix] reset ${this.bizKey} whichBizDialog`, 'background: #222;color: #bada55')
        this.whichBizDialog = ''
      })
      //  绑定表格 icon 图标
      const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
      if (currentTreeListItem) {
        this.iconCls = currentTreeListItem.iconCls
      }
    },
    methods: {
      // 获取表格数据
      getData() {
        this.axios.request({
          method: 'GET',
          url: this.targetURL,
          params: {}
        }).then(res => {
          this.items = res.data.children
          // 加载数据后自动选中第一个节点
          this.$nextTick(() => {
            const firstNode = document.querySelector('.el-tree-node')
            if (firstNode) {
              firstNode.click()
            }
          })
//          this._getTableHeight()
        })
        const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
        if (currentTreeListItem) {
          this.iconCls = currentTreeListItem.iconCls
        }
      },
      setWrapperStyle() {
        if (!this.bizSearch) {
          return {'top': 0}
        }
        return {}
      },
      tableContainerStyle() {
        return {'top': (!this.isShowToolBar ? '56px' : '')}
      },
      _getTableHeight() {
        if (this.$refs.kalixTableContainer && this.$refs.kalixTableContainer.clientHeight) {
          this.tableHeight = this.$refs.kalixTableContainer.clientHeight
        }
      },
      onToolBarClick(btnId) {
        // baseToolBar 回调事件
        switch (btnId) {
          case 'add':
            this.onAddClick()
            break
          case 'refresh':
            this.onRefreshClick()
            break
          default:
            this.customToolBar(btnId, this)
            break
        }
      },
      onAddClick() {
        // 添加按钮点击事件
        // this.whichBizDialog = ''
        let that = this
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
//        console.log(dig[0].dialog)3
        this.whichBizDialog = dig[0].dialog
        console.log('[onAddClick]', dig[0].dialog)
//        this.$emit('update:formModel', {})
        setTimeout(() => {
//          EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, JSON.parse(this.tempFormModel))
          console.log('wwwwwwwww', that.$refs.kalixDialog)
          that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            that.$refs.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
      },
      // 有无多选框折叠位置优化
      iconRow() {
        for (var i = 0, len = this.columns.length; i < len; i++) {
          if (this.columns[i].type === 'selection') {
            return 1
          }
        }
        return 0
      },
      // 设置td宽度,td的align
      tdStyle(column) {
        var style = {}
        if (column.align) {
          style['text-align'] = column.align
        }
        if (column.width) {
          style['min-width'] = column.width + 'px'
        }
        return style
      },
      // 排序事件
      handleSort(index, type) {
        this.cloneColumns.forEach((col) => {
          col._sortType = 'normal'
        })
        if (this.cloneColumns[index]._sortType === type) {
          this.cloneColumns[index]._sortType = 'normal'
        } else {
          this.cloneColumns[index]._sortType = type
        }
        this.$emit('on-sort-change', this.cloneColumns[index]['key'], this.cloneColumns[index]['_sortType'])
      },
      // 点击某一行事件
      RowClick(data, event, index, text) {
        let result = this.makeData(data)
        this.$emit('on-row-click', result, event, index, text)
      },
      // 点击事件 返回数据处理
      makeData(data) {
        const t = this.type(data)
        let o
        if (t === 'array') {
          o = []
        } else if (t === 'object') {
          o = {}
        } else {
          return data
        }

        if (t === 'array') {
          for (let i = 0; i < data.length; i++) {
            o.push(this.makeData(data[i]))
          }
        } else if (t === 'object') {
          for (let i in data) {
            if (i !== 'spaceHtml' && i !== 'parent' && i !== 'level' && i !== 'expanded' && i !== 'isShow' && i !==
              'load') {
              o[i] = this.makeData(data[i])
            }
          }
        }
        return o
      },
      // 处理表头数据
      makeColumns() {
        let columns = this.deepCopy(this.columns)
        this.tdsWidth = 0
        columns.forEach((column, index) => {
          column._index = index
          column._width = column.width ? column.width : ''
          column._sortType = 'normal'
          this.tdsWidth += column.width ? parseFloat(column.width) : 0
        })
        return columns
      },
      // 数据处理 增加自定义属性监听
      initData(items, level, parent) {
        this.initItems = []
        let spaceHtml = ''
        for (var i = 1; i < level; i++) {
          spaceHtml += "<i class='ms-tree-space'></i>"
        }
        items.forEach((item, index) => {
          item = Object.assign({}, item, {
            'parent': parent,
            'level': level,
            'spaceHtml': spaceHtml
          })
          if ((typeof item.expanded) === 'undefined') {
            item = Object.assign({}, item, {
              'expanded': false
            })
          }
          if ((typeof item.show) === 'undefined') {
            item = Object.assign({}, item, {
              'isShow': false
            })
          }
          item = Object.assign({}, item, {
            'load': (item.expanded ? item.expanded : false)
          })
          this.initItems.push(item)
          if (item.children && item.expanded) {
            this.initData(item.children, level + 1, item)
          }
        })
      },
      //  隐藏显示
      show(item) {
        return ((item.level === 1) || (item.parent && item.parent.expanded && item.isShow))
      },
      toggle(index, item) {
        let level = item.level + 1
        let spaceHtml = ''
        for (var i = 1; i < level; i++) {
          spaceHtml += "<i class='ms-tree-space'></i>"
        }
        if (item.children) {
          if (item.expanded) {
            item.expanded = !item.expanded
            this.close(index, item)
          } else {
            item.expanded = !item.expanded
            if (item.load) {
              this.open(index, item)
            } else {
              item.load = true
              item.children.forEach((child, childIndex) => {
                this.initItems.splice((index + childIndex + 1), 0, child)
                // 设置监听属性
                this.$set(this.initItems[index + childIndex + 1], 'parent', item)
                this.$set(this.initItems[index + childIndex + 1], 'level', level)
                this.$set(this.initItems[index + childIndex + 1], 'spaceHtml', spaceHtml)
                this.$set(this.initItems[index + childIndex + 1], 'isShow', true)
                this.$set(this.initItems[index + childIndex + 1], 'expanded', false)
              })
            }
          }
        }
      },
      open(index, item) {
        if (item.children) {
          item.children.forEach((child, childIndex) => {
            child.isShow = true
            if (child.children && child.expanded) {
              this.open(index + childIndex + 1, child)
            }
          })
        }
      },
      close(index, item) {
        if (item.children) {
          item.children.forEach((child, childIndex) => {
            child.isShow = false
            child.expanded = false
            if (child.children) {
              this.close(index + childIndex + 1, child)
            }
          })
        }
      },
      // checkbox 全选 选择事件
      handleCheckAll() {
        this.checks = !this.checks
        if (this.checks) {
          this.checkGroup = this.getArray(this.checkGroup.concat(this.All(this.items)))
        } else {
          this.checkGroup = []
        }
        // this.$emit('on-selection-change', this.checkGroup)
      },
      // 数组去重
      getArray(a) {
        var hash = {},
          len = a.length,
          result = []
        for (var i = 0; i < len; i++) {
          if (!hash[a[i]]) {
            hash[a[i]] = true
            result.push(a[i])
          }
        }
        return result
      },
      checkAllGroupChange(data) {
        if (this.dataLength > 0 && data.length === this.dataLength) {
          this.checks = true
        } else {
          this.checks = false
        }
        this.$emit('on-selection-change', this.checkGroup)
      },
      All(data) {
        let arr = []
        data.forEach((item) => {
          arr.push(item.id)
          if (item.children && item.children.length > 0) {
            arr = arr.concat(this.All(item.children))
          }
        })
        return arr
      },
      // 返回树形数据长度
      Length(data) {
        let length = data.length
        data.forEach((child) => {
          if (child.children) {
            length += this.Length(child.children)
          }
        })
        return length
      },
      // 返回表头
      renderHeader(column, $index) {
        if ('renderHeader' in this.columns[$index]) {
          return this.columns[$index].renderHeader(column, $index)
        } else {
          return column.title || '#'
        }
      },
      // 返回内容
      renderBody(row, column, index) {
        return row[column.key]
      },
      // 默认选中
      renderCheck(data) {
        let arr = []
        data.forEach((item) => {
          if (item._checked) {
            arr.push(item.id)
          }
          if (item.children && item.children.length > 0) {
            arr = arr.concat(this.renderCheck(item.children))
          }
        })
        return arr
      },
      // 深度拷贝函数
      deepCopy(data) {
        var t = this.type(data),
          o, i, ni
        if (t === 'array') {
          o = []
        } else if (t === 'object') {
          o = {}
        } else {
          return data
        }
        if (t === 'array') {
          for (i = 0, ni = data.length; i < ni; i++) {
            o.push(this.deepCopy(data[i]))
          }
          return o
        } else if (t === 'object') {
          for (i in data) {
            o[i] = this.deepCopy(data[i])
          }
          return o
        }
      },
      type(obj) {
        var toString = Object.prototype.toString
        var map = {
          '[object Boolean]': 'boolean',
          '[object Number]': 'number',
          '[object String]': 'string',
          '[object Function]': 'function',
          '[object Array]': 'array',
          '[object Date]': 'date',
          '[object RegExp]': 'regExp',
          '[object Undefined]': 'undefined',
          '[object Null]': 'null',
          '[object Object]': 'object'
        }
        return map[toString.call(obj)]
      },
      onSearchClick() {
      }
    },
    beforeDestroy() {
      window.onresize = null
    },
    components: {
      KalixTableTool: TableTool,
      KalixToolBar: ToolBar,
      KalixDialog: Dialog
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseTable"

  .autoTbale {
    overflow: auto;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    line-height: 23px;
  }

  .table-bordered {
    border: 0px solid #EBEBEB;
  }

  .table > tbody > tr > td,
  .table > tbody > tr > th {
    border-top: 1px solid #e7eaec;
    line-height: 1.42857;
    padding: 8px;
    vertical-align: middle;
    font-size: 14px;
    line-height: 23px;
  }

  .table > thead > tr > td,
  .table > thead > tr > th {
    /*border-top: 1px solid #e7eaec;*/
    border: 0;
    line-height: 1.42857;
    padding: 8px;
    vertical-align: middle;
    font-family: Arial;
    color: #b18e60;
    font-size: 14px;
    line-height: 23px;
    font-family: inherit;
  }

  .table-bordered > tbody > tr > td,
  .table-bordered > tbody > tr > th,
  .table-bordered > tfoot > tr > td,
  .table-bordered > tfoot > tr > th,
  .table-bordered > thead > tr > td,
  .table-bordered > thead > tr > th {
    border-bottom: 1px solid #e7e7e7;
    border-top: 1px solid #e7e7e7;
  }

  .table > thead > tr > th {
    border-bottom: 1px solid #DDD;
  }

  .table-bordered > thead > tr > td,
  .table-bordered > thead > tr > th {
    background-color: #F5F5F6;
  }

  #hl-tree-table > tbody > tr {
    background-color: #fbfbfb;
  }

  #hl-tree-table > tbody > .child-tr {
    background-color: #fff;
  }

  label {
    margin: 0 8px;
  }

  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 14px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: ""
  }

  #hl-tree-table th > label {
    margin: 0;
  }
</style>

