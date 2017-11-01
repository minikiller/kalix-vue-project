<template lang="pug">
  div.test
    kalix-select-dutys(v-model="value")
    div {{value}}
</template>

<script>
  import BaseSelectDutys from '@/components/custom/baseSelectDutys'

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
      KalixSelectDutys: BaseSelectDutys
    }

  }
</script>

<style scoped lang="stylus" type="text/stylus">
.test
  width 200px
  margin 0 auto
</style>
