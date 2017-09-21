<template lang="pug">
  el-date-picker(v-model="currentValue"
  v-bind:type="type"
  v-bind:placeholder="placeholder"
  v-bind:format="format"
  v-on:change="onChange")
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['value', 'type', 'placeholder', 'format'],
    data() {
      return {
        currentValue: this.value
      }
    },
    methods: {
      onChange(val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
