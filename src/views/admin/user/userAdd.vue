<template lang="pug">
  div#userAdd
    kalix-dialog
      div(slot="dialogFormSlot")
        el-form-item(label="类型" prop="name")
          el-input(v-model="$parent.model.name")
        el-form-item(label="标签名" prop="label")
          el-input(v-model="$parent.model.label")
</template>
<script type="text/ecmascript-6">
  import Dialog from './baseDialog.vue'
  import Vue from 'vue'

  Vue.component('KalixUserAdd', {
    template: '#userAdd'
  })
  export default {
    components: {
      KalixDialog: Dialog
    },
    methods: {
      hello() {
        alert('dfdf')
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
