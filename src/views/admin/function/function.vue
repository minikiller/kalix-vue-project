<!--
描述：系统应用-功能管理
开发人：yangz
开发日期：2018年01月25日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.function-row(:gutter="0")
        el-col.function-col(:span="4" style="padding:8px 0 8px 8px;")
          kalix-nav-menu(title="应用列表" selfIconCls="tit_icon iconfont icon-application-management"
            v-bind:basePath="itemBasePath" v-bind:toolbarBtnList="toolbarBtnList"
            v-bind:menuUrl="targetUrl" v-bind:menuItems="menuItems" v-bind:isIconSelf="isIconSelf"
            v-on:menuItems="getMenuItems" v-on:menuItem="getMenuItem")
        el-col.function-col(:span="20")
          kalix-tree-grid(bizKey="function" title="功能管理"
            ref="kalixTreeGrid"
            v-bind:isToolBarSelf="true" v-bind:toolbarBtnList="treeToolbarBtnList" v-bind:onToolBarSelfClick="onToolBarClick"
            v-bind:bizDialog="bizDialog" v-bind:columns='columns' v-bind:targetURL="treeUrl"
            v-bind:customRender="showPermissionText" v-on:selectedRow="getSelectRow"
            v-bind:isRowButtonSelf="true" v-bind:btnSelfClick="btnClick" v-bind:isColumnfixed="false")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import BaseNavMenu from '@/components/custom/baseNavMenu'
  import TreeGrid from '@/components/custom/treeGrid'
  import Message from 'common/message'
  import {functionURL, functionMenuURL, functionItemBaseURL, FunctionComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'
  registerComponent(FunctionComponent)

  export default {
    data() {
      return {
        itemBasePath: functionItemBaseURL,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        treeToolbarBtnList: [
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        targetUrl: functionMenuURL,
        treeUrl: undefined,
        functionUrl: functionURL,
        menuItems: [],
        addFormModel: Object.assign({}, FormModel),
        editFormModel: Object.assign({}, FormModel),
        applicationName: undefined,
        applicationId: undefined,
        applicationCode: undefined,
        parentPermission: undefined,
        kalixDialog: undefined,
        currentRow: undefined,
        isIconSelf: true,
        bizDialog: [
          {id: 'add', dialog: 'AdminFunctionAdd'},
          {id: 'edit', dialog: 'AdminFunctionEdit'}
        ],
        columns: [{
          type: 'hidden',
          key: 'id',
          width: '0'
        }, {
          type: 'hidden',
          key: 'parentId',
          width: '0'
        }, {
          title: '名称',
          key: 'name',
          width: '150'
        }, {
          title: '功能代码',
          key: 'code',
          width: '120'
        }, {
          type: 'hidden',
          key: 'dataPermission',
          width: '0'
        }, {
          title: '数据权限是否生效',
          key: 'isDataPermission',
          width: '120'
        }, {
          title: '数据权限主键',
          key: 'dataPermissionKey',
          width: '120'
        }, {
          title: '创建人',
          key: 'createBy',
          width: '100'
        }, {
          title: '创建日期',
          key: 'creationDate',
          width: '150'
        }, {
          type: 'hidden',
          key: 'isLeaf',
          width: '0'
        }, {
          type: 'hidden',
          key: 'permission',
          width: '0'
        }, {
          type: 'hidden',
          key: 'applicationId',
          width: '0'
        }, {
          title: '操作',
          type: 'action',
          actions: [{
            type: 'edit',
            text: '编辑',
            icon: 'el-icon-edit'
          }, {
            type: 'delete',
            text: '删除',
            icon: 'el-icon-delete'
          }],
          width: '150'
        }]
      }
    },
    components: {
      KalixNavMenu: BaseNavMenu,
      KalixTreeGrid: TreeGrid
    },
    computed: {
    },
    methods: {
      getMenuItems(data) {
        this.menuItems = data.children
      },
      getMenuItem(val) {
        this.treeUrl = this.itemBasePath + val.id
        this.applicationName = val.name
        this.applicationId = val.id
        this.applicationCode = val.code
      },
      showPermissionText(_data) {
        this.showPermission(_data)
      },
      showPermission(_data) {
        if (_data) {
          _data.forEach((e) => {
            e.isDataPermission = e.dataPermission ? '是' : '否'
            if (e.children) {
              this.showPermission(e.children)
            }
          })
        }
      },
      onToolBarClick(btnId) {
        if (btnId === 'add') {
          this.onAddClick()
        }
        if (btnId === 'refresh') {
          this.onRefreshClick()
        }
      },
      btnClick(row, btnId) {
        if (btnId === 'edit') {
          this.onEditClick(row)
        }
        if (btnId === 'delete') {
          this.onDeleteClick(row)
        }
      },
      onRefreshClick() {
        if (this.treeUrl !== undefined) {
          this.$refs.kalixTreeGrid.getData()
        }
      },
      onAddClick() {
        if (this.applicationName === undefined || this.applicationId === undefined || this.applicationCode === undefined) {
          Message.error('请选择一个应用！')
          return
        }
        let that = this
        this.$refs.kalixTreeGrid.getKalixDialog('add', (_kalixDialog) => {
          this.kalixDialog = _kalixDialog
          setTimeout(() => {
            this.addFormModel.applicationName = this.applicationName
            this.addFormModel.applicationId = this.applicationId
            this.parentPermission = this.applicationCode
            if (this.currentRow === undefined) {
              this.addFormModel.parentName = '根功能'
              this.addFormModel.parentId = '-1'
            } else {
              this.addFormModel.parentName = this.currentRow.name
              this.addFormModel.parentId = this.currentRow.id
              this.parentPermission = this.currentRow.permission
            }
            this.addFormModel.isLeaf = '1'
            this.addFormModel.permission = this.parentPermission + ':' + this.addFormModel.code
            this.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.addFormModel)
            if (typeof (that.kalixDialog.init) === 'function') {
              that.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
            }
          }, 20)
        })
      },
      onEditClick(row) {
        let that = this
        this.$refs.kalixTreeGrid.getKalixDialog('edit', (_kalixDialog) => {
          this.kalixDialog = _kalixDialog
          setTimeout(() => {
            this.editFormModel = row
            this.editFormModel.applicationName = this.applicationName
            // this.formModel.isLeaf = row.leaf
            if (row.dataPermission !== true) {
              row.dataPermission = false
            }
            this.editFormModel.dataPermission = row.dataPermission + ''
            console.log('this.editFormModel==============', this.editFormModel)
            this.kalixDialog.$refs.kalixBizDialog.open('编辑', true, this.editFormModel)
            if (typeof (that.kalixDialog.init) === 'function') {
              that.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
            }
          }, 20)
        })
      },
      onDeleteClick(row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: this.functionUrl + '?id=' + row.id,
            // url: this.functionUrl,
            params: {},
            data: {
              id: row.id
            }
          })
        }).then(response => {
          this.$refs.kalixTreeGrid.getData()
          Message.success(response.data.msg)
        }).catch(() => {
        })
      },
      getSelectRow(val) {
        console.log('getSelectRow========', val)
        this.currentRow = val
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
