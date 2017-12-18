<!--
描述：科研管理-人员管理-学生信息
开发人：hqj-修改
开发日期：2017年12月18日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="researchStudent" title='学生信息列表' v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields" bizSearch="ResearchStudentSearch"
    v-bind:btnList="btnList" v-bind:toolbarBtnList="toolbarBtnList" v-bind:customTableTool="customTableTool")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {StudentURL, ResearchStudentComponent, ToolButtonList1} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(ResearchStudentComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList1,
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        targetURL: StudentURL,
        tableFields: [
          {prop: 'code', label: '学号'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'majorName', label: '专业'},
          {prop: 'province', label: '生源省份'},
          {prop: 'entranceYear', label: '入学年份'},
          {prop: 'phone', label: '固定电话'},
          {prop: 'mobile', label: '手机'},
          {prop: 'homePhone', label: '家庭联系电话'},
          {prop: 'address', label: '联系地址'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchStudentView'},
          {id: 'newEdit', dialog: 'ResearchStudentAdd'}
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
                that.$refs.kalixDialog.$refs.kalixBizDialog.open('', true, row)
              } else { // 新增
                this.$delete(row, 'version')
                this.$delete(row, 'version_')
                that.$refs.kalixDialog.$refs.kalixBizDialog.open('', false, row)
              }
            }, 20)
            break
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
