<template lang="pug">
  el-dialog.dialog-form(v-bind:title="title" v-bind:visible="visible" v-bind:before-close="close")
    el-form(ref="dialogForm")
  el-dialog.dialog-form(:title="title" :visible="visible" :before-close="close")
    el-form(ref="dialogForm" :model="formModel" :rules="rules" label-width="80px")
      slot(name="dialog-container")
    div.dialog-footer(slot="footer")
      template(v-if="isView")
        el-button(type="primary" v-on:click="clickCancel") 关 闭
      template(v-else)
        el-button(v-on:click="clickCancel") 取 消
        el-button(type="primary" v-on:click="clickSubmit") 提 交
</template>

<script type="text/ecmascript-6">
  import Message from 'common/message'
  import Vue from 'vue'

  export default {
    name: 'dialog',
    props: {
      dataUrl: {
        type: String,
        required: true
      },
      formModel: {
        type: Object,
        required: true
      },
      rules: {
        type: Object,
        required: true
      },
      labelWidth: {
        type: String,
        default: '80px'
      },
      formName: {
        type: String,
        default: ''
      },
      handlerButtonCancel: {
        type: String,
        default: 'dialogFormCancel'
      },
      handlerButtonSubmit: {
        type: String,
        default: 'dialogFormSubmit'
      }
    },
    data() {
      return {
        title: '',
        visible: false,
        isView: false
      }
    },
    created() {
      this.parentForm = this.$parent.$refs[this.formName]
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    mounted() {
    },
    activated() {
    },
    methods: {
      open(title, isView = false) {
        this.title = title
        this.visible = true
        this.isView = isView
        setTimeout(() => {
          let targetForm = this.$parent.$refs[this.formName]
          targetForm.init(isView)
        }, 20)
      },
      close() {
        console.log('dialog close')
        this.visible = false
        this.$refs.dialogForm.resetFields()
      },
      clickCancel() {
        let targetForm = this.$parent.$refs[this.formName]
        if (typeof (targetForm[this.handlerButtonCancel]) === 'function') {
          targetForm[this.handlerButtonCancel]()
        } else {
          this.close()
        }
      },
      clickSubmit() {
        let targetForm = this.$parent.$refs[this.formName]
        if (typeof (targetForm[this.handlerButtonSubmit]) === 'function') {
          targetForm[this.handlerButtonSubmit]()
          return
        }
        let that = this
        console.log(this.formModel)
        that.$refs.dialogForm.validate((valid) => {
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
      }
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
  .dialog-form {
    text-align: left;
  }
</style>
