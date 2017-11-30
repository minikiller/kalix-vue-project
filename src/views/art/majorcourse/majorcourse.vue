<!--
描述：艺术中心-专业课程设置
开发人：hqj
开发日期：2017年11月30日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-org-tree(v-bind:organizationId="orgId" v-on:orgTreeClick="onOrgTreeClick")
        el-col.duty-col(:span="16")
          kalix-base-table.duty-wrapper(ref="kalixBaseTable"
          bizKey="majorCourse" title='专业课程列表' v-bind:targetURL="targetURL"
          v-bind:bizDialog="bizDialog" bizSearch="MajorCourseSearch" v-bind:btnList="btnList"
          v-bind:isFixedColumn="isFixedColumn" v-bind:customRender="customRender" v-bind:dialogOptions="dialogOptions")
            template(slot="tableColumnSlot")
              el-table-column(prop="name"  label="课程名称")
              el-table-column(prop="comment" label="课程描述")
              el-table-column(prop="orgNameCol" label="专业")
              el-table-column(prop="createBy" label="创建人")
              kalix-date-column(prop="creationDate" label="创建日期")
</template>

<script>
  import BaseTable from '@/components/custom/baseTable'
  import {TeachingUnitOrgID, MajorCourseComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import OrgTree from '@/components/biz/tree/OrgTree'
  import DateColumn from 'views/oa/comp/dateColumn'

  // 注册全局组件
  registerComponent(MajorCourseComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: '',
        bizDialog: [
          {id: 'view', dialog: 'MajorCourseView'},
          {id: 'edit', dialog: 'MajorCourseAdd'},
          {id: 'add', dialog: 'MajorCourseAdd'}
        ],
        isFixedColumn: true,
        dialogOptions: {},
        orgId: TeachingUnitOrgID,
        orgName: '',
        tableHeight: 0 // 列表组件高度
      }
    },
    components: {
      KalixBaseTable: BaseTable,
      KalixOrgTree: OrgTree,
      KalixDateColumn: DateColumn
    },
    methods: {
      onOrgTreeClick(data) {
        this.orgId = data.id
        this.orgName = data.name
        this.targetURL = `/camel/rest/orgs/${data.id}/majorcourses`
        this.dialogOptions = {
          orgId: this.orgId,
          orgName: this.orgName,
          targetURL: this.targetURL
        }
      },
      customRender(_data) {
        let that = this
        _data.forEach(function (e) {
          e.orgNameCol = that.orgName
        })
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
    overflow hidden
    box-sizing border-box
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
      box-sizing border-box
  .duty-wrapper
    margin -10px 0
    .kalix-wrapper
      bottom 0 !important
</style>
