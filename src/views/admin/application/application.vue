<template lang="pug">
  keep-alive
    base-table(bizKey="application" title="应用列表" v-bind:targetURL="targetURL"
      v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields" bizSearch="AdminApplicationSearch"
      v-bind:buttonPermissionPrefix="buttonPermissionPrefix" v-bind:btnList="btnList" v-bind:toolbarBtnList="toolbarBtnList"
      v-bind:customTableTool="customTableTool" v-bind:customRender="customRender" ref="applicationTable" )
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {applicationsURL, appsStartURL, appsStopURL, applicationBtnPermissionPrefix, ApplicationComponent} from '../config.toml'
  import {applicationBtnList} from '../application/index'
  import {registerComponent} from '@/api/register'
  // import Message from 'common/message'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'
  import EventBus from 'common/eventbus'

  registerComponent(ApplicationComponent)

  export default {
    components: {
      BaseTable
    },
    data() {
      return {
        btnList: applicationBtnList,
        buttonPermissionPrefix: applicationBtnPermissionPrefix,
        targetURL: applicationsURL,
        startURL: appsStartURL,
        stopURL: appsStopURL,
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        tableFields: [
          {prop: 'name', label: '名称'},
          {prop: 'code', label: '应用代码'},
          {prop: 'iconCls', label: '应用图标'},
          {prop: 'activeState', label: '运行状态'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminApplicationView'}
        ]
      }
    },
    methods: {
      customRender(_data) {
        _data.forEach(function (e) {
          e.activeState = e.active ? '运行中' : '已停止'
        })
      },
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'startStopUsing': { // 启用/停用
            let warnInfo = '确定要' + (row.active === true ? '停用' : '启用') + '该应用吗？'
            that.$confirm(warnInfo, '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'GET',
                url: (row.active === true ? this.stopURL : this.startURL),
                params: {
                  id: row.code
                },
                data: {
                  id: row.code,
                  available: row.active
                }
              })
            }).then((res) => {
              console.log(res)
              // Message.processResult(res)
              EventBus.$emit(ON_REFRESH_DATA)
            })
            break
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
