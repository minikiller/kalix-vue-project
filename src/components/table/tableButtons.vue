<template>
  <div class="kalix-table-buttons">
    <slot></slot>
  </div>
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

<style scoped lang='scss' type='text/scss'>
  .kalix-table-buttons {
  }
</style>
