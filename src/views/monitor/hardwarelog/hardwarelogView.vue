<!--
描述：硬件管理-硬件信息-检测历史
开发人：fwb
开发日期：2017年8月22日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="hardwarelog" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item(label="MAC地址" prop="mac" label-width="120px")
          el-input(v-model="formModel.mac" readonly)
        el-form-item.s-flex_item(label="IP地址" prop="ip" label-width="120px")
          el-input(v-model="formModel.ip" readonly)
      div.s-flex
        el-form-item.s-flex_item(label="比对时间" prop="creationDate" label-width="120px")
          el-input(v-model="formModel.creationDate" readonly)
        el-form-item.s-flex_item(label="比对结果" prop="comparison" label-width="120px")
          el-input(v-model="formModel.comparison" readonly)
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog
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
