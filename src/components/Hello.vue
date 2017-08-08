<template lang="pug" src="./Hello.pug">
</template>

<script>
  import {msg} from './Hello.toml'
  export default {
    name: 'hello',
    data() {
      return {
        msg: msg
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
