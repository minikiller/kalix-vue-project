<template lang="pug">
  div
    el-form(ref="kalixForm" :model="formModel" :rules="formRules")
      slot(name="kalixColumnSlot")
    el-button(v-on:click="submit") submit
    el-button(v-on:click="reset") cancel
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      formModel: {},
      formRules: {}
    },
    data() {
      return {}
    },
    methods: {
      reset() {
        console.log('before :', this.$refs.kalixForm.model)
        this.$refs.kalixForm.resetFields()
        console.log('after :', this.$refs.kalixForm.model)
      },
      submit() {
        if (this._events['onSubmit']) {
          this.$emit('onSubmit', this.$refs.kalixForm.model)
          return
        }
        this.$refs.kalixForm.validate((valid) => {
          if (valid) {
            console.log('OK')
          } else {
            console.log('ERR')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
