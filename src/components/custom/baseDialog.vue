<!--
描述：el-dialog组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  el-dialog.dialog-form(v-bind:title="title" v-bind:visible="visible" v-bind:before-close="close"
  v-bind:close-on-click-modal="false")
    el-form(ref="dialogForm" v-bind:model="formModel" label-width="80px")
      slot(name="dialogFormSlot")
    div.dialog-footer(slot="footer")
      template(v-if="isView")
        el-button(type="primary" v-on:click="onCancelClick") 关 闭
      template(v-else)
        el-button(v-on:click="onCancelClick") 取 消
        el-button(type="primary" v-on:click="onSubmitClick") 提 交
</template>

<script type="text/ecmascript-6">
  import Message from 'common/message'
  import Vue from 'vue'
  import EventBus from 'common/eventbus'
  import {ON_REFRESH_DATA, ON_INIT_DIALOG_DATA} from './event.toml'

  export default {
//    activated() {
//      console.log('base dialog ' + this.bizKey + '  is activated')
//      EventBus.$on(ON_INIT_DIALOG_DATA, this.initData)
//    },
//    deactivated() {
//      console.log('base dialog ' + this.bizKey + '  is deactivated')
//      EventBus.$off(ON_INIT_DIALOG_DATA)
//    },
    props: {
      bizKey: String,
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      },
      rules: {  // form的校验规则
        type: Object
//        required: true
      },
      targetURL: {  // 业务数据提交的url,包括add，delete，update
        type: String
//        required: true
      },
      isView: false
    },
    render() {

    },
    data() {
      return {
        title: '',
        visible: false
      }
    },
    methods: {
      onCancelClick() {
        console.log('dialog cancel button clicked !')
        this.visible = false
      },
      onSubmitClick() {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            Vue.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                this.visible = false
                // 关闭对话框
//                this.close()
                // 刷新列表
                EventBus.$emit(ON_REFRESH_DATA)
                // 清空form
//                this.$parent.resetDialogForm()
//                this.$emit('resetDialogForm')
              } else {
                Message.error(response.data.msg)
              }
            })
          } else {
            return false
          }
        })
        console.log('[kalix] dialog submit button clicked !')
        this.visible = false
      },
      onBeforeClose() {
        this.$refs.dialogForm.resetFields()
        this.visible = false
      },
      close() {
        this.$refs.dialogForm.resetFields()
        this.visible = false
      },
      open(title, isEdit = false) {
        this.title = title
        this.visible = true
        this.isEdit = isEdit
      },
      initData(row) {
        console.log(`[kalix] init base dialog ${this.bizKey}`)
        Object.assign(this.formModel, row)
      }
    },
    mounted() {
      EventBus.$on(this.bizKey + '-' + ON_INIT_DIALOG_DATA, this.initData)
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
