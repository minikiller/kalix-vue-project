<template lang="pug">
    div
      el-form-item(label="类型" prop="type")
        el-input(v-model="$parent.model.type")
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        mysearch: {
          form: {
            type: ''
          },
          rules: {
            type: [
              {required: true, message: '请输入类型', trigger: 'blur'}
            ]
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
