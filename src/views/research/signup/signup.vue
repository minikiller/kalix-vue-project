<!--
描述：报名信息管理组件
开发人：fj
开发日期：2017年9月13日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="signup" title='报名信息列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'ResearchSignupSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {SignupURL, SignupComponent, ToolButtonList} from '../config.toml'
  import EventBus from 'common/eventbus'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(SignupComponent)

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
        targetURL: SignupURL,
        tableFields: [
          {prop: 'worksCnName', label: '作品中文名称'},
          {prop: 'teamCnName', label: '团队中文名称'},
          {prop: 'name', label: '作者名称'},
          {prop: 'mobilePhone', label: '联系电话'},
          {prop: 'tutor', label: '指导教师'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'ResearchSignupView'},
          {id: 'edit', dialog: 'ResearchSignupAdd'},
          {id: 'add', dialog: 'ResearchSignupAdd'}
        ],
        formModel: {
          name: '',
          phoneticize: '',
          penName: '',
          authorIntroduction: '',
          sex: '',
          nationality: '',
          age: '',
          birthday: '',
          province: '',
          city: '',
          postalAddress: '',
          identificationCard: '',
          postalCode: '',
          mobilePhone: '',
          fixedPhone: '',
          email: '',
          qq: '',
          fax: '',
          microBlog: '',
          otherContactWay: '',
          school: '',
          majorclass: '',
          url: '',
          teamCnName: '',
          teamEnName: '',
          teamContacter: '',
          teamAddress: '',
          worksCnName: '',
          worksEnName: '',
          worksIntroduction: '',
          country: '',
          award: '',
          broadcasting: '',
          tutor: '',
          finishingDate: '',
          lengthOfWork: '',
          copyrightOwner: '',
          authorSignature: '',
          unit: '',
          unitContacter: '',
          creator: ''
        },
        formRules: {
          worksCnName: [
            {required: true, message: '请输入作品名称', trigger: 'blur'}
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
      EventBus.$on('updateSignupModel', this.changeFormModel)
    }
  }
</script>

<style scoped lang="stylus">

</style>
