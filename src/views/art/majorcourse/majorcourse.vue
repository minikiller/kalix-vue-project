<!--
描述：艺术中心-专业课程设置
开发人：hqj
开发日期：2017年11月30日
-->

<template lang="pug">
  kalix-comm-panel(title="专业课程列表")
    template(slot="panleSlot")
      keep-alive
        div.duty-row
          div.duty-tree
            kalix-org-tree(v-bind:treeDataURL="orgURL" v-bind:parentNodeId="orgId" v-on:nodeClick="onOrgTreeClick")
          div.duty-col
            kalix-base-table-original.duty-wrapper(ref="kalixBaseTable"
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
  import KalixCommPanel from '@/components/panel/commPanel.vue'
  import BaseTableOriginal from '@/components/custom/baseTableOriginal'
  import {MajorCourseComponent, ToolButtonList} from '../config.toml'
  import {orgURL, TeachingUnitOrgID} from '@/config/global.toml'
  import {registerComponent} from '@/api/register'
  import OrgTree from '@/components/tree/basetree'
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
        orgURL: orgURL,
        orgId: TeachingUnitOrgID,
        orgName: ''
      }
    },
    components: {
      KalixBaseTableOriginal: BaseTableOriginal,
      KalixOrgTree: OrgTree,
      KalixDateColumn: DateColumn,
      KalixCommPanel
    },
    mounted() {
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

  .kalix-article
    height 100%

  .duty-row
    height 100%
    display flex
    padding 5px
    .duty-tree
      padding 5px
      width 280px
      box-sizing border-box
    .duty-col
      padding 5px
      flex 1
      box-sizing border-box
      overflow hidden

</style>
