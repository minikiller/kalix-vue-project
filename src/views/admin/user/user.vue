<template lang="pug">
  keep-alive
    base-table(title='用户列表'
      v-bind:bizKey="bizKey" v-bind:targetURL="targetURL"
      v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields"
      v-bind:bizSearch="bizSearch" v-bind:btnList="btnList"
      v-bind:customTableTool="customTableTool" v-bind:isFixedColumn="isFixedColumn"
      v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
      v-bind:dictDefine="dictDefine" ref="userTable")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {usersURL, userBtnPermissionPrefix, UserComponent} from '../config.toml'
  import {userBtnList} from '../user/index'
  import {registerComponent} from '@/api/register'
  import Message from 'common/message'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'
  import EventBus from 'common/eventbus'

  // 注册全局组件
  registerComponent(UserComponent)

  export default {
    props: {
      bizKey: {
        type: String,
        default: 'user'
      },
      targetURL: {
        type: String,
        default: usersURL
      },
      bizSearch: {
        type: String,
        default: 'AdminUserSearch'
      },
      isFixedColumn: {
        type: Boolean,
        default: true
      }
    },
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
        // targetURL: usersURL,
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
          {id: 'add', dialog: 'AdminUserAdd'},
          {id: 'key', dialog: 'AdminUserResetpwd'},
          {id: 'auth', dialog: 'AdminUserAuthView'}
        ]
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'startStopUsing': { // 启用/停用
            let warnInfo = '确定要' + (row.available === 1 ? '停用' : '启用') + '该用户吗？'
            that.$confirm(warnInfo, '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'PUT',
                url: this.targetURL + '/' + row.id,
                params: {},
                data: {
                  id: row.id,
                  available: (row.available === 1 ? 0 : 1)
                }
              })
            }).then((res) => {
              console.log(res)
              Message.processResult(res)
              EventBus.$emit(ON_REFRESH_DATA)
            })
            break
          }
          case 'key': { // 重置密码
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'key'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('', true, row)
            }, 20)
            break
          }
          case 'auth' : { // 权限查看
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'auth'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('', false, row)
            }, 20)
            break
          }
        }
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
