<template>
  <div id="app">
    <chart :id="id" :option="option"></chart>
  </div>
</template>

<script type="text/ecmascript-6">
  import Chart from './chart'
  import options from './options'

  export default {
    components: {
      Chart
    },
    data() {
      let option = options.bar
      return {
        id: 'test',
        option: option
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
