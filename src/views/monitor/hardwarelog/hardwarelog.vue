<!--
描述：人员管理-学生维护组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="hardwareinfo" title='硬件信息比对日志列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
     v-bind:bizSearch="'MonitorHardwareLogSearch'" v-bind:btnList="btnList" v-bind:toolbarBtnList="toolbarBtnList"
     v-bind:bizDialog="bizDialog" v-bind:customToolBar="customToolBar")
      template(slot="tableColumnSlot")
        el-table-column(prop="barcode" label="条形码" width="280" align="center")
        el-table-column(prop="mac" label="MAC地址" width="280" align="center")
        el-table-column(prop="ip" label="IP地址" width="280" align="center")
        el-table-column(prop="creationDate" label="比对时间" align="center")
        el-table-column(prop="comparison" label="比对结果" align="center")
          template(slot-scope="scope")
            span(v-if="scope.row.comparison==='信息相同'" style="color:green") {{scope.row.comparison }}
            span(v-else style="color:red") {{scope.row.comparison }}
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {HardwareLogURL, HardwarelogComponent, LogToolbarList} from '../config.toml'
  import {registerComponent} from '@/api/register'
 // import {Message} from 'kalix-base'
  // 注册全局组件
  registerComponent(HardwarelogComponent)

  export default {
    data() {
      return {
        btnList: LogToolbarList,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'customBtn1', icon: 'icon-edit', title: '邮箱配置', isShow: false}
        ],
        targetURL: HardwareLogURL,
        tableFields: [
          {prop: 'mac', label: 'MAC地址'},
          {prop: 'ip', label: 'IP地址'},
          {prop: 'creationDate', label: '比对时间'},
          {prop: 'comparison', label: '比对结果'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'MonitorHardwareLogView'},
          {id: 'customBtn1', dialog: 'MonitorHardwareLogMail'}
        ]
      }
    },
    components: {
      BaseTable
    },
    created() {
      const that = this
      this.customToolbarClickEvents = {
        customBtn1() {
          that.customEventBtn1()
        }
      }
    },
    activated() {
      console.log('c%' + this.bizKey + ' student  is activated', 'color:#ff00fe')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    methods: {
      customToolBar(btnId, baseTable) {
        switch (btnId) {
          case 'customBtn1':
            let that = baseTable
            let dig =
              baseTable.bizDialog.filter((item) => {
                return item.id === 'customBtn1'
              })
            baseTable.whichBizDialog = dig[0].dialog
            setTimeout(() => {
//              this.$emit('update:formModel', row)
//              EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, row)
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('邮箱配置', false, {})
            }, 20)
            break
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
