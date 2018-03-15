<!--
描述：人员管理-学生维护组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="hardwareconfigure" title='系统配置列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
     v-bind:btnList="btnList" v-bind:toolbarBtnList="toolbarBtnList" v-bind:jsonStr="appName"
     v-bind:bizDialog="bizDialog" v-bind:customTableTool="customTableTool")
      template(slot="tableColumnSlot")
        el-table-column(type="expand")
          template(slot-scope="scope")
            el-form(label-position="left" class="demo-table-expand")
              el-form-item(v-for="item in scope.row.configBean" v-bind:key="item.name" v-bind:label="item.name")
                span {{item.value}}
        el-table-column(prop="classType" label="类型"  align="center")


</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {configAdminURL, AdminConfiguerComponent, ConfigToolbarList} from '../config.toml'
  import {registerComponent} from '@/api/register'
 // import {Message} from 'kalix-base'
  // 注册全局组件
  registerComponent(AdminConfiguerComponent)

  export default {
    data() {
      return {
        btnList: ConfigToolbarList,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'edit', isShow: false},
          {id: 'customBtn1', icon: 'icon-edit', title: '配置', isShow: false}
        ],
        targetURL: configAdminURL,
        tableFields: [
          {prop: 'type', label: '类型'},
          {prop: 'name', label: '标签名'},
          {prop: 'value', label: '数值'}
        ],
        items: {},
        appName: 'ConfigDb',
        bizDialog: [
          {id: 'editSelf', dialog: 'AdminConfiguer'}
        ]
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    mounted() {
      this.axios.request({
        method: 'GET',
        url: this.targetURL,
        params: {
          jsonStr: 'ConfigDb'
        },
        dataType: 'json',
        data: {
        }
      }).then(response => {
        if (response.data) {
          this.items = response.data.data
        } else {
          // Message.success('重置失败')
        }
      }).catch(() => {
      })
    },
    activated() {
      console.log('c%' + this.bizKey + ' student  is activated', 'color:#ff00fe')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    methods: {
      customTableTool(row, btnId, that) {
        console.log('row', row)
        switch (btnId) {
          case
          'editSelf'
          : { // 增加用户
            that.whichBizDialog = ''
            console.log(that.bizDialog)
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'editSelf'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', false, row)
            }, 20)
            break
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .demo-table-expand
    label
      width 90px
      color #99a9bf
    .el-form-item
      margin-bottom 0
</style>
