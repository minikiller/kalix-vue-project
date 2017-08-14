<template lang="pug">
  div
    el-dialog.dialog-form(v-bind:title="title" v-bind:visible="visible")
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
  export default {
    props: {
      formModel: {
        type: Object
//        required: true
      },
      rules: {
        type: Object
//        required: true
      }
    },
    render() {

    },
    data() {
      return {
        title: '',
        visible: false,
        isView: false
      }
    },
    methods: {
      onCancelClick() {
        console.log('dialog cancel button clicked !')
        this.close()
      },
      onSubmitClick() {
        this.$refs.dialogForm.validate((valid) => {
          console.log('asdfasdf')
          if (valid) {
            Vue.axios.request({
              method: 'POST',
              url: this.dataUrl,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                // 关闭对话框
                this.close()
                // 刷新列表
                this.$emit('refreshData')
                // 清空form
                this.$parent.resetDialogForm()
//                this.$emit('resetDialogForm')
              } else {
                Message.error(response.data.msg)
              }
            })
          } else {
            return false
          }
        })
        console.log('dialog submit button clicked !')
        this.close()
      },
      close() {
        this.visible = false
        this.$refs.dialogForm.resetFields()
      },
      open(title, isView = false) {
        this.title = title
        this.visible = true
        this.isView = isView
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
