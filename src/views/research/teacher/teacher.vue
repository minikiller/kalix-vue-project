<!--
描述：人员管理-教师维护组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  base-table(title='教师列表' v-bind:fields="fields" v-bind:targetURL="targetURL"
  v-bind:formModel="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
  v-bind:biz-search="'ResearchTeacherSearch'"
  v-on:resetFormModel="resetFormModel"
  v-on:setFormModel="setFormModel")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {TeacherURL, TeacherComponent} from '../config.toml'

  // 注册全局组件
  TeacherComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    data() {
      return {
        targetURL: TeacherURL,
        fields: [
          {prop: 'id', label: '工号'},
          {prop: 'loginName', label: '登录名'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'workGroup', label: '工作组'}
        ],
        bizDialog: [{id: 'view', dialog: 'ResearchUserEdit'},
          {id: 'add', dialog: 'ResearchTeacherAdd'}
        ],
        formModel: {
          code: '',
          loginName: '',
          name: '',
          sex: '',
          password: '',
          confirmPassword: '',
          position: '',
          available: 1
        },
        formRules: {
          name: [
            {required: true, message: '请输入 name', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入 label', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    methods: {
      resetFormModel() {
        this.formModel = JSON.parse(this.tempFormModel)
      },
      setFormModel(model) {
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
