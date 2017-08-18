<template lang="pug">
  div
    base-table(title='用户列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:formModel="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'userSearch'"
    v-on:resetFormModel="resetFormModel"
    v-on:setFormModel="setFormModel")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {usersURL, userBtnPermissionPrefix} from 'config/global.toml'

  export default {
    data() {
      return {
        buttonPermissionPrefix: userBtnPermissionPrefix,
        targetURL: usersURL,
        tableFields: [
          {prop: 'id', label: '工号'},
          {prop: 'loginName', label: '登录名'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'workGroup', label: '工作组'}
        ],
        bizDialog: [{id: 'view', dialog: 'KalixUserEdit'},
          {id: 'add', dialog: 'KalixUserAdd'}
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
    },
    methods: {},
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
