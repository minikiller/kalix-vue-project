<template lang="pug">
  div.test
    div {{value}}
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
    mounted() {
    },
    methods: {},
    components: {
    }

  }
</script>

<style scoped lang="stylus" type="text/stylus">
.test
  width 200px
  margin 0 auto
</style>
