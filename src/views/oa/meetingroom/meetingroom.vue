<template lang="pug">
  keep-alive
    base-table(bizKey="meetingroom" title='会议室列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'OaMeetingroomSearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {MeetingroomURL, ToolButtonList, OaMeetingroomComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(OaMeetingroomComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: MeetingroomURL,
        tableFields: [
          {prop: 'name', label: '会议室名称'},
          {prop: 'address', label: '会议室地址'},
          {prop: 'capacity', label: '容纳人数'},
          {prop: 'equipment', label: '会议室设备说明'},
          {prop: 'description', label: '会议室描述'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'OaMeetingroomView'},
          {id: 'add', dialog: 'OaMeetingroomAdd'},
          {id: 'edit', dialog: 'OaMeetingroomAdd'}
        ]
      }
    },
    methods: {
    },
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
