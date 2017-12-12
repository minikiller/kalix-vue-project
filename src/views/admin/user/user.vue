<template lang="pug">
  keep-alive
    base-table(bizKey="user" title='用户列表' v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields" bizSearch="AdminUserSearch" v-bind:btnList="btnList"
    v-bind:customTableTool="customTableTool" v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:dictDefine="dictDefine")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {usersURL, userBtnPermissionPrefix, UserComponent} from '../config.toml'
  import {userBtnList, customTableTool} from '../user/index'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(UserComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'ADMIN-DICT-KEY',
          type: '用户类型',
          targetField: 'userTypeName',
          sourceField: 'userType'
        }, {
          cacheKey: 'ADMIN-DICT-KEY',
          type: '岗位名称',
          targetField: 'positionName',
          sourceField: 'position'
        }],
        btnList: userBtnList,
        buttonPermissionPrefix: userBtnPermissionPrefix,
        targetURL: usersURL,
        tableFields: [
          {prop: 'userTypeName', label: '用户类型'},
          {prop: 'code', label: '用户代码'},
          {prop: 'loginName', label: '登录名'},
          {prop: 'name', label: '名称'},
          {prop: 'sex', label: '性别'},
          {prop: 'email', label: '邮箱'},
          {prop: 'phone', label: '固定电话'},
          {prop: 'mobile', label: '手机'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminUserView'},
          {id: 'edit', dialog: 'AdminUserEdit'},
          {id: 'add', dialog: 'AdminUserAdd'}
        ]
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, '', this)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
