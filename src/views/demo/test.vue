<script type="text/ecmascript-6">
  export default {
    render: (createElement) => {
      return createElement('div', [
        createElement('h1', 'hello world'),
        createElement('el-button', {
          props: {type: 'primary'},
          domProps: {
            innerHTML: 'baz'
          }
        })
      ])
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
