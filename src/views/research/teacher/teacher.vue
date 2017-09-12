<!--
描述：人员管理-教师维护组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="teacher" title='教师列表' v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchTeacherSearch'" v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {TeacherURL, TeacherComponent, ToolButtonList, ResearchCacheKey} from '../config.toml'
  import EventBus from 'common/eventbus'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(TeacherComponent)

  export default {
    activated() {
      console.log(this.bizKey + '  is activated')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: ResearchCacheKey,
          type: '职称',
          targetField: 'positionalTitlesDict',
          sourceField: 'positionalTitles'
        }],
        btnList: ToolButtonList,
        targetURL: TeacherURL,
        tableFields: [
          {prop: 'identificationCard', label: '身份证号'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'mobile', label: '手机'},
          {prop: 'positionalTitlesDict', label: '职称'},
          {prop: 'resume', label: '个人简历'},
          {prop: 'introduction', label: '个人说明'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchTeacherView'},
          {id: 'edit', dialog: 'ResearchTeacherAdd'},
          {id: 'add', dialog: 'ResearchTeacherAdd'}
        ],
        formModel: {
          identificationCard: '',
          name: '',
          sex: '',
          mobile: '',
          positionalTitles: 0,
          resume: '',
          introduction: '',
          learning: '',
          teaching: ''
        },
        formRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          identificationCard: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    mounted() {
      EventBus.$on('updateTeacherModel', this.changeFormModel)
    },
    filter: {},
    methods: {
      changeFormModel(model) {
        console.log('changeFormModel', model)
        this.formModel = model
      }
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>

<style scoped lang="stylus">

</style>
