<template lang="pug">
  kalix-search(title="机构查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
//          {label: '登录名', prop: 'loginName'},
          {label: '机构名称', prop: 'name'}
        ]
      }
    },
    components: {
      KalixSearch: BaseSearch
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
