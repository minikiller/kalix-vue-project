<!--
描述：办公自动化-试讲管理
开发人：hqj
开发日期：2017年11月2日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='lecture' title='试讲人员列表' v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog' bizSearch='OaLectureSearch' v-bind:btnList='btnList'
      v-bind:isFixedColumn="isFixedColumn" v-bind:toolbarBtnList="toolbarBtnList" v-bind:customToolBar="customToolBar"
      v-bind:customRender="customRender")
        template(slot="tableColumnSlot")
          el-table-column(prop="xm" label="应聘者姓名" align="center" v-bind:width="columnWidth")
          el-table-column(prop="subject" label="试讲题目" align="center" v-bind:width="columnWidth")
          el-table-column(prop="content" label="授课内容" align="center" v-bind:width="columnWidth")
          el-table-column(prop="participant" label="听课人" align="center" v-bind:width="columnWidth")
          el-table-column(prop="passName" label="是否聘用" align="center" v-bind:width="columnWidth")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import BaseTable from '@/components/custom/baseTable'
  import {LectureURL, LectureComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(LectureComponent)

  export default {
    data() {
      return {
        isFixedColumn: true,
        btnList: ToolButtonList,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'addLecture', title: '添加', isShow: true, icon: 'icon-add'}
        ],
        targetURL: LectureURL,
        bizDialog: [
          {id: 'view', dialog: 'OaLectureView'},
          {id: 'edit', dialog: 'OaLectureAdd'},
          {id: 'addLecture', dialog: 'OaLectureAdd'}
        ],
        columnWidth: 300
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
          case 'addLecture': {
            this.onAddLecture(table)
            break
          }
        }
      },
      onAddLecture(table) {
        let dig =
          table.bizDialog.filter((item) => {
            return item.id === 'addLecture'
          })
        table.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          this.formModel = Object.assign({}, FormModel)
          this.formModel.whichInterview = 'lecture'
          table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.formModel)
        }, 20)
      },
      customRender(_data) {
        _data.forEach(function (e) {
          e.passName = e.pass ? '是' : '否'
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
