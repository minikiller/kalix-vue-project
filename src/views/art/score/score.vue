<!--
描述：艺术中心-系统管理-学生信息-学生成绩
开发人：hqj
开发日期：2017年12月20日
-->

<template lang="pug">
  keep-alive
    el-dialog(title="学生成绩管理" v-bind:visible="visible" v-bind:before-close="close" v-bind:close-on-click-modal="false")
      div(style="height:600px;position:relative")
        base-table(bizKey="artScore" title='学生成绩列表' v-bind:targetURL="targetURL"
        v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields" bizSearch="ArtScoreSearch" v-bind:btnList="btnList"
        v-bind:toolbarBtnList="toolbarBtnList" v-bind:customToolBar="customToolBar" v-bind:customTableTool="customTableTool"
        v-bind:jsonStr="jsonStr" ref="scoreTable")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import BaseTable from '@/components/custom/baseTable'
  import {StudentURL, ArtScoreComponent, ToolButtonScoreList} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import EventBus from 'common/eventbus'
  import Message from 'common/message'

  // 注册全局组件
  registerComponent(ArtScoreComponent)

  export default {
    data() {
      return {
        visible: false,
        btnList: ToolButtonScoreList,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'newAdd', title: '添加', isShow: true, icon: 'icon-add'}
        ],
        targetURL: '',
        tableFields: [
          {prop: 'code', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'majorCourseName', label: '专业课程'},
          {prop: 'score', label: '成绩'}
        ],
        bizDialog: [
          {id: 'newEdit', dialog: 'ArtScoreAdd'},
          {id: 'newAdd', dialog: 'ArtScoreAdd'}
        ],
        row: null,
        jsonStr: ''
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    watch: {
      row: {
        handler: 'watchRow'
      }
    },
    methods: {
      customToolBar(btnId, table) {
        switch (btnId) {
          case 'newAdd': {
            this.onNewAdd(table)
            break
          }
        }
      },
      onNewAdd(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newAdd'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.formModel = Object.assign({}, FormModel)
          if (this.row) {
            this.formModel.studentId = this.row.id
            this.formModel.code = this.row.code
            this.formModel.name = this.row.name
            this.formModel.majorId = this.row.majorId
            this.formModel.majorName = this.row.majorName
            this.formModel.targetURL = this.targetURL
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.formModel)
          } else {
            Message.error('学生数据无效,无法添加成绩,请重新刷新页面!')
          }
        }, 20)
      },
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'newEdit' : { // 新编辑
            this.onNewEdit(row, that)
            break
          }
        }
      },
      onNewEdit(row, table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'newEdit'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.formModel = Object.assign({}, row)
          if (this.row) {
//            this.formModel.studentId = this.row.id
//            this.formModel.code = this.row.code
//            this.formModel.name = this.row.name
//            this.formModel.majorId = this.row.majorId
//            this.formModel.majorName = this.row.majorName
//            this.formModel.majorCourseId = row.majorCourseId
//            this.formModel.score = row.score
//            this.formModel.targetURL = this.targetURL
//            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, this.formModel)
            row.targetURL = this.targetURL
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
          } else {
            Message.error('学生数据无效,无法编辑成绩,请重新刷新页面!')
          }
        }, 20)
      },
      openDialog(_row) {
        this.visible = true
        this.row = _row
      },
      close() {
        this.visible = false
        this._afterDialogClose()
      },
      _afterDialogClose() {
        EventBus.$emit('artScore' + '-' + 'KalixDialogClose')
      },
      watchRow(newValue) {
        this.id = newValue.id
        if (this.id) {
          this.targetURL = StudentURL + '/' + this.id + '/scores'
          if (this.$refs.scoreTable) {
            this.$refs.scoreTable.getData()
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
