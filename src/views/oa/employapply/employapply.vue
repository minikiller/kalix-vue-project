<template lang="pug">
  div employapply
    el-button(v-on:click="clickEdit") 编辑
    div selectedValue:{{selectedValue}}
    employ-apply-add(ref="employApplyAdd" v-on:selected="onSelected")
</template>
<script type="text/ecmascript-6">
  import EmployApplyAdd from './employapplyAdd.vue'

  export default {
    data() {
      return {
        selectedValue: []
      }
    },
    methods: {
      clickEdit() {
        let obj = this.selectedValue
        this.$refs.employApplyAdd.open(obj)
      },
      onSelected(val) {
        this.selectedValue = val
      }
    },
    components: {
      EmployApplyAdd
    }
  }
</script>

