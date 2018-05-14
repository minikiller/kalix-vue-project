<!--
描述：人员管理-学生维护组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="hardwareinfo" title='硬件信息列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'MonitorHardwareInfoSearch'" v-bind:btnList="btnList"
    v-bind:customTableTool="customTableTool" v-bind:toolbarBtnList="toolbarBtnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {HardwareInfoURL, HardwareinfoComponent, ToolButtonList, restHardwareInfoURL} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import Message from 'common/message'
  // 注册全局组件
  registerComponent(HardwareinfoComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        targetURL: HardwareInfoURL,
        targetRestURL: restHardwareInfoURL,
        tableFields: [
          {prop: 'barcode', label: '条形码'},
          {prop: 'mac', label: 'MAC地址'},
          {prop: 'ip', label: 'IP地址'},
          {prop: 'cpu', label: 'cpu'},
          {prop: 'memory', label: '内存'},
          {prop: 'computer', label: '计算机描述'},
          {prop: 'networkAdapter', label: '硬盘序号'},
          {prop: 'videoCard', label: '显卡'},
          {prop: 'bios', label: '主板信息'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'MonitorHardwareInfoView'},
          {id: 'edit', dialog: 'MonitorHardwareInfoAdd'},
          {id: 'add', dialog: 'MonitorHardwareInfoAdd'}
        ]
      }
    },
    components: {
      BaseTable
    },
    created() {
    },
    activated() {
      console.log('c%' + this.bizKey + ' student  is activated', 'color:#ff00fe')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    methods: {
      customTableTool(row, btnId, that) {
        this.axios.request({
          method: 'GET',
          url: this.targetRestURL + '/' + row.id,
          params: {},
          data: {
            id: row.id,
            available: (row.available === 1 ? 0 : 1)
          }
        }).then(response => {
          if (response.data) {
            Message.success('重置成功')
          } else {
            Message.success('重置失败')
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
