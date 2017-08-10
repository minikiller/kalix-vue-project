<template lang="pug">
  div
    el-form-item(label="类型" prop="name")
      el-input(v-model="$parent.model.name")
    el-form-item(label="标签名" prop="label")
      el-input(v-model="$parent.model.label")
</template>

<script type="text/ecmascript-6">
  export default {
//    props: {
//      formModel: {}
//    }
  }
</script>

<style scoped lang="stylus">

</style>
