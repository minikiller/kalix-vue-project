<template lang="pug">
  div.kalix-table-buttons
    slot
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      dataUrl: {
        type: String,
        default: ''
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
</style>
