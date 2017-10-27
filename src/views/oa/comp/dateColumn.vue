<template lang="pug">
  el-table-column(prop="prop" v-bind:label="label" align="center"  width="220")
    template(slot-scope="scope")
      i(v-if="scope.row[prop]" class="el-icon-time")
      span {{scope.row[prop]}}
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      prop: '',
      label: ''
    }
  }
</script>

<style scoped lang="stylus">

</style>
