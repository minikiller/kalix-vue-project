<template lang="pug">
  kalix-dialog.dataauth-add(bizKey="meetingroom" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="会议室名称" prop="name" v-bind:rules="rules.name" label-width="140px")
        el-input(v-model="formModel.name" type="text")
      el-form-item(label="会议室地址" prop="address" v-bind:rules="rules.address" label-width="140px")
        el-input(v-model="formModel.address" type="text")
      el-form-item(label="容纳人数" prop="capacity" v-bind:rules="rules.capacity" label-width="140px")
        el-input-number(v-model="formModel.capacity")
      el-form-item(label="会议室设备说明" prop="equipment" v-bind:rules="rules.equipment" label-width="140px")
        el-input(v-model="formModel.equipment" type="text")
      el-form-item(label="会议室描述" prop="description" label-width="140px")
        el-input(v-model="formModel.description" type="textarea")
</template>

<script>
  import FormModel from './model'
  import {MeetingroomURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{type: 'string', required: true, message: '请输入会议室名称', trigger: 'blur'}],
          address: [{type: 'string', required: true, message: '请输入会议室地址', trigger: 'blur'}],
          capacity: [{type: 'number', required: true, message: '请输入容纳人数', trigger: 'blur'}],
          equipment: [{type: 'string', required: true, message: '请输入会议室设备说明', trigger: 'blur'}]
        },
        targetURL: MeetingroomURL
      }
    },
    components: {
      KalixDialog: Dialog
    }
  }
</script>

<style scoped>

</style>
