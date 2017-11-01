<!--
描述：办公自动化-应聘人员管理
开发人：hqj
开发日期：2017年10月30日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='candidate' title='应聘人员列表' v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog' bizSearch='OaCandidateSearch' v-bind:btnList='btnList'
      v-bind:isFixedColumn="isFixedColumn" v-bind:dictDefine="dictDefine")
        template(slot="tableColumnSlot")
          el-table-column(prop="personCategoryName" label="人员类别" align="center" width="220")
          el-table-column(prop="orgName" label="所在部门" align="center" width="220")
          el-table-column(prop="position" label="应聘岗位" align="center" width="220")
          el-table-column(prop="xm" label="姓名" align="center" width="220")
          el-table-column(prop="sexName" label="性别" align="center" width="220")
          el-table-column(prop="age" label="年龄" align="center" width="220")
          el-table-column(prop="graduateSchool" label="毕业学校" align="center" width="90")
          el-table-column(prop="major" label="专业" align="center" width="220")
          el-table-column(prop="salary" label="期望工资" align="center" width="220")
          el-table-column(prop="tel" label="联系电话" align="center" width="220")
          el-table-column(prop="residence" label="户口所在地" align="center" width="220")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {CandidateURL, CandidateComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(CandidateComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'OA-DICT-KEY',
          type: '招聘人员类别',
          targetField: 'personCategoryName',
          sourceField: 'personCategory'
        }, {
          cacheKey: 'OA-DICT-KEY',
          type: '性别',
          targetField: 'sexName',
          sourceField: 'sex'
        }],
        isFixedColumn: true,
        btnList: ToolButtonList,
        targetURL: CandidateURL,
        bizDialog: [
          {id: 'view', dialog: 'OaCandidateView'},
          {id: 'edit', dialog: 'OaCandidateAdd'},
          {id: 'add', dialog: 'OaCandidateAdd'}
        ]
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
    }
  }
</script>

<style scoped lang="stylus">

</style>
