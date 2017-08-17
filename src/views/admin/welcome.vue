<!--
描述：admin welcome 组件
开发人：桑杨
开发日期：2017年7月14日
-->
<template lang="pug">
  div#welcome
    div Welcome to
      b {{name}}
</template>

<script>
  export default{
    data() {
      return {
        name: ''
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {'$route': 'fetchData'},
    methods: {
      fetchData() {
        this.name = this.$route.params.app
//        console.log(this.$route.params.name);
      }
    },
    components: {},
    computed: {}
  }
</script>
