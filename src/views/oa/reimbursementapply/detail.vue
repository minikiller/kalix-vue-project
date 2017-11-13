<!--
描述：办公自动化-报销申请-详细信息
开发人：hqj
开发日期：2017年11月8日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='reimbursementApplyDetail' title='详细信息列表' v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog' v-bind:btnList='btnList' v-bind:toolbarBtnList="toolbarBtnList" v-bind:customToolBar="customToolBar"
      v-bind:isFixedColumn="isFixedColumn" v-bind:jsonStr="jsonStr")
        template(slot="tableColumnSlot")
          el-table-column(label="出发" align="center")
            el-table-column(prop="startMonth" label="月" align="center" width="40")
            el-table-column(prop="startDay" label="日" align="center" width="40")
            el-table-column(prop="startTime" label="时" align="center" width="40")
            el-table-column(prop="startPlace" label="地点" align="center" width="80")
          el-table-column(label="达到" align="center")
            el-table-column(prop="arriveMonth" label="月" align="center" width="40")
            el-table-column(prop="arriveDay" label="日" align="center" width="40")
            el-table-column(prop="arriveTime" label="时" align="center" width="40")
            el-table-column(prop="arrivePlace" label="地点" align="center" width="80")
          el-table-column(prop="personNumber" label="人数" align="center" width="40")
          el-table-column(label="交通" align="center")
            el-table-column(prop="trafficTool" label="工具" align="center" width="80")
            el-table-column(prop="trafficMoney" label="金额" align="center" width="60")
          el-table-column(prop="dayNumber" label="天数" align="center" width="40")
          el-table-column(label="出差补助" align="center")
            el-table-column(prop="subsidyStandard" label="补助标准" align="center" width="80")
            el-table-column(prop="subsidyMoney" label="金额" align="center" width="60")
          el-table-column(label="其他费用金额" align="center")
            el-table-column(prop="hotelMoney" label="住宿" align="center" width="60")
            el-table-column(prop="cityTrafficMoney" label="市内交通" align="center" width="60")
          el-table-column(prop="totalMoney" label="合计" align="center" width="80")
</template>

<script type="text/ecmascript-6">
  import DetailFormModel from './detailModel'
  import BaseTable from '@/components/custom/baseTable'
  import {ReimbursementApplyDetailURL, ReimbursementApplyDetailComponent, DetailToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(ReimbursementApplyDetailComponent)

  export default {
    props: {
      reimbursementApplyId: {
        type: Number,
        default: 0
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: ReimbursementApplyDetailURL,
        bizDialog: [
          {id: 'addDetail', dialog: 'OaReimbursementApplyDetailAdd'},
          {id: 'edit', dialog: 'OaReimbursementApplyDetailAdd'}
        ],
        jsonStr: `{'reimbursementApplyId':` + this.reimbursementApplyId + `}`
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    mounted() {
    },
    computed: {
      toolbarBtnList() {
        if (this.readonly) {
          return [{
            id: 'add', isShow: false
          }, {
            id: 'addDetail', title: '添加', isShow: false, icon: 'icon-add'
          }]
        } else {
          return [{
            id: 'add', isShow: false
          }, {
            id: 'addDetail', title: '添加', isShow: true, icon: 'icon-add'
          }]
        }
      },
      btnList() {
        if (this.readonly) {
          return []
        } else {
          return DetailToolButtonList
        }
      }
    },
    methods: {
      customToolBar(btnId, table) {
        switch (btnId) {
          case 'addDetail': {
            this.onAddDetail(table)
            break
          }
        }
      },
      onAddDetail(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'addDetail'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.detailFormModel = Object.assign({}, DetailFormModel)
          this.detailFormModel.reimbursementApplyId = this.reimbursementApplyId
          if (this.reimbursementApplyId === 0) {
            alert('请先保存基本信息')
            return
          }
          table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.detailFormModel)
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
