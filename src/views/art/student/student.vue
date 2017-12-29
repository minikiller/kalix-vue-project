<!--
描述：艺术中心-系统管理-学生信息
开发人：hqj
开发日期：2017年12月14日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="artStudent" title='学生信息列表' v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields" bizSearch="ArtStudentSearch"
    v-bind:btnList="btnList" v-bind:toolbarBtnList="toolbarBtnList" v-bind:customTableTool="customTableTool"
    v-bind:dictDefine="dictDefine")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {StudentURL, ArtStudentComponent, ToolButtonStudentList, ArtScoreComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(ArtStudentComponent, ArtScoreComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'RESEARCH-DICT-KEY',
          type: '省份',
          targetField: 'provinceName',
          sourceField: 'province'
        }],
        btnList: ToolButtonStudentList,
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
          {id: 'view', dialog: 'ArtStudentView'},
          {id: 'newEdit', dialog: 'ArtStudentAdd'}
//          {id: 'scoreManage', dialog: 'ArtScoreManage'}
        ]
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
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'newEdit'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              if (row.id && row.id > 0) { // 修改
                that.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
              } else { // 新增
                this.$delete(row, 'version')
                this.$delete(row, 'version_')
                that.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', false, row)
              }
            }, 20)
            break
          }
//          case 'scoreManage' : { // 成绩管理
//            that.whichBizDialog = ''
//            let dig =
//              that.bizDialog.filter((item) => {
//                return item.id === 'scoreManage'
//              })
//            that.whichBizDialog = dig[0].dialog
//            setTimeout(() => {
//              that.$refs.kalixDialog.openDialog(row)
//            }, 20)
//            break
//          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
