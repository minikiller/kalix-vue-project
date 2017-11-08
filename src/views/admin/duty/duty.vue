<template lang="pug">
  div.kalix-article
    el-row.duty-row(:gutter="0")
      el-col.duty-col(:span="8")
        kalix-org-tree(v-on:orgTreeClick="onOrgTreeClick")
      el-col.duty-col(:span="16" style="padding-top:0")
        kalix-base-table(ref="kalixBaseTable" bizKey='duty' title='职务列表' v-bind:targetURL='targetURL'
        v-bind:bizDialog='bizDialog' bizSearch='AdminDutySearch' v-bind:btnList='btnList' v-bind:customRender="customRender"
        v-bind:isFixedColumn="isFixedColumn" v-bind:dialogOptions="dialogOptions")
          template(slot="tableColumnSlot")
            el-table-column(prop="name"  label="职务名称")
            el-table-column(prop="comment" label="职务描述")
            el-table-column(prop="orgNameCol" label="组织机构")
            el-table-column(prop="createBy" label="创建人")
            kalix-date-column(prop="creationDate" label="创建日期")
</template>

<script>
  import BaseTable from '@/components/custom/baseTable'
  import DateColumn from 'views/oa/comp/dateColumn'
  import OrgTree from '@/components/biz/tree/OrgTree'
  import {DutyComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(DutyComponent)

  export default {
    watch: {},

    methods: {
      onOrgTreeClick(data) {
//        console.log('org data is ', data.id)
        this.orgId = data.id
        this.orgName = data.name
        this.targetURL = `/camel/rest/orgs/${data.id}/dutys`
        this.dialogOptions = {
          orgId: this.orgId,
          orgName: this.orgName,
          targetURL: this.targetURL
        }
        console.log('org targetURL data is ', this.targetURL)
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
        isFixedColumn: true,
        btnList: ToolButtonList,
        targetURL: '',
        orgId: -1,
        orgName: '',
        bizDialog: [
          {id: 'view', dialog: 'AdminDutyView'},
          {id: 'edit', dialog: 'AdminDutyAdd'},
          {id: 'add', dialog: 'AdminDutyAdd'}
        ],
        tableHeight: 0 //  列表组件高度
      }
    },
    mounted() {
//      this.getData()
    },
    components: {
      KalixBaseTable: BaseTable,
      KalixDateColumn: DateColumn,
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
