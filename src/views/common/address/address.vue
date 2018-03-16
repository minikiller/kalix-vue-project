<!--
描述：我的首页-通讯录
开发人：yangz
开发日期：2018年03月05日
-->
<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.address-row(:gutter="0")
        el-col.address-col(:span="6" style="padding:20px 0 20px 8px;")
          keep-alive
            base-nav-menu.address-menu(title="组列表" bizKey="addressGroup"
              v-bind:toolbarBtnList="toolbarBtnList" v-bind:menuUrl="groupUrl"
              v-bind:paramStr="paramStr" v-bind:activeIndex="activeIndex"
              v-bind:bizDialog="groupDialog"
              v-bind:dialogOptions="dialogOptionsGroup"
              v-on:menuItems="getMenuItems" v-on:menuItem="getMenuItem"
              ref="kalixNavMenu")
              template(slot="menuItemSlot")
                el-menu-item(v-if="menuItems.length" v-bind:index="itemIndex.toString()" v-for="(item, itemIndex) in menuItems" key="item.id" )
                  i(v-bind:class="item.iconCls")
                  span(slot="title")
                    | {{item.groupName}}
                  base-menu-tool(v-if="!item.default" v-bind:btnList="groupBtnList" v-bind:item="item"
                    v-on:handleItemOption="handleItemOption")
        el-col.address-col(:span="18" style="position:relative;height:100%;box-sizing: border-box;")
          keep-alive
            base-table.address-wrapper(bizKey="address" title="通讯录" bizSearch="CommonAddressSearch"
              v-bind:targetURL="addressURL" v-bind:btnList="addressBtnList" v-bind:jsonStr="jsonStr"
              v-bind:isFixedColumn="isFixedColumn" v-bind:bizDialog="addressDialog"
              v-bind:dialogOptions="dialogOptionsAddress" v-bind:isAfterSearch = "true"
              v-on:handleAfterSearch = "addressAfterSearch" v-bind:customTableTool="customTableTool"
              v-bind:customRender="showGroupName" v-bind:toolbarBtnList="addressToolBtnList"
              v-bind:noSearchParam="noSearchParam"
              ref="addressTable")
              template(slot="tableColumnSlot")
                el-table-column(prop="icon" label="头像" align="center")
                  template(slot-scope="scope")
                    img(v-if="scope.row.icon" v-bind:src="scope.row.icon" width="32" height="32" alt="")
                    img(v-else src="../../../components/header/default_user.png" width="32" height="32" alt="")
                el-table-column(prop="name" label="姓名" align="center" width="100px")
                el-table-column(prop="groupName" label="所在分组" align="center" width="100px")
                el-table-column(prop="sex" label="性别" align="center" width="100px")
                el-table-column(prop="nickName" label="昵称" align="center" width="100px")
                el-table-column(prop="phone" label="电话" align="center" width="150px")
                el-table-column(prop="email" label="邮箱" align="center" width="150px")
                el-table-column(prop="qqNum" label="QQ" align="center" width="150px")
                el-table-column(prop="address" label="通讯地址" align="center" width="200px")
</template>

<script type="text/ecmascript-6">
  import BaseNavMenu from '@/components/custom/baseNavMenu'
  import BaseTable from '@/components/custom/baseTable'
  import BaseMenuTool from '@/components/custom/baseMenuTool'
  import Cache from 'common/cache'
  import Message from 'common/message'
  import {AddressGroupURL, AddressURL, AddressComponent} from '../config.toml'
  import {addressBtnList} from '../address/index'
  import {groupBtnList} from '../address/groupIndex'
  import {registerComponent} from '@/api/register'

  registerComponent(AddressComponent)
  export default {
    props: {
      btnList: {   //  table中按钮数组
        type: Array,
        required: false,
        default: () => {
          return []
        }
      }
    },
    created() {
    },
    data() {
      return {
        dialogOptionsGroup: {},
        dialogOptionsAddress: {},
        groupDialog: [
          {id: 'add', dialog: 'CommonGroupAdd'},
          {id: 'edit', dialog: 'CommonGroupEdit'}
        ],
        addressDialog: [
          {id: 'add', dialog: 'CommonAddressAdd'},
          {id: 'edit', dialog: 'CommonAddressEdit'},
          {id: 'view', dialog: 'CommonAddressView'}
        ],
        toolbarBtnList: [
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        paramStr: `{'userId': ` + Cache.get('id') + `}`,
        userId: Cache.get('id'),
        groupUrl: AddressGroupURL + '/all',
        menuItems: [],
        groupBtnList: groupBtnList,
        addressBtnList: addressBtnList,
        activeIndex: '0',
        selectItem: undefined,
        addressURL: undefined,
        baseAddressUrl: AddressURL,
        jsonStr: '',
        isFixedColumn: true,
        kalixDialog: undefined,
        groupName: undefined,
        addressAddDisabled: false,
        noSearchParam: false
      }
    },
    computed: {
      addressToolBtnList() {
        return [
          {id: 'add', isShow: true, type: 'default', isDisable: this.addressAddDisabled}
        ]
      }
    },
    components: {
      BaseNavMenu,
      BaseMenuTool,
      BaseTable
    },
    mounted() {
      this.dialogOptionsGroup = {
        userId: this.userId
      }
      this.dialogOptionsAddress = {
        userId: this.userId
      }
    },
    methods: {
      initDialogOptionsGroup(currentItem) {
        var groupNames = []
        this.menuItems.forEach((item) => {
          if (currentItem) {
            if (currentItem.groupName !== item.groupName) {
              groupNames.push(item.groupName)
            }
          } else {
            groupNames.push(item.groupName)
          }
        })
        this.dialogOptionsGroup = {
          userId: this.userId,
          groupNames: groupNames
        }
      },
      getMenuItems(data, bizKey) {
        let isActive = data.active
        let selectRow = data.selectRow
        this.menuItems = data.data
        if (this.menuItems.length > 0) {
          this.initDialogOptionsGroup()
          if (isActive) {
            let elIndex = 0
            if (selectRow === 'first') {
              this.activeIndex = '0'
              this.clearLastSelectStyle()
            } else if (selectRow === 'last') {
              elIndex = this.menuItems.length - 1
              this.activeIndex = (this.menuItems.length - 1).toString()
            }
            setTimeout(() => {
              let elMenu = document.querySelector('.address-menu .el-menu')
              if (elMenu) {
                let elMenuItemActives = elMenu.getElementsByClassName('is-active')
                let elMenuItem = elMenu.children[elIndex]

                if (elMenuItemActives[0]) {
                  elMenuItemActives[0].className = 'el-menu-item'
                }
                if (elMenuItem) {
                  elMenuItem.className = 'el-menu-item is-active'
                }
              }
            }, 20)
          }
          this.noSearchParam = true
          this.jsonStr = `{'userId': ` + this.userId + `,'groupId': ` + this.menuItems[this.activeIndex].id + `}`
          this.addressURL = AddressURL + '/' + this.menuItems[this.activeIndex].id
          this.groupName = this.menuItems[this.activeIndex].groupName
          if (this.groupName === '我的好友') {
            this.addressAddDisabled = false
          } else {
            this.addressAddDisabled = true
          }
        }
      },
      getMenuItem(val, bizKey) {
        this.activeIndex = val.toString()
        this.selectItem = this.menuItems[val]
        this.noSearchParam = true
        this.jsonStr = `{'userId': ` + this.userId + `,'groupId': ` + this.selectItem.id + `}`
        // this.groupConditionStr = '"userId": ' + Cache.get('id') + ',"groupId": ' + this.menuItems[0].id
        this.addressURL = AddressURL + '/' + this.selectItem.id
        this.groupName = this.selectItem.groupName
        if (this.groupName === '我的好友') {
          this.addressAddDisabled = false
        } else {
          this.addressAddDisabled = true
        }
        if (val !== this.menuItems.length - 1) {
          this.clearLastSelectStyle()
        }
      },
      clearLastSelectStyle() {
        setTimeout(() => {
          let elMenu = document.querySelector('.address-menu .el-menu')
          if (elMenu) {
            let elMenuItemActives = elMenu.getElementsByClassName('is-active')
            if (elMenuItemActives[1]) {
              elMenuItemActives[1].className = 'el-menu-item'
            }
          }
        }, 20)
      },
      handleItemOption(item, btnId) {
        if (btnId === 'edit') {
          this.doGroupEdit(item)
        } else if (btnId === 'delete') {
          this.doGroupDelete(item)
        }
      },
      doGroupEdit(item) {
        this.initDialogOptionsGroup(item)
        let that = this
        this.$refs.kalixNavMenu.getKalixDialog('edit', (_kalixDialog) => {
          this.kalixDialog = _kalixDialog
          setTimeout(() => {
            this.editFormModel = item
            this.kalixDialog.$refs.kalixBizDialog.open('编辑', true, this.editFormModel)
            if (typeof (that.kalixDialog.init) === 'function') {
              that.kalixDialog.init(this.dialogOptionsGroup)
            }
          }, 20)
        })
      },
      doGroupDelete(item) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: this.groupUrl + '/' + item.id,
            params: {
              jsonStr: this.paramStr
            }
            // data: {
            // }
          })
        }).then(response => {
          this.$refs.kalixNavMenu.onRefreshClick()
          Message.success(response.data.msg)
        }).catch(() => {
        })
      },
      addressAfterSearch(bizKey, tableData) {
        if (bizKey === 'address') {
          let curentAddressUsers = []
          if (tableData && tableData.length > 0) {
            tableData.forEach((row) => {
              curentAddressUsers.push(row.addressUserId)
            })
          }
          this.dialogOptionsAddress = {
            userId: this.userId,
            addressUsers: curentAddressUsers,
            groupName: this.groupName
          }
        }
      },
      customTableTool(row, btnId, that) {
        if (btnId === 'deleteSelf') {
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return this.axios.request({
              method: 'DELETE',
              url: this.baseAddressUrl + '/' + row.id,
              params: {},
              data: {
                id: row.id
              }
            })
          }).then(response => {
            this.$refs.addressTable.getData()
            Message.success(response.data.msg)
          }).catch(() => {
          })
        }
      },
      showGroupName(_data) {
        if (_data) {
          let _this = this
          _data.forEach((e) => {
            if (_this.menuItems) {
              for (let i = 0; i < _this.menuItems.length; i++) {
                if (_this.menuItems[i].id === e.groupId) {
                  e.groupName = _this.menuItems[i].groupName
                  break
                }
              }
            }
          })
        }
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

  .address-row
    height 100%
    .address-col
      height 100%
      box-sizing border-box

  .address-wrapper
    margin 0px 0
    .kalix-wrapper
      bottom 0 !important
</style>
