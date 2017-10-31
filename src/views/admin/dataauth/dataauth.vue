<template lang="pug">
  keep-alive
    base-table(bizKey="dataauth" title='数据权限列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'AdminDataAuthSearch'" v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine" v-bind:customTableTool="customTableTool")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {dataauthURL, ToolButtonList, DataAuthComponent, AdminCacheKey} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(DataAuthComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: AdminCacheKey,
          type: '数据权限',
          targetField: 'typeDict',
          sourceField: 'type'
        }],
        btnList: ToolButtonList,
        targetURL: dataauthURL,
        tableFields: [
          {prop: 'typeDict', label: '数据权限'},
          {prop: 'appName', label: '应用名称'},
          {prop: 'action', label: '操作方式'},
          {prop: 'actor', label: '操作者'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminDataAuthView'},
          {id: 'add', dialog: 'AdminDataAuthAdd'},
          {id: 'edit', dialog: 'AdminDataAuthAdd'},
          {id: 'addUser', dialog: 'AdminDataAuthAddUser'}
        ]
      }
    },
    methods: {
      customTableTool(row, btnId, table) {
        if (btnId === 'addUser') {
          // row
          table.whichBizDialog = ''
          let dig =
            table.bizDialog.filter((item) => {
              return item.id === 'addUser'
            })
          console.log('[kalix] edit dialog is: ' + dig[0].dialog)
          table.whichBizDialog = dig[0].dialog
          setTimeout(() => {
            table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加用户', true, row)
            if (typeof (table.$refs.kalixDialog.init) === 'function') {
              table.$refs.kalixDialog.init(table.dialogOptions)
            }
          }, 20)
        }
      }
    },
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
