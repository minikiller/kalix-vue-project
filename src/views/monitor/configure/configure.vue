<!--
描述：人员管理-学生维护组件
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="hardwareconfigure" title='系统配置列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
     v-bind:btnList="btnList" v-bind:toolbarBtnList="toolbarBtnList"
     v-bind:bizDialog="bizDialog" v-bind:customToolBar="customToolBar")
      template(slot="tableColumnSlot")
            el-table-column(prop="type" label="类型" width="280" align="center")
            el-table-column(prop="name" label="标签名" width="280" align="center")
            el-table-column(prop="value" label="数值" align="center")

</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {HardwareLogMailURL, HardwareconfigComponent, ConfigToolbarList} from '../config.toml'
  import {registerComponent} from '@/api/register'
 // import {Message} from 'kalix-base'
  // 注册全局组件
  registerComponent(HardwareconfigComponent)

  export default {
    data() {
      return {
        btnList: ConfigToolbarList,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'edit', isShow: false},
          {id: 'customBtn1', icon: 'icon-edit', title: '配置', isShow: true}
        ],
        targetURL: HardwareLogMailURL,
        tableFields: [
          {prop: 'type', label: '类型'},
          {prop: 'name', label: '标签名'},
          {prop: 'value', label: '数值'}
        ],
        items: {},
        bizDialog: [
          {id: 'customBtn1', dialog: 'MonitorHardwareConfiguer'}
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
    mounted() {
      this.axios.request({
        method: 'GET',
        url: this.targetURL,
        params: {},
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
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('配置', false, {})
            }, 20)
            break
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
