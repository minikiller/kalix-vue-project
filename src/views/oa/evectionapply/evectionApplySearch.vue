<template lang="pug">
  kalix-search(title="出差申请查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'
  export default {
    data() {
      return {
        searchFields: [
          {label: '经办人', prop: 'name'}
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
