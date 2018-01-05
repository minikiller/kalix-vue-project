<!--
描述：科研管理-人员管理-学生信息
开发人：hqj-修改
开发日期：2018年01月02日
-->
<template lang="pug">
  keep-alive
    div(style="position: absolute;width: 100%;height: 100%;overflow: auto;")
      div(style="height:500px;position:relative")
        base-table(bizKey="researchStudent" title='学生信息列表' v-bind:targetURL="targetURL"
        v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields" bizSearch="ResearchStudentSearch"
        v-bind:btnList="btnList" v-bind:toolbarBtnList="toolbarBtnList" v-bind:customTableTool="customTableTool"
        v-bind:dictDefine="dictDefine" v-on:onTableRowClick="onTableRowClick")
      div(style="height:500px;position:relative")
        base-table(bizKey="researchScore" title='学生成绩列表' v-bind:targetURL="detailTargetURL"
        v-bind:bizDialog="detailBizDialog" v-bind:tableFields="detailTableFields" v-bind:btnList="detailBtnList"
        v-bind:toolbarBtnList="detailToolbarBtnList" v-bind:customToolBar="detailCustomToolBar" v-bind:customTableTool="detailCustomTableTool"
        v-bind:jsonStr="detailJsonStr" ref="scoreTable")
</template>

<script type="text/ecmascript-6">
  import DetailFormModel from './scoreModel'
  import BaseTable from '@/components/custom/baseTable'
  import {StudentURL, ResearchStudentComponent, ToolButtonPersonList, ToolButtonScoreList} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import Message from 'common/message'

  // 注册全局组件
  registerComponent(ResearchStudentComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'RESEARCH-DICT-KEY',
          type: '省份',
          targetField: 'provinceName',
          sourceField: 'province'
        }],
        btnList: ToolButtonPersonList,
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        targetURL: StudentURL,
        tableFields: [
          {prop: 'code', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'majorName', label: '专业'},
          {prop: 'provinceName', label: '生源省份'},
          {prop: 'entranceYear', label: '入学年份'},
          {prop: 'phone', label: '固定电话'},
          {prop: 'mobile', label: '手机'},
          {prop: 'homePhone', label: '家庭联系电话'},
          {prop: 'address', label: '联系地址'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchStudentView'},
          {id: 'newEdit', dialog: 'ResearchStudentAdd'}
        ],
        detailBtnList: ToolButtonScoreList,
        detailToolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'newAdd', title: '添加', isShow: true, icon: 'icon-add'}
        ],
        detailTargetURL: '',
        detailTableFields: [
          {prop: 'code', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'majorCourseName', label: '专业课程'},
          {prop: 'score', label: '成绩'}
        ],
        detailBizDialog: [
          {id: 'newEdit', dialog: 'ResearchScoreAdd'},
          {id: 'newAdd', dialog: 'ResearchScoreAdd'}
        ],
        detailJsonStr: ''
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'newEdit' : { // 新编辑
            this.onNewEdit(row, that)
            break
          }
        }
      },
      onNewEdit(row, table) {
        table.whichBizDialog = ''
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newEdit'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          if (row.id && row.id > 0) { // 修改
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
          } else { // 新增
            this.$delete(row, 'version')
            this.$delete(row, 'version_')
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', false, row)
          }
        }, 20)
      },
      detailCustomToolBar(btnId, table) {
        switch (btnId) {
          case 'newAdd': {
            this.onDetailNewAdd(table)
            break
          }
        }
      },
      onDetailNewAdd(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newAdd'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.detailFormModel = Object.assign({}, DetailFormModel)
          if (this.detailRow && this.detailRow.id) {
            this.detailFormModel.studentId = this.detailRow.id
            this.detailFormModel.code = this.detailRow.code
            this.detailFormModel.name = this.detailRow.name
            this.detailFormModel.majorId = this.detailRow.majorId
            this.detailFormModel.majorName = this.detailRow.majorName
            this.detailFormModel.targetURL = this.detailTargetURL
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.detailFormModel)
          } else {
            Message.error('学生信息无效,无法添加成绩! 请先选择学生并确认已经维护过其详细信息!')
          }
        }, 20)
      },
      detailCustomTableTool(row, btnId, that) {
        switch (btnId) {
          case 'newEdit' : {
            this.onDetailNewEdit(row, that)
            break
          }
        }
      },
      onDetailNewEdit(row, table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newEdit'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          // this.detailFormModel = Object.assign({}, row)
          if (this.detailRow) {
//            this.detailFormModel.studentId = this.detailRow.id
//            this.detailFormModel.code = this.detailRow.code
//            this.detailFormModel.name = this.detailRow.name
//            this.detailFormModel.majorId = this.detailRow.majorId
//            this.detailFormModel.majorName = this.detailRow.majorName
//            this.detailFormModel.majorCourseId = row.majorCourseId
//            this.detailFormModel.score = row.score
//            this.detailFormModel.targetURL = this.detailTargetURL
//            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, this.detailFormModel)
            row.targetURL = this.detailTargetURL
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
          } else {
            Message.error('学生信息无效,无法编辑成绩! 请先选择学生并确认已经维护过其详细信息!')
          }
        }, 20)
      },
      onTableRowClick(row, event, column) {
        this.$refs.scoreTable.clearData()
        this.detailRow = row
        this.id = row.id
        if (this.id) {
          this.detailTargetURL = StudentURL + '/' + this.id + '/scores'
          // 不需要手动调用，基类里监视了detailTargetURL，自动触发请求数据
//          if (this.$refs.scoreTable) {
//            this.$refs.scoreTable.getData()
//          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
