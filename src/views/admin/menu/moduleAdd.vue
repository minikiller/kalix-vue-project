<!--
描述：系统应用-菜单管理-模块添加、编辑
开发人：hqj
开发日期：2018年05月24日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="adminModule" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL" v-bind:editCustom="formModel.cfgKey")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="所属应用Id" prop="applicationId" v-bind:rules="rules.applicationId" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.applicationId" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="应用名称" prop="applicationName" v-bind:rules="rules.applicationName" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.applicationName" disabled)
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="模块Id" prop="id" v-bind:rules="rules.id" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.id" disabled)
        el-form-item.s-flex_item.kalix-form-table-td(label="排列顺序" prop="index" v-bind:rules="rules.index" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.index")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="模块配置Key" prop="cfgKey" v-bind:rules="rules.cfgKey" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.cfgKey" placeholder="要求全局唯一" v-bind:disabled="formModel.isEdit")
        el-form-item.s-flex_item.kalix-form-table-td(label="模块名称" prop="text" v-bind:rules="rules.text" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.text")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="图标名称" prop="iconCls" v-bind:rules="rules.iconCls" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.iconCls" placeholder="例如：iconfont icon-permission")
        el-form-item.s-flex_item.kalix-form-table-td(label="权限" prop="permission" v-bind:rules="rules.permission" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.permission" placeholder="仅1或0,1代表需要权限,0代表不需要权限")
</template>

<script type="text/ecmascript-6">
  import FormModel from './moduleModel'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          applicationId: [{required: true, message: '所属应用Id不能为空', trigger: 'blur'}],
          applicationName: [{required: true, message: '应用名称不能为空', trigger: 'blur'}],
          id: [{required: true, message: '模块Id不能为空', trigger: 'blur'}],
          iconCls: [{required: true, message: '请输入图标名称', trigger: 'blur'}],
          cfgKey: [{required: true, message: '请输入模块配置Key', trigger: 'blur'}],
          text: [{required: true, message: '请输入模块名称', trigger: 'blur'}],
          index: [{required: true, message: '请输入排列顺序', trigger: 'blur'}],
          permission: [{required: true, message: '请输入权限', trigger: 'blur'}]
        },
        targetURL: '',
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog
    },
    watch: {
      formModel: {
        handler: 'watchFormModel',
        deep: true
      }
    },
    methods: {
      watchFormModel(newValue) {
        if (newValue.targetURL) {
          this.targetURL = newValue.targetURL
        }
        if (newValue.cfgKey) {
          this.formModel.id = newValue.cfgKey + 'Module'
        }
      }
    }
  }
</script>

<style scoped>
</style>
