<!--
描述：人员管理-硬件管理-硬件查看
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="hardwareinfo" ref="kalixBizDialog" v-bind:form-model.sync="formModel")
    div(style="line-height:40px;font-size:20px").el-form(slot="dialogFormSlot")
      div.s-flex
        span(style="color:black;font-family:Microsoft YaHei") MAC地址：
          span() {{formModel.mac}}
      div.s-flex
        span(style="color:black") IP地址：
          span() {{formModel.ip}}
      div.s-flex
        span(style="color:black") cpu：
          span() {{formModel.cpu}}
      div.s-flex
        span(style="color:black") 内存：
          span() {{formModel.memory}}
      div.s-flex
        span(style="color:black") 计算机描述：
          span() {{formModel.computer}}
      div.s-flex
        span(style="color:black") 硬盘序号：
          span() {{formModel.networkAdapter}}
      div.s-flex
        span(style="color:black") 显卡：
          span() {{formModel.videoCard}}
      div.s-flex
        span(style="color:black") 主板信息：
          span() {{formModel.bios}}
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style scoped lang="stylus">
  .el-form
    padding 30px 70px 30px 20px
</style>
