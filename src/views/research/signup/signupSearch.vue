<!--
描述：展赛管理
开发人：fj
开发日期：2017年9月06日
-->

<template lang="pug">
  kalix-search(title="报名信息查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  import BaseSearch from '@/components/custom/baseSearch.vue'

  export default {
    data() {
      return {
        searchFields: [
          {label: '作品中文名称', prop: 'worksCnName'}
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
