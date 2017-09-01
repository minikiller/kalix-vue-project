<template lang="pug">
  kalix-dialog.workgroup-add(bizKey="workgroup"
  ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="工作组名称" prop="name" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="所属应用" prop="app" v-bind:rules="rules.app" v-on:appSelected="onAppSelected")
        el-input(v-model="formModel.app")
      el-form-item(label="备注" prop="remark")
        el-input(v-model="formModel.remark" type="textarea")
</template>

<script>
  import Dialog from '@/components/custom/baseDialog.vue'
  import {workgroupURL} from '../config.toml'
  import EventBus from 'common/eventbus'

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
        rules: {
          name: [{required: true, message: '请输入 name', trigger: 'blur'}],
          app: [{required: true, message: '请输入 app', trigger: 'blur'}]
        },
        targetURL: workgroupURL
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      onAppSelected(app) {
        EventBus.$emit('updateAppModel', app)
      }
    }
  }
</script>

<style scoped>

</style>
