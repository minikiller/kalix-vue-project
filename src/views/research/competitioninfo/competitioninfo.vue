<!--
描述：展赛信息管理组件
开发人：fj
开发日期：2017年9月05日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="competitioninfo" title='展赛列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchCompetitionInfoSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {CompetitionInfoURL, CompetitionInfoComponent, ToolButtonList} from '../config.toml'
  import EventBus from 'common/eventbus'

  // 注册全局组件
  CompetitionInfoComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    activated() {
      console.log('c%' + this.bizKey + ' competitioninfo  is activated', 'color:#ff00fe')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: CompetitionInfoURL,
        tableFields: [
          {prop: 'cName', label: '展赛名称'},
          {prop: 'cAddress', label: '展赛地址'},
          {prop: 'contactor', label: '联系人'},
          {prop: 'phone', label: '联系人电话'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchCompetitionInfoView'},
          {id: 'edit', dialog: 'ResearchCompetitionInfoAdd'},
          {id: 'add', dialog: 'ResearchCompetitionInfoAdd'}
        ],
        formModel: {
          cName: '',
          cAddress: '',
          cType: '',
          collectionEndTime: '',
          collectionStartTime: '',
          compStartTime: '',
          compEndTime: '',
          contactor: '',
          contentNeed: '',
          email: '',
          lastevalstarttime: '',
          lastevalendtime: '',
          phone: '',
          preevalendtime: '',
          preevalstarttime: '',
          technologyneed: ''
        },
        formRules: {
          cname: [
            {required: true, message: '请输入展赛名称', trigger: 'blur'}
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
      EventBus.$on('updateCompetitionInfoModel', this.changeFormModel)
    }
  }
</script>

<style scoped lang="stylus">

</style>
