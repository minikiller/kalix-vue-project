<template>
  <div>
    <input id="name" v-model="name" />
    <p>Hello from <span id="output">{{name}}</span></p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        name: ''
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
