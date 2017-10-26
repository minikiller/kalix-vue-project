<template lang="pug">
  kalix-dialog.dataauth-view(bizKey="dataauth"
  ref="kalixBizDialog" v-bind:form-model.sync="formModel" isView)
   div.el-form(slot="dialogFormSlot")
      el-form-item(label="数据权限" prop="type"  label-width="140px")
        el-input(v-model="formModel.type" v-bind:readonly="readonly")
      el-form-item(label="应用名称" prop="appid"  label-width="140px")
        el-input(v-model="formModel.appid" v-bind:readonly="readonly")
      el-form-item(label="菜单名称" prop="menuid"  label-width="140px")
        el-input(v-model="formModel.menuid" v-bind:readonly="readonly")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import FormModel from './model'
  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        readonly: true
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {}
  }
</script>
