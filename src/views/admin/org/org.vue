<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="24")
          kalix-base-toolbar(v-bind:toolbarBtnList="btnList" v-on:onToolBarClick="onToolBarClick")
          kalix-org-tree(v-on:orgTreeClick="onOrgTreeClick" ref="kalixOrgTree")
          component(:is="whichBizDialog" ref="kalixDialog")
</template>

<script>
  import BaseToolbar from '@/components/custom/baseToolBar'
  import DateColumn from 'views/oa/comp/dateColumn'
  import OrgTree from '@/components/biz/tree/OrgTree'
  import {OrgComponent, OrgToolbarList, orgURL} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import Message from 'common/message'

  // 注册全局组件
  registerComponent(OrgComponent)

  export default {
    watch: {},

    methods: {
      mounted() {
      },
      onToolBarClick(btnId) {
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === btnId
          })
//        console.log(dig[0].dialog)3
        if (dig[0]) {
          this.whichBizDialog = dig[0].dialog
        }
        switch (btnId) {
          case 'add': {
            setTimeout(() => {
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                this.$refs.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
              }
            }, 20)
            break
          }
          case 'view': {
            setTimeout(() => {
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('查看', false, this.row)
            }, 20)
            break
          }
          case 'delete': {
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'DELETE',
                url: this.targetURL + '/' + this.row.id,
                params: {},
                data: {
                  id: this.row.id
                }
              })
            }).then(response => {
              this.$refs.kalixOrgTree.getData()
              Message.success(response.data.msg)
            }).catch(() => {
            })
            break
          }
          case 'edit': {
            setTimeout(() => {
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, this.row)
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                this.$refs.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
              }
            }, 20)
            break
          }
        }
      },
      onOrgTreeClick(data) {
        this.row = data
        this.dialogOptions = {
          row: this.row
        }
//        this.$refs.kalixBaseTable.getData()
      },
      customRender(_data) {
        let that = this
        console.log('org _data data is ', _data)
        _data.forEach(function (e) {
          e.orgNameCol = that.orgName
        })
        console.log('org _data data is ', _data)
      }
    },

    data() {
      return {
        dialogOptions: {},
        whichBizDialog: '',
        isFixedColumn: true,
        btnList: OrgToolbarList,
        targetURL: orgURL,
        orgId: -1,
        orgName: '',
        row: {},
        bizDialog: [
          {id: 'view', dialog: 'AdminOrgView'},
          {id: 'edit', dialog: 'AdminOrgEdit'},
          {id: 'add', dialog: 'AdminOrgAdd'}
        ],
        tableHeight: 0 //  列表组件高度
      }
    },
    mounted() {
//      this.getData()
    },
    components: {
      KalixDateColumn: DateColumn,
      KalixBaseToolbar: BaseToolbar,
      KalixOrgTree: OrgTree
    },
    computed: {
      tableContainerStyle() {
        return {}
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseTable"
  @import "~@/assets/stylus/color.styl"
  .kalix-search
    position relative
    margin 5px
    border 1px solid border-color_1
    box-sizing border-box
    .kalix-search-hd
      background-color #5fa2dd
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      position absolute
      border-top 1px solid border-color_1
      font-size 0
      padding 5px 15px
      text-align left
      top 44px
      left 0
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      .search-container
        display flex
      .kalix-tree-wrapper
        position: absolute;
        top 60px
        right 10px
        bottom 10px
        left 10px
        padding-right 16px
        box-sizing border-box
        overflow auto

    .el-button
      .iconfont
        font-size 14px

  .kalix-article
    position relative
    height 100%
    .kalix-search,
    .kalix-wrapper
      height 100%
      margin 0
      box-sizing border-box
    .kalix-search
      margin-top 0 !important
    .kalix-wrapper
      margin-bottom 0 !important
      position relative
      top 0
      .kalix-wrapper-hd
        height 44px
      .kalix-wrapper-bd
        position absolute
        top 44px
        bottom 0
        left 0
        width 100%
        box-sizing border-box
        padding 12px
        .kalix-table-container
          position relative
          top 0
          height 100%
          margin 0

  .duty-row
    height 100%
    .duty-col
      height 100%
      padding 5px;
      box-sizing border-box
</style>
