<template lang="pug">
  div
    el-dialog.dialog-form(v-bind:title="title" v-bind:visible="visible")
      el-form(ref="dialogForm" v-bind:model="formModel" v-bind:rules="rules" label-width="80px")
        slot(name="dialogFormSlot")
      div.dialog-footer(slot="footer")
        template(v-if="isView")
          el-button(type="primary" v-on:click="onCancelClick") 关 闭
        template(v-else)
          el-button(v-on:click="onCancelClick") 取 消
          el-button(type="primary" v-on:click="onSubmitClick") 提 交
</template>
<script type="text/ecmascript-6">
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
