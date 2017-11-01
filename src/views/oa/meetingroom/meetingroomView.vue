<template lang="pug">
  kalix-dialog.dataauth-view(bizKey="dataauth"
  ref="kalixBizDialog" v-bind:form-model.sync="formModel" isView)
   div.el-form(slot="dialogFormSlot")
     el-form-item(label="会议室名称" prop="name" label-width="140px")
       el-input(v-model="formModel.name" type="text" readonly)
     el-form-item(label="会议室地址" prop="address" label-width="140px")
       el-input(v-model="formModel.address" type="text" readonly)
     el-form-item(label="容纳人数" prop="capacity" label-width="140px")
       el-input(v-model="formModel.capacity" readonly)
     el-form-item(label="会议室设备说明" prop="equipment" label-width="140px")
       el-input(v-model="formModel.equipment" type="text" readonly)
     el-form-item(label="会议室描述" prop="description" label-width="140px")
       el-input(v-model="formModel.description" type="textarea" readonly)
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
