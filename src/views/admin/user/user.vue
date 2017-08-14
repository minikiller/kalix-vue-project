<template lang="pug">
  div
    base-table(v-bind:fields="fields" v-bind:targetURL="targetURL"
    v-bind:formModel="formModel" v-bind:formRules="formRules" v-bind:bizDialog="'KalixUserAdd'"
    v-on:resetFormModel="resetFormModel"
    v-on:setFormModel="setFormModel")
</template>
<script type="text/ecmascript-6">
  import BaseTable from './baseTable'
  //  import UserAdd from './userAdd.vue'
  import {usersURL} from 'config/global.toml'
  import Vue from 'vue'

  Vue.component('KalixUserAdd', require('@/views/admin/user/userAdd'))
  export default {
    data() {
      return {
        targetURL: usersURL,
        fields: [
          {prop: 'id', label: '工号'},
          {prop: 'loginName', label: '登录名'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'workGroup', label: '工作组'}
        ],
        formModel: {},
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
    },
    methods: {
      resetFormModel() {
        this.formModel = {}
      },
      setFormModel(model) {
        this.formModel = model
        console.log('setFormModel', model)
      }
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
