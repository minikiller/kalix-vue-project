<template lang="pug">
  kalix-dialog.user-add(bizKey="scheduleDict" ref="kalixBizDialog"
  v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  v-bind:isView="readonly")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="类型")
        el-input(v-model="formModel.type" v-bind:readonly="readonly")
      el-form-item(label="标签名")
        el-input(v-model="formModel.label" v-bind:readonly="readonly")
      el-form-item(label="备注")
        el-input(v-model="formModel.description" v-bind:readonly="readonly")
</template>
<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {ScheduleDictsURL} from '../config.toml'

  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      },
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        targetURL: ScheduleDictsURL,
        readonly: true
      }
    },
    components: {
      KalixDialog: Dialog
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
