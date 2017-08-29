<template lang="pug">
  div.hello
    h1.hello-title {{msg}}
    h2.hello-content {{content}}

</template>

<script type="text/ecmascript-6">
    export default {
      name: 'hello',
      props: {
        content: String
      },
      data () {
        return {
          msg: 'Welcome!'
        }
      }}
</script>

<style scoped lang="stylus">

</style>
