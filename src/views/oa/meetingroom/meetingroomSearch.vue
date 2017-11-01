<template lang="pug">
  kalix-search(title="会议室查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  export default {
    data() {
      return {
        searchFields: [
          {label: '会议室名称', prop: 'name'}
        ]
      }
    },
    components: {
      KalixSearch: BaseSearch
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
