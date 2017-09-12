<template lang="pug">
  keep-alive
    base-table(bizKey="user" title='用户列表'
    v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:formModel="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    bizSearch="AdminUserSearch"  v-bind:btnList="btnList")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {usersURL, userBtnPermissionPrefix, ToolButtonList, UserComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(UserComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        buttonPermissionPrefix: userBtnPermissionPrefix,
        targetURL: usersURL,
        tableFields: [
          {prop: 'id', label: '工号'},
          {prop: 'loginName', label: '登录名'},
          {prop: 'name', label: '姓名'},
          {prop: 'sex', label: '性别'},
          {prop: 'workGroup', label: '工作组'},
          {prop: 'usertype', label: '用户类型'}
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
          usertype: '',
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
