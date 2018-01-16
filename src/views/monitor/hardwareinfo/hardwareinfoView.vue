<!--
描述：人员管理-硬件管理-硬件查看
开发人：fj
开发日期：2017年8月22日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="hardwareinfo" ref="kalixBizDialog" v-bind:form-model.sync="formModel" isView)
    div(slot="dialogFormSlot")
      div(style="border:0px green solid;display:block;color:#191919;font-family:Microsoft YaHei !important;font-size:18px;")
        div.s-flex
          span(style="width:130px;display:block") 硬件信息列表
      div(style="border:0px red solid;line-height:40px;color:#191919;font-family:Microsoft YaHei !important;font-size:18px;width:100%;display:block").el-form
        div.s-flex
          span(style="width:130px;display:block") 计算机描述：
          span() {{formModel.computer}}
        div.s-flex
          span(style="width:130px;display:block") MAC地址：
          span() {{formModel.mac}}
        div.s-flex
          span(style="width:130px;display:block") IP地址：
          span() {{formModel.ip}}
        div.s-flex
          span(style="width:130px;display:block") cpu：
          span() {{formModel.cpu}}
        div.s-flex
          span(style="width:130px;display:block") 内存：
          span() {{formModel.memory}}
        div.s-flex
          span(style="width:130px;display:block") 硬盘序号：
          span() {{formModel.networkAdapter}}
        div.s-flex
          span(style="width:130px;display:block") 显卡：
          span() {{formModel.videoCard}}
        div.s-flex
          span(style="width:130px;display:block") 主板信息：
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
