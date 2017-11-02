<!--
描述：办公自动化-面试管理
开发人：hqj
开发日期：2017年11月1日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='interview' title='面试人员列表' v-bind:targetURL='targetURL' ref="kailxInterview"
      v-bind:bizDialog='bizDialog' bizSearch='OaInterviewSearch' v-bind:btnList='btnList'
      v-bind:isFixedColumn="isFixedColumn" v-bind:toolbarBtnList="toolbarBtnList" v-bind:customToolBar="customToolBar" v-bind:customRender="customRender")
        template(slot="tableColumnSlot")
          el-table-column(prop="xm" label="应聘者姓名" align="center" v-bind:width="columnWidth")
          el-table-column(prop="dateFirst" label="初试时间" align="center" v-bind:width="columnWidth")
          el-table-column(prop="interviewerFirst" label="初试面试官" align="center" v-bind:width="columnWidth")
          el-table-column(prop="interviewContentFirst" label="初试面试内容" align="center" v-bind:width="columnWidth")
          el-table-column(prop="passFirstName" label="初试是否通过" align="center" v-bind:width="columnWidth")
          el-table-column(prop="dateSecond" label="复试时间" align="center" v-bind:width="columnWidth")
          el-table-column(prop="interviewerSecond" label="复试面试官" align="center" v-bind:width="columnWidth")
          el-table-column(prop="interviewContentSecond" label="复试面试内容" align="center" v-bind:width="columnWidth")
          el-table-column(prop="passSecondName" label="复试是否通过" align="center" v-bind:width="columnWidth")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import BaseTable from '@/components/custom/baseTable'
  import {InterviewURL, InterviewComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(InterviewComponent)

  export default {
    data() {
      return {
        isFixedColumn: true,
        btnList: ToolButtonList,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'interviewOne', title: '面试', isShow: true, icon: 'icon-add'},
          {id: 'interviewTwo', title: '复试', isShow: true, icon: 'icon-add'}
        ],
        targetURL: InterviewURL,
        bizDialog: [
          {id: 'view', dialog: 'OaInterviewView'},
          {id: 'edit', dialog: 'OaInterviewAdd'},
          {id: 'interviewOne', dialog: 'OaInterviewAdd'},
          {id: 'interviewTwo', dialog: 'OaInterviewAdd'}
        ],
        columnWidth: 180
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    mounted() {
    },
    methods: {
      customToolBar(btnId, table) {
        switch (btnId) {
          case 'interviewOne': {
            this.onInterviewOne(table)
            break
          }
          case 'interviewTwo': {
            this.onInterviewTwo(table)
            break
          }
        }
      },
      onInterviewOne(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'interviewOne'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.formModel = Object.assign({}, FormModel)
          this.formModel.whichInterview = 'first'
          table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.formModel)
        }, 20)
      },
      onInterviewTwo(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'interviewTwo'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.formModel = Object.assign({}, FormModel)
          this.formModel.whichInterview = 'second'
          table.$refs.kalixDialog.$refs.kalixBizDialog.open('修改', false, this.formModel)
        }, 20)
      },
      customRender(_data) {
        _data.forEach(function (e) {
          e.passFirstName = e.passFirst ? '是' : '否'
          e.passSecondName = e.passSecond ? '是' : '否'
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
