<!--
描述：系统应用-菜单管理
开发人：hqj
开发日期：2018年05月22日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.function-row(:gutter="0")
        el-col.function-col(:span="4" style="padding:8px 0 8px 8px;")
          kalix-nav-menu.kalixk-menus(title="应用列表" selfIconCls="tit_icon iconfont icon-application-management"
          v-bind:menuUrl="appTargetUrl" v-bind:menuItems="appItems" v-bind:toolbarBtnList="toolbarBtnList"
          v-bind:isIconSelf="true" v-on:menuItems="getAppItems" v-on:menuItem="getAppItem")
        el-col.function-col(:span="20")
          div(style="height:50%;position:relative")
            keep-alive
              base-table(bizKey="adminModule" title='模块列表' v-bind:targetURL="moduleTargetURL"
              v-bind:bizDialog="moduleBizDialog" v-bind:isFixedColumn="isFixedColumn"
              v-bind:toolbarBtnList="moduleToolbarBtnList" v-bind:customToolBar="moduleCustomToolBar"
              v-bind:btnList="moduleBtnList" v-bind:customTableTool="moduleCustomTableTool"
              v-on:onTableRowClick="onTableRowClick" ref="moduleTable")
                template(slot="tableColumnSlot")
                  el-table-column(prop="applicationId" label="所属应用id" align="center" width="160")
                  el-table-column(prop="id" label="模块id" align="center" width="220")
                  el-table-column(prop="text" label="模块名称" align="center" width="200")
                  el-table-column(prop="iconCls" label="图标名称" align="center" width="220")
                  el-table-column(prop="index" label="排列顺序" align="center" width="120")
                  el-table-column(prop="permission" label="权限" align="center" width="220")
          div(style="height:50%;position:relative")
            keep-alive
              base-table(bizKey="adminMenu" title='菜单列表' v-bind:targetURL="menuTargetURL"
              v-bind:bizDialog="menuBizDialog" v-bind:isFixedColumn="isFixedColumn"
              v-bind:toolbarBtnList="menuToolbarBtnList" v-bind:customToolBar="menuCustomToolBar"
              v-bind:btnList="menuBtnList" v-bind:customTableTool="menuCustomTableTool"
              ref="menuTable")
                template(slot="tableColumnSlot")
                  el-table-column(prop="moduleId" label="所属模块id" align="center" width="160")
                  el-table-column(prop="id" label="菜单id" align="center" width="220")
                  el-table-column(prop="text" label="菜单名称" align="center" width="200")
                  el-table-column(prop="iconCls" label="图标名称" align="center" width="220")
                  el-table-column(prop="index" label="排列顺序" align="center" width="120")
                  el-table-column(prop="permission" label="权限" align="center" width="220")
                  el-table-column(prop="buttons" label="按钮" align="center" width="220")
</template>

<script type="text/ecmascript-6">
  import ModuleFormModel from './moduleModel'
  import MenuFormModel from './menuModel'
  import BaseTable from '@/components/custom/baseTable'
  import BaseNavMenu from '@/components/custom/baseNavMenu'
  import {functionMenuURL, MenuComponent, baseModulesURL} from '../config.toml'
  import {moduleBtnList, menuBtnList} from '../menu/index'
  import {registerComponent} from '@/api/register'
  import Message from 'common/message'

  // 注册全局组件
  registerComponent(MenuComponent)

  export default {
    data() {
      return {
        // 应用列表
        appTargetUrl: functionMenuURL,
        appItems: [],
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        // 模块和菜单列表
        isFixedColumn: true,
        // 模块列表
        moduleTargetURL: '',
        moduleToolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'newAdd', title: '添加', isShow: true, icon: 'icon-add'}
        ],
        moduleBtnList: moduleBtnList,
        moduleBizDialog: [
          {id: 'newEdit', dialog: 'AdminModuleAdd'},
          {id: 'newAdd', dialog: 'AdminModuleAdd'}
        ],
        // 菜单列表
        menuTargetURL: '',
        menuToolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'newAdd', title: '添加', isShow: true, icon: 'icon-add'}
        ],
        menuBtnList: menuBtnList,
        menuBizDialog: [
          {id: 'newEdit', dialog: 'AdminMenuAdd'},
          {id: 'newAdd', dialog: 'AdminMenuAdd'}
        ]
      }
    },
    components: {
      BaseTable,
      KalixNavMenu: BaseNavMenu
    },
    computed: {},
    watch: {
      moduleTargetURL(newVal) {
        // 查询菜单列表
        setTimeout(() => {
          if (this.moduleRow) {
            this.getMenuTableData(this.moduleRow.applicationId, this.moduleRow.id)
          }
        }, 1000)
      }
    },
    methods: {
      // 初始化应用列表
      getAppItems(data) {
        // 应用列表初始化赋值
        this.appItems = data.children
        // 应用列表默认选中第一行
        if (this.appItems.length > 0) {
          setTimeout(() => {
            let elMenuItemActives = document.querySelector('.kalixk-menus .el-menu .el-menu-item.is-active')
            let elMenuItemDefault = document.querySelector('.kalixk-menus .el-menu .el-menu-item')
            if (!elMenuItemActives && elMenuItemDefault) {
              elMenuItemDefault.className = 'el-menu-item is-active'
            }
          }, 20)
        }
        // 查询列表数据
        this.appRow = this.appItems[0]
        if (this.appRow) {
          this.getModuleTableData(this.appRow.code)
          setTimeout(() => {
            this.moduleRow = this.$refs.moduleTable.tableData[0]
            if (this.moduleRow) {
              this.$refs.moduleTable.$refs.kalixTable.setCurrentRow(this.moduleRow)
            }
          }, 1000)
        }
      },
      // 选择应用列表
      getAppItem(val) {
        this.clearLastSelectStyle()
        if (this.appRow.code !== val.code) {
          // 清除所有列表数据
          this.clearTableData(0)
          // 查询模块列表数据
          this.appRow = val
          this.getModuleTableData(val.code)
          setTimeout(() => {
            this.moduleRow = this.$refs.moduleTable.tableData[0]
            if (this.moduleRow) {
              this.$refs.moduleTable.$refs.kalixTable.setCurrentRow(this.moduleRow)
            }
          }, 1000)
        }
      },
      // 清除应用列表样式
      clearLastSelectStyle() {
        setTimeout(() => {
          let elMenuItemActives = document.querySelector('.kalixk-menus .el-menu .el-menu-item.is-active')
          elMenuItemActives.className = 'el-menu-item'
        }, 20)
      },
      // 查询模块列表数据
      getModuleTableData(appId) {
        if (appId) {
          this.moduleTargetURL = baseModulesURL + '/' + appId
        } else {
          this.moduleTargetURL = baseModulesURL + '/0'
        }
      },
      // 查询菜单列表数据
      getMenuTableData(appId, moduleId) {
        if (moduleId) {
          this.menuTargetURL = baseModulesURL + '/' + appId + '/modules/' + moduleId
        } else {
          this.menuTargetURL = baseModulesURL + '/' + appId + '/modules/0'
        }
      },
      // 清除列表数据0全部，1模块，2菜单
      clearTableData(num) {
        switch (num) {
          // 清除所有列表数据
          case 0 :
            this.$refs.moduleTable.clearData()
            this.$refs.menuTable.clearData()
            break
          case 1 :
            // 清除模块列表数据
            this.$refs.moduleTable.clearData()
            break
          case 2 :
            // 清除菜单列表数据
            this.$refs.menuTable.clearData()
            break
          default :
            this.$refs.moduleTable.clearData()
            this.$refs.menuTable.clearData()
            break
        }
      },
      // 模块列表自定义工具栏
      moduleCustomToolBar(btnId, table) {
        switch (btnId) {
          case 'newAdd': {
            this.onModuleNewAdd(table)
            break
          }
        }
      },
      // 添加模块
      onModuleNewAdd(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newAdd'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.moduleFormModel = Object.assign({}, ModuleFormModel)
          if (this.appRow) {
            this.moduleFormModel.applicationId = this.appRow.code
            this.moduleFormModel.applicationName = this.appRow.text
            this.moduleFormModel.targetURL = this.moduleTargetURL
            this.moduleFormModel.isEdit = false
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.moduleFormModel)
          } else {
            Message.error('应用信息无效,无法添加模块信息!')
          }
        }, 20)
      },
      // 模块列表自定义操作栏
      moduleCustomTableTool(row, btnId, that) {
        switch (btnId) {
          case 'newEdit' : {
            this.onModuleNewEdit(row, that)
            break
          }
          case 'newDelete' : {
            this.onModuleNewDelete(row, that)
            break
          }
        }
      },
      // 编辑模块
      onModuleNewEdit(row, table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newEdit'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          if (this.appRow) {
            row.applicationName = this.appRow.text
            row.targetURL = this.moduleTargetURL
            row.isEdit = true
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
          } else {
            Message.error('应用信息无效,无法编辑模块信息!')
          }
        }, 20)
      },
      // 删除模块
      onModuleNewDelete(row, table) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: this.moduleTargetURL + '/' + row.cfgKey,
            params: {},
            data: {
              id: row.applicationId,
              cfgKey: row.cfgKey
            }
          })
        }).then(response => {
          table.getData()
          Message.success(response.data.msg)
          setTimeout(() => {
            this.moduleRow = this.$refs.moduleTable.tableData[0]
            if (this.moduleRow) {
              this.$refs.moduleTable.$refs.kalixTable.setCurrentRow(this.moduleRow)
              this.getMenuTableData(this.moduleRow.applicationId, this.moduleRow.id)
            }
          }, 1000)
        }).catch(() => {
        })
      },
      // 点击模块列表行触发事件
      onTableRowClick(row, event, column) {
        if (this.moduleRow.id !== row.id) {
          this.clearTableData(2)
          // 查询菜单列表
          this.moduleRow = row
          this.getMenuTableData(this.moduleRow.applicationId, this.moduleRow.id)
        }
      },
      // 菜单列表自定义工具栏
      menuCustomToolBar(btnId, table) {
        switch (btnId) {
          case 'newAdd': {
            this.onMenuNewAdd(table)
            break
          }
        }
      },
      // 添加菜单
      onMenuNewAdd(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newAdd'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.menuFormModel = Object.assign({}, MenuFormModel)
          if (this.appRow && this.moduleRow) {
            this.menuFormModel.applicationId = this.moduleRow.applicationId
            this.menuFormModel.applicationName = this.appRow.text
            this.menuFormModel.moduleId = this.moduleRow.id
            this.menuFormModel.moduleName = this.moduleRow.text
            this.menuFormModel.targetURL = this.menuTargetURL
            this.menuFormModel.isEdit = false
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.menuFormModel)
          } else {
            Message.error('模块信息无效,无法添加菜单信息!')
          }
        }, 20)
      },
      // 菜单列表自定义操作栏
      menuCustomTableTool(row, btnId, that) {
        switch (btnId) {
          case 'newEdit' : {
            this.onMenuNewEdit(row, that)
            break
          }
          case 'newDelete' : {
            this.onMenuNewDelete(row, that)
            break
          }
        }
      },
      // 编辑菜单
      onMenuNewEdit(row, table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newEdit'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          if (this.appRow && this.moduleRow) {
            row.applicationName = this.appRow.text
            row.moduleName = this.moduleRow.text
            row.targetURL = this.menuTargetURL
            row.isEdit = true
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
          } else {
            Message.error('模块信息无效,无法编辑菜单信息!')
          }
        }, 20)
      },
      // 删除菜单
      onMenuNewDelete(row, table) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: this.menuTargetURL + '/' + row.cfgKey,
            params: {},
            data: {
              id: row.moduleId,
              cfgKey: row.cfgKey
            }
          })
        }).then(response => {
          table.getData()
          Message.success(response.data.msg)
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/color.styl"
  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box

  .function-row
    height 100%
    .function-col
      height 100%
      box-sizing border-box

  .function-wrapper
    margin -10px 0
    .kalix-wrapper
      bottom 0 !important
</style>
