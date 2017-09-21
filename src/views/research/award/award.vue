<!--
描述：获奖信息管理组件
开发人：fj
开发日期：2017年9月20日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="award" title='获奖信息列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchAwardSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {AwardURL, AwardComponent, ToolButtonList} from '../config.toml'
  import EventBus from 'common/eventbus'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(AwardComponent)

  export default {
    activated() {
      console.log('c%' + this.bizKey + ' signup  is activated', 'color:#ff00fe')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: AwardURL,
        tableFields: [
          {prop: 'competitionType', label: '展赛类型'},
          {prop: 'awardname', label: '获奖人'},
          {prop: 'awardLevel', label: '获奖级别'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchAwardView'},
          {id: 'edit', dialog: 'ResearchAwardAdd'},
          {id: 'add', dialog: 'ResearchAwardAdd'}
        ],
        formModel: {
          competitionType: '',
          awardname: '',
          awardLevel: ''
        },
        formRules: {
          awardname: [
            {required: true, message: '请输入获奖人姓名', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    methods: {
      changeFormModel(model) {
        console.log('changeFormModel', model)
        this.formModel = model
      }
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    },
    mounted() {
      EventBus.$on('updateAwardModel', this.changeFormModel)
    }
  }
</script>

<style scoped lang="stylus">

</style>
