<template lang="pug">
  el-popover(v-bind:ref="popover" v-bind:placement="top-start" v-bind:title="title" v-bind:width="width" v-bind:trigger="trigger")
    i(style="margin-right: 10px;" v-bind:class="classname" slot="reference")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      popover: {
        type: String, default: ''
      },
      placement: {
        type: String, default: 'top-start'
      },
      title: {
        type: String, default: ''
      },
      width: {
        type: String, default: '200'
      },
      trigger: {
        type: String, default: 'hover'
      },
      classname: {
        type: String, default: 'el-icon-question'
      }
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    },
    watch: {
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
